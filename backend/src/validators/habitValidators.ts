import { z } from "zod";

export const createHabitBodySchema = z.object({
  name: z.string().trim().min(1, "Habit name is required").max(120),
});

export const habitIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});