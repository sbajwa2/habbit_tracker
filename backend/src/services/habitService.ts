import type { Habit } from "../generated/prisma/client";
import { prisma } from "../db/prisma";

export class HabitService {
  async getAllHabits(userId: string): Promise<Habit[]> {
    return prisma.habit.findMany({
      where: { userId },
      orderBy: { id: "asc" },
    });
  }

  async createHabit(name: string, userId: string): Promise<Habit> {
    return prisma.habit.create({
      data: {
        name,
        completed: false,
        userId,
      },
    });
  }

  async toggleHabit(id: number, userId: string): Promise<Habit | null> {
    const existingHabit = await prisma.habit.findFirst({
      where: { id, userId },
    });

    if (!existingHabit) {
      return null;
    }

    return prisma.habit.update({
      where: { id },
      data: { completed: !existingHabit.completed },
    });
  }

  async deleteHabit(id: number, userId: string): Promise<boolean> {
    const deleteResult = await prisma.habit.deleteMany({
      where: { id, userId },
    });

    return deleteResult.count > 0;
  }
}

export const habitService = new HabitService();