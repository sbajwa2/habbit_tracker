import type { Reminder } from "../types/reminder";
import { reminderRepository } from "../repositories/ReminderRepository";

class ReminderService {
  async getReminders(token: string): Promise<Reminder[]> {
    return reminderRepository.getAll({ token });
  }

  async addReminder(title: string, time: string, token: string): Promise<void> {
    if (!title.trim()) {
      throw new Error("Reminder title cannot be empty");
    }

    await reminderRepository.add(
      {
        title: title.trim(),
        time: time.trim() || "Anytime",
      },
      { token }
    );
  }

  async removeReminder(id: number, token: string): Promise<void> {
    await reminderRepository.remove(id, { token });
  }
}

export const reminderService = new ReminderService();