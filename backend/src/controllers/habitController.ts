import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { habitService } from "../services/habitService";

export const getHabits = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const habits = await habitService.getAllHabits(userId);
    res.status(200).json(habits);
  } catch (error) {
    console.error("Failed to fetch habits", error);
    res.status(500).json({ message: "Failed to fetch habits" });
  }
};

export const createHabit = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { name } = req.body as { name: string };
    const newHabit = await habitService.createHabit(name, userId);
    res.status(201).json(newHabit);
  } catch (error) {
    console.error("Failed to create habit", error);
    res.status(500).json({ message: "Failed to create habit" });
  }
};

export const toggleHabit = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { id } = req.params as { id: string };
    const updatedHabit = await habitService.toggleHabit(Number(id), userId);

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
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { id } = req.params as { id: string };
    const deleted = await habitService.deleteHabit(Number(id), userId);

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