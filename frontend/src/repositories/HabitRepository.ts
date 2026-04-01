import type { Habit } from "../types/Habit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";
const HABITS_ENDPOINT = `${API_BASE_URL}/api/habits`;

const parseJsonResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Request failed");
  }

  return (await response.json()) as T;
};

export class HabitRepository {
  async getAll(): Promise<Habit[]> {
    const response = await fetch(HABITS_ENDPOINT);
    return parseJsonResponse<Habit[]>(response);
  }

  async add(name: string): Promise<Habit> {
    const response = await fetch(HABITS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    return parseJsonResponse<Habit>(response);
  }

  async toggle(id: number): Promise<Habit> {
    const response = await fetch(`${HABITS_ENDPOINT}/${id}/toggle`, {
      method: "PATCH",
    });

    return parseJsonResponse<Habit>(response);
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${HABITS_ENDPOINT}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to delete habit");
    }
  }
}

export const habitRepository = new HabitRepository();