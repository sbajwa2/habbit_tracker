import { useCallback, useEffect, useMemo, useState } from "react";
import type { Habit } from "../types/Habit";
import { HabitService } from "../services/HabitService";
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
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(() => new HabitService(), []);

  const loadHabits = useCallback(async () => {
    try {
      setError(null);
      setHabits(await service.getAllHabits());
    } catch (loadError) {
      console.error("Failed to load habits", loadError);
      setError("Failed to load habits");
    }
  }, [service]);

  const addHabit = useCallback(
    async (name: string) => {
      try {
        setError(null);
        await service.addHabit(name);
        await loadHabits();
      } catch (addError) {
        console.error("Failed to add habit", addError);
        setError("Failed to add habit");
      }
    },
    [loadHabits, service]
  );

  const toggleHabit = useCallback(
    async (id: number) => {
      try {
        setError(null);
        await service.toggleHabit(id);
        await loadHabits();
      } catch (toggleError) {
        console.error("Failed to toggle habit", toggleError);
        setError("Failed to toggle habit");
      }
    },
    [loadHabits, service]
  );

  const removeHabit = useCallback(
    async (id: number) => {
      try {
        setError(null);
        await service.removeHabit(id);
        await loadHabits();
      } catch (removeError) {
        console.error("Failed to remove habit", removeError);
        setError("Failed to remove habit");
      }
    },
    [loadHabits, service]
  );

  useEffect(() => {
    void loadHabits();
  }, [loadHabits]);

  return {
    habits,
    addHabit,
    toggleHabit,
    removeHabit,
    error,
  };
};