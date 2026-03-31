import { Router } from "express";
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

habitRouter.get("/", getHabits);
habitRouter.post("/", validateRequest("body", createHabitBodySchema), createHabit);
habitRouter.patch(
  "/:id/toggle",
  validateRequest("params", habitIdParamsSchema),
  toggleHabit
);
habitRouter.delete("/:id", validateRequest("params", habitIdParamsSchema), deleteHabit);

export default habitRouter;