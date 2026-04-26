import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as reminderService from "../services/reminderService";

type CreateReminderBody = {
  title: string;
  time: string;
};

export async function getReminders(req: Request, res: Response) {
  try {
    // All reminder data is scoped to the authenticated Clerk user.
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const reminders = await reminderService.getReminders(userId);
    res.status(200).json(reminders);
  } catch (error) {
    console.error("Failed to fetch reminders", error);
    res.status(500).json({ message: "Failed to fetch reminders" });
  }
}

export async function createReminder(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const reminder = await reminderService.createReminder(
      req.body as CreateReminderBody,
      userId
    );
    res.status(201).json(reminder);
  } catch (error) {
    console.error("Failed to create reminder", error);
    res.status(500).json({ message: "Failed to create reminder" });
  }
}

export async function deleteReminder(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const id = Number(req.params.id);
    const deleted = await reminderService.deleteReminder(id, userId);
    if (!deleted) {
      res.status(404).json({ message: "Reminder not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete reminder", error);
    res.status(500).json({ message: "Failed to delete reminder" });
  }
}