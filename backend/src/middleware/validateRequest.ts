import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

type ValidationTarget = "body" | "params" | "query";

export const validateRequest =
  (target: ValidationTarget, schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req[target]);

    if (!parseResult.success) {
      res.status(400).json({
        message: "Invalid request data",
        errors: parseResult.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    req[target] = parseResult.data;
    next();
  };