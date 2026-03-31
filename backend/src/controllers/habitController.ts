import type { Request, Response } from "express";
import { habitService } from "../services/habitService";

export const getHabits = async (_req: Request, res: Response) => {
  try {
    const habits = await habitService.getAllHabits();
    res.status(200).json(habits);
  } catch (error) {
    console.error("Failed to fetch habits", error);
    res.status(500).json({ message: "Failed to fetch habits" });
  }
};

export const createHabit = async (req: Request, res: Response) => {
  try {
    const { name } = req.body as { name: string };
    const newHabit = await habitService.createHabit(name);
    res.status(201).json(newHabit);
  } catch (error) {
    console.error("Failed to create habit", error);
    res.status(500).json({ message: "Failed to create habit" });
  }
};

export const toggleHabit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const updatedHabit = await habitService.toggleHabit(Number(id));

    if (!updatedHabit) {
      res.status(404).json({ message: "Habit not found" });
      return;
    }

    res.status(200).json(updatedHabit);
  } catch (error) {
    console.error("Failed to toggle habit", error);
    res.status(500).json({ message: "Failed to toggle habit" });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const deleted = await habitService.deleteHabit(Number(id));

    if (!deleted) {
      res.status(404).json({ message: "Habit not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete habit", error);
    res.status(500).json({ message: "Failed to delete habit" });
  }
};