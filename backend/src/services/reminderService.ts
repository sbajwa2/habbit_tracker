import { prisma } from "../db/prisma";

export async function getReminders() {
  return prisma.reminder.findMany({
    orderBy: { id: "asc" },
  });
}

export async function createReminder(data: { title: string; time: string }) {
  return prisma.reminder.create({
    data,
  });
}

export async function deleteReminder(id: number) {
  return prisma.reminder.delete({
    where: { id },
  });
}