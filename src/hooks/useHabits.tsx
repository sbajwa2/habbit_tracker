import { useEffect, useState } from "react";
import type { Habit } from "../types/Habit";
import { HabitService } from "../services/HabitService";
import { habitRepository } from "../repositories/HabitRepository";

/**
 * useHabits
 *
 * What it does:
 * - Connects UI components to the HabitService.
 * - Manages UI state for habits (what the UI can see and do).
 *
 * Returns:
 * - habits: Habit[] (all habits to display)
 * - addHabit(name): adds a new habit from user input
 * - toggleHabit(id): toggles completed state of a habit in the UI
 * - removeHabit(id): removes a habit from the UI list
 *
 */

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const service = new HabitService(habitRepository);

  const loadHabits = () => {
    setHabits(service.getAllHabits());
  };

  const addHabit = (name: string) => {
    service.addHabit(name);
    loadHabits();
  };

  const toggleHabit = (id: string) => {
    service.toggleHabit(id);
    loadHabits();
  };

  const removeHabit = (id: string) => {
    service.removeHabit(id);
    loadHabits();
  };

  useEffect(() => {
    loadHabits();
  }, []);

  return {
    habits,
    addHabit,
    toggleHabit,
    removeHabit
  };
};