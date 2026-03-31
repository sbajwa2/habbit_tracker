import type { Habit } from "../generated/prisma/client";
import { prisma } from "../db/prisma";

export class HabitService {
  async getAllHabits(): Promise<Habit[]> {
    return prisma.habit.findMany({
      orderBy: { id: "asc" },
    });
  }

  async createHabit(name: string): Promise<Habit> {
    return prisma.habit.create({
      data: {
        name,
        completed: false,
      },
    });
  }

  async toggleHabit(id: number): Promise<Habit | null> {
    const existingHabit = await prisma.habit.findUnique({
      where: { id },
    });

    if (!existingHabit) {
      return null;
    }

    return prisma.habit.update({
      where: { id },
      data: { completed: !existingHabit.completed },
    });
  }

  async deleteHabit(id: number): Promise<boolean> {
    const deleteResult = await prisma.habit.deleteMany({
      where: { id },
    });

    return deleteResult.count > 0;
  }
}

export const habitService = new HabitService();