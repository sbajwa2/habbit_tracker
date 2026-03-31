import type { Reminder } from "../types/reminder";
import { reminderTestData } from "../data/reminderTestData";

const STORAGE_KEY = "habbit_tracker_reminders_v1";

function loadFromStorage(): Reminder[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Reminder[];
  } catch {
    return null;
  }
}

function saveToStorage(reminders: Reminder[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

class ReminderRepository {
  private reminders: Reminder[];

  constructor() {
    const saved = loadFromStorage();
    this.reminders = saved ?? [...reminderTestData];

    if (!saved) {
      saveToStorage(this.reminders);
    }
  }

  getAll(): Reminder[] {
    return [...this.reminders];
  }

  add(reminder: Reminder): void {
    this.reminders = [...this.reminders, reminder];
    saveToStorage(this.reminders);
  }

  remove(id: number): void {
    this.reminders = this.reminders.filter((r) => r.id !== id);
    saveToStorage(this.reminders);
  }
  resetToTestData(): void {
    this.reminders = [...reminderTestData];
    saveToStorage(this.reminders);
  }
}

export const reminderRepository = new ReminderRepository();