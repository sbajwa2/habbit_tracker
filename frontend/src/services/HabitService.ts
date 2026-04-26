import type { Habit } from "../types/Habit";
import { habitRepository } from "../repositories/HabitRepository";

export class HabitService {
  private repository = habitRepository;

  async getAllHabits(sessionToken: string | null): Promise<Habit[]> {
    return this.repository.getAll(sessionToken);
  }

  async getTopTwoHabits(sessionToken: string | null): Promise<Habit[]> {
    const habits = await this.repository.getAll(sessionToken);
    return habits.slice(0, 2);
  }

  async addHabit(name: string, sessionToken: string): Promise<void> {
    if (!name.trim()) return;
    await this.repository.add(name.trim(), sessionToken);
  }

  async toggleHabit(id: number, sessionToken: string): Promise<void> {
    await this.repository.toggle(id, sessionToken);
  }

  async removeHabit(id: number, sessionToken: string): Promise<void> {
    await this.repository.delete(id, sessionToken);
  }
}