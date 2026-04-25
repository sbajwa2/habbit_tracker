import { Router } from "express";
import { requireAuth } from "@clerk/express";
import {
  createHabit,
  deleteHabit,
  getHabits,
  toggleHabit,
} from "../controllers/habitController";
import { validateRequest } from "../middleware/validateRequest";
import {
  createHabitBodySchema,
  habitIdParamsSchema,
} from "../validators/habitValidators";

const habitRouter = Router();

habitRouter.get("/", requireAuth(), getHabits);
habitRouter.post(
  "/",
  requireAuth(),
  validateRequest("body", createHabitBodySchema),
  createHabit
);
habitRouter.patch(
  "/:id/toggle",
  requireAuth(),
  validateRequest("params", habitIdParamsSchema),
  toggleHabit
);
habitRouter.delete(
  "/:id",
  requireAuth(),
  validateRequest("params", habitIdParamsSchema),
  deleteHabit
);

export default habitRouter;