import type { Habit } from "../types/Habit";
import { habitRepository } from "../repositories/HabitRepository";

export class HabitService {
  private repository = habitRepository;

  async getAllHabits(): Promise<Habit[]> {
    return this.repository.getAll();
  }

  async getTopTwoHabits(): Promise<Habit[]> {
    const habits = await this.repository.getAll();
    return habits.slice(0, 2);
  }

  async addHabit(name: string): Promise<void> {
    if (!name.trim()) return;

    await this.repository.add(name.trim());
  }

  async toggleHabit(id: number): Promise<void> {
    await this.repository.toggle(id);
  }

  async removeHabit(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}