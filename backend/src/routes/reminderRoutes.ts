import { Router } from "express";
import { requireAuth } from "@clerk/express";
import {
  createReminder,
  deleteReminder,
  getReminders,
} from "../controllers/reminderController";
import { validateRequest } from "../middleware/validateRequest";
import {
  createReminderBodySchema,
  reminderIdParamsSchema,
} from "../validators/reminderValidators";

const reminderRouter = Router();

// Reminder endpoints require an authenticated Clerk session.
reminderRouter.get("/", requireAuth(), getReminders);
reminderRouter.post(
  "/",
  requireAuth(),
  validateRequest("body", createReminderBodySchema),
  createReminder
);
reminderRouter.delete(
  "/:id",
  requireAuth(),
  validateRequest("params", reminderIdParamsSchema),
  deleteReminder
);

export default reminderRouter;
