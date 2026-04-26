import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("../src/db/prisma", () => ({
  prisma: {
    reminder: {
      findMany: vi.fn(),
      create: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

import { prisma } from "../src/db/prisma";
import {
  createReminder,
  deleteReminder,
  getReminders,
} from "../src/services/reminderService";

describe("reminderService user scoping", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("scopes getReminders by authenticated userId", async () => {
    await getReminders("user_123");

    expect(prisma.reminder.findMany).toHaveBeenCalledWith({
      where: { userId: "user_123" },
      orderBy: { id: "asc" },
    });
  });

  it("persists userId when creating reminders", async () => {
    await createReminder({ title: "Drink water", time: "Anytime" }, "user_456");

    expect(prisma.reminder.create).toHaveBeenCalledWith({
      data: {
        title: "Drink water",
        time: "Anytime",
        userId: "user_456",
      },
    });
  });

  it("deletes only reminders owned by the authenticated user", async () => {
    vi.mocked(prisma.reminder.deleteMany).mockResolvedValue({ count: 1 } as never);

    const deleted = await deleteReminder(10, "user_999");

    expect(prisma.reminder.deleteMany).toHaveBeenCalledWith({
      where: { id: 10, userId: "user_999" },
    });
    expect(deleted).toBe(true);
  });

  it("returns false when reminder id is not owned by user", async () => {
    vi.mocked(prisma.reminder.deleteMany).mockResolvedValue({ count: 0 } as never);

    const deleted = await deleteReminder(11, "user_999");

    expect(deleted).toBe(false);
  });
});
