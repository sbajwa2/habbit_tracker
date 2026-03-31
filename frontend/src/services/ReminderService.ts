import type { Reminder } from "../types/reminder";
import { reminderRepository } from "../repositories/ReminderRepository";

class ReminderService {
  async getReminders(): Promise<Reminder[]> {
    return reminderRepository.getAll();
  }

  async addReminder(title: string, time: string): Promise<void> {
    if (!title.trim()) {
      throw new Error("Reminder title cannot be empty");
    }

    await reminderRepository.add({
      title: title.trim(),
      time: time.trim() || "Anytime",
    });
  }

  async removeReminder(id: number): Promise<void> {
    await reminderRepository.remove(id);
  }
}

export const reminderService = new ReminderService();