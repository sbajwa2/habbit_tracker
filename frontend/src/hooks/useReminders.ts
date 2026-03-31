import { useEffect, useState } from "react";
import type { Reminder } from "../types/reminder";
import { reminderService } from "../services/ReminderService";

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const refresh = () => {
    setReminders(reminderService.getReminders());
  };

  useEffect(() => {
    refresh(); 
  }, []);

  const addReminder = (reminder: Reminder) => {
    reminderService.addReminder(reminder);
    refresh(); 
  };

  const removeReminder = (id: number) => {
    reminderService.removeReminder(id);
    refresh();
  };

  return { reminders, addReminder, removeReminder };
}