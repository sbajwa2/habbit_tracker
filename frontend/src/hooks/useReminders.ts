import { useEffect, useState } from "react";
import type { Reminder } from "../types/reminder";
import { reminderService } from "../services/ReminderService";

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setError(null);
      setReminders(await reminderService.getReminders());
    } catch (loadError) {
      console.error("Failed to load reminders", loadError);
      setError("Could not load reminders.");
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const addReminder = async (title: string, time: string) => {
    try {
      setError(null);
      await reminderService.addReminder(title, time);
      await refresh();
    } catch (addError) {
      console.error("Failed to add reminder", addError);
      setError("Could not add reminder. Check backend and database connection.");
    }
  };

  const removeReminder = async (id: number) => {
    try {
      setError(null);
      await reminderService.removeReminder(id);
      await refresh();
    } catch (removeError) {
      console.error("Failed to remove reminder", removeError);
      setError("Could not remove reminder. Check backend and database connection.");
    }
  };

  return { reminders, error, addReminder, removeReminder };
}