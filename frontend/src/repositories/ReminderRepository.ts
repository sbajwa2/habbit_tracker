import type { Reminder } from "../types/reminder";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";
const REMINDERS_ENDPOINT = `${API_BASE_URL}/api/reminders`;

type CreateReminderInput = {
  title: string;
  time: string;
};

type RequestOptions = {
  token: string;
};

const parseJsonResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`HTTP_${response.status}:${errorMessage || "Request failed"}`);
  }

  return (await response.json()) as T;
};

class ReminderRepository {
  async getAll(options: RequestOptions): Promise<Reminder[]> {
    const response = await fetch(REMINDERS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${options.token}`,
      },
    });
    return parseJsonResponse<Reminder[]>(response);
  }

  async add(data: CreateReminderInput, options: RequestOptions): Promise<Reminder> {
    const response = await fetch(REMINDERS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${options.token}`,
      },
      body: JSON.stringify(data),
    });

    return parseJsonResponse<Reminder>(response);
  }

  async remove(id: number, options: RequestOptions): Promise<void> {
    const response = await fetch(`${REMINDERS_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${options.token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP_${response.status}:${errorMessage || "Failed to delete reminder"}`
      );
    }
  }
}

export const reminderRepository = new ReminderRepository();