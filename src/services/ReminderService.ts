import type { Reminder } from "../types/reminder";
import { reminderRepository } from "../repositories/ReminderRepository";

class ReminderService {
  getReminders(): Reminder[] {
    return reminderRepository.getAll();
  }

  addReminder(reminder: Reminder): void {
    if (!reminder.text.trim()) {
      throw new Error("Reminder text cannot be empty");
    }
    reminderRepository.add(reminder);
  }

  removeReminder(id: number): void {
    reminderRepository.remove(id);
  }
}

export const reminderService = new ReminderService();