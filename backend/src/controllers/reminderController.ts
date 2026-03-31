import { Request, Response } from "express";
import * as reminderService from "../services/reminderService";

type CreateReminderBody = {
  title: string;
  time: string;
};

export async function getReminders(_req: Request, res: Response) {
  try {
    const reminders = await reminderService.getReminders();
    res.status(200).json(reminders);
  } catch (error) {
    console.error("Failed to fetch reminders", error);
    res.status(500).json({ message: "Failed to fetch reminders" });
  }
}

export async function createReminder(req: Request, res: Response) {
  try {
    const reminder = await reminderService.createReminder(
      req.body as CreateReminderBody
    );
    res.status(201).json(reminder);
  } catch (error) {
    console.error("Failed to create reminder", error);
    res.status(500).json({ message: "Failed to create reminder" });
  }
}

export async function deleteReminder(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await reminderService.deleteReminder(id);
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete reminder", error);
    res.status(500).json({ message: "Failed to delete reminder" });
  }
}