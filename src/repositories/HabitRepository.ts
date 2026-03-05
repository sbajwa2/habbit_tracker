import type { Habit } from "../types/Habit";
import { habitTestData } from "../data/habitTestData";

export class HabitRepository {
  private habits: Habit[] = habitTestData;

  getAll(): Habit[] {
    return this.habits;
  }

  add(habit: Habit): void {
    this.habits.push(habit);
  }

  update(updatedHabit: Habit): void {
    this.habits = this.habits.map(h =>
      h.id === updatedHabit.id ? updatedHabit : h
    );
  }

  delete(id: string): void {
    this.habits = this.habits.filter(h => h.id !== id);
  }
}

export const habitRepository = new HabitRepository();