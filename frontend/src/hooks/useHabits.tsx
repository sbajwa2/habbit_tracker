import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
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
  const { getToken, isSignedIn } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(() => new HabitService(), []);

  const resolveSessionToken = useCallback(async () => {
    if (!isSignedIn) {
      return null;
    }

    return getToken();
  }, [getToken, isSignedIn]);

  const loadHabits = useCallback(async () => {
    try {
      if (!isSignedIn) {
        setHabits([]);
        setError(null);
        return;
      }

      setError(null);
      const sessionToken = await resolveSessionToken();
      setHabits(await service.getAllHabits(sessionToken));
    } catch (loadError) {
      console.error("Failed to load habits", loadError);
      setError("Failed to load habits");
    }
  }, [isSignedIn, resolveSessionToken, service]);

  const addHabit = useCallback(
    async (name: string) => {
      try {
        if (!isSignedIn) {
          setError("Please sign in to manage habits.");
          return;
        }

        const sessionToken = await resolveSessionToken();
        if (!sessionToken) {
          setError("Unable to authenticate your session.");
          return;
        }

        setError(null);
        await service.addHabit(name, sessionToken);
        await loadHabits();
      } catch (addError) {
        console.error("Failed to add habit", addError);
        setError("Failed to add habit");
      }
    },
    [isSignedIn, loadHabits, resolveSessionToken, service]
  );

  const toggleHabit = useCallback(
    async (id: number) => {
      try {
        if (!isSignedIn) {
          setError("Please sign in to manage habits.");
          return;
        }

        const sessionToken = await resolveSessionToken();
        if (!sessionToken) {
          setError("Unable to authenticate your session.");
          return;
        }

        setError(null);
        await service.toggleHabit(id, sessionToken);
        await loadHabits();
      } catch (toggleError) {
        console.error("Failed to toggle habit", toggleError);
        setError("Failed to toggle habit");
      }
    },
    [isSignedIn, loadHabits, resolveSessionToken, service]
  );

  const removeHabit = useCallback(
    async (id: number) => {
      try {
        if (!isSignedIn) {
          setError("Please sign in to manage habits.");
          return;
        }

        const sessionToken = await resolveSessionToken();
        if (!sessionToken) {
          setError("Unable to authenticate your session.");
          return;
        }

        setError(null);
        await service.removeHabit(id, sessionToken);
        await loadHabits();
      } catch (removeError) {
        console.error("Failed to remove habit", removeError);
        setError("Failed to remove habit");
      }
    },
    [isSignedIn, loadHabits, resolveSessionToken, service]
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