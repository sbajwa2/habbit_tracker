import type { Habit } from "../types/Habit";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";
const HABITS_ENDPOINT = `${API_BASE_URL}/api/habits`;

const parseJsonResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Request failed");
  }

  return (await response.json()) as T;
};

const buildAuthHeaders = (
  sessionToken: string | null,
  includeJsonContentType = false
): HeadersInit => {
  const headers: Record<string, string> = {};

  if (includeJsonContentType) {
    headers["Content-Type"] = "application/json";
  }

  if (sessionToken) {
    headers.Authorization = `Bearer ${sessionToken}`;
  }

  return headers;
};

export class HabitRepository {
  async getAll(sessionToken: string | null): Promise<Habit[]> {
    const response = await fetch(HABITS_ENDPOINT, {
      headers: buildAuthHeaders(sessionToken),
    });

    return parseJsonResponse<Habit[]>(response);
  }

  async add(name: string, sessionToken: string): Promise<Habit> {
    const response = await fetch(HABITS_ENDPOINT, {
      method: "POST",
      headers: buildAuthHeaders(sessionToken, true),
      body: JSON.stringify({ name }),
    });

    return parseJsonResponse<Habit>(response);
  }

  async toggle(id: number, sessionToken: string): Promise<Habit> {
    const response = await fetch(`${HABITS_ENDPOINT}/${id}/toggle`, {
      method: "PATCH",
      headers: buildAuthHeaders(sessionToken),
    });

    return parseJsonResponse<Habit>(response);
  }

  async delete(id: number, sessionToken: string): Promise<void> {
    const response = await fetch(`${HABITS_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: buildAuthHeaders(sessionToken),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to delete habit");
    }
  }
}

export const habitRepository = new HabitRepository();