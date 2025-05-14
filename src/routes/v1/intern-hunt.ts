import express, { Request, Response } from "express";

import {
  createInternHuntController,
  getStartupEntriesController,
  getStudentEntriesController,
  startupLoginController,
} from "@/controllers/intern-hunt";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  InternHuntSchema,
  InternHuntSchemaType,
} from "@/validations/intern-hunt";

import db from "@/drizzle";
import { InternHuntStartupTable } from "@/drizzle/schema";
import { eq, isNull } from "drizzle-orm";

const InternHuntRouter = express.Router();

const { validator: createProjectValidator } =
  ValidatorFactory<InternHuntSchemaType>(InternHuntSchema);

InternHuntRouter.post(
  "/create-project",
  createProjectValidator,
  AsyncHandler(createInternHuntController)
);

InternHuntRouter.get(
  "/student-entries",
  AsyncHandler(getStudentEntriesController)
);

InternHuntRouter.get(
  "/startup-entries",
  AsyncHandler(getStartupEntriesController)
);

InternHuntRouter.post("/startup-login", AsyncHandler(startupLoginController));

export default InternHuntRouter;
