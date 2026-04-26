import { prisma } from "../db/prisma";

export async function getReminders(userId: string) {
  return prisma.reminder.findMany({
    where: { userId },
    orderBy: { id: "asc" },
  });
}

export async function createReminder(
  data: { title: string; time: string },
  userId: string
) {
  return prisma.reminder.create({
    data: {
      ...data,
      userId,
    },
  });
}

export async function deleteReminder(id: number, userId: string) {
  // deleteMany avoids leaking ownership information when the id is not owned.
  const deleted = await prisma.reminder.deleteMany({
    where: { id, userId },
  });

  return deleted.count > 0;
}