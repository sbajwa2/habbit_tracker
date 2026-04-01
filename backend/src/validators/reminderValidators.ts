import { z } from "zod";

export const createReminderBodySchema = z.object({
  title: z.string().min(1),
  time: z.string(),
});

export const reminderIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});