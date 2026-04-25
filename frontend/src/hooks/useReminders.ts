import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import type { Reminder } from "../types/reminder";
import { reminderService } from "../services/ReminderService";

function getStatusCode(error: unknown): number | null {
  if (!(error instanceof Error)) {
    return null;
  }

  const match = error.message.match(/^HTTP_(\d+):/);
  return match ? Number(match[1]) : null;
}

function getFriendlyErrorMessage(action: "load" | "add" | "remove", error: unknown) {
  const status = getStatusCode(error);

  if (status === 401) {
    return "Your session has expired. Please sign in again.";
  }

  if (status === 403) {
    return "You are not allowed to access these reminders.";
  }

  if (status === 404 && action === "remove") {
    return "That reminder no longer exists.";
  }

  if (status === 400) {
    return "Please check reminder details and try again.";
  }

  if (status !== null && status >= 500) {
    return "The server is having trouble right now. Please try again.";
  }

  if (action === "load") {
    return "Could not load reminders.";
  }

  if (action === "add") {
    return "Could not add reminder.";
  }

  return "Could not remove reminder.";
}

export function useReminders() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getSessionToken = async (): Promise<string> => {
    const token = await getToken();
    if (!token) {
      throw new Error("No active session token");
    }

    return token;
  };

  const refresh = async () => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      setReminders([]);
      setError(null);
      return;
    }

    try {
      setError(null);
      const token = await getSessionToken();
      setReminders(await reminderService.getReminders(token));
    } catch (loadError) {
      console.error("Failed to load reminders", loadError);
      setError(getFriendlyErrorMessage("load", loadError));
    }
  };

  useEffect(() => {
    void refresh();
  }, [isLoaded, isSignedIn]);

  const addReminder = async (title: string, time: string) => {
    if (!isSignedIn) {
      setError("Please sign in to add reminders.");
      return;
    }

    try {
      setError(null);
      const token = await getSessionToken();
      await reminderService.addReminder(title, time, token);
      await refresh();
    } catch (addError) {
      console.error("Failed to add reminder", addError);
      setError(getFriendlyErrorMessage("add", addError));
    }
  };

  const removeReminder = async (id: number) => {
    if (!isSignedIn) {
      setError("Please sign in to remove reminders.");
      return;
    }

    try {
      setError(null);
      const token = await getSessionToken();
      await reminderService.removeReminder(id, token);
      await refresh();
    } catch (removeError) {
      console.error("Failed to remove reminder", removeError);
      setError(getFriendlyErrorMessage("remove", removeError));
    }
  };

  return { reminders, error, addReminder, removeReminder, isLoaded, isSignedIn };
}