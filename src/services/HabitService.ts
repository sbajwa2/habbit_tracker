import type { Habit } from "../types/Habit";
import type { HabitRepository } from "../repositories/HabitRepository";

export class HabitService {
  private repository: HabitRepository;

  constructor(repository: HabitRepository) {
    this.repository = repository; 
  }

  getAllHabits(): Habit[] {
    return this.repository.getAll();
  }

  getTopTwoHabits(): Habit[] {
    return this.repository.getAll().slice(0, 2);
  }

  addHabit(name: string): void {
    if (!name.trim()) return;

    const newHabit: Habit = {
      id: Date.now().toString(), 
      name,
      completed: false
    };

    this.repository.add(newHabit);
  }

  toggleHabit(id: string): void {
    const habit = this.repository.getAll().find(h => h.id === id);
    if (!habit) return;

    this.repository.update({ ...habit, completed: !habit.completed });
  }

  removeHabit(id: string): void {
    this.repository.delete(id);
  }
}