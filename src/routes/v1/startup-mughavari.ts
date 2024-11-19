import express from "express";

import { createProjectController } from "@/controllers/startup-mughavari";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  StartupMughavariSchema,
  StartupMughavariSchemaType,
} from "@/validations/startup-mughavari";

const StartUpMughavariRouter = express.Router();

const { validator: createProjectValidator } =
  ValidatorFactory<StartupMughavariSchemaType>(StartupMughavariSchema);

StartUpMughavariRouter.post(
  "/create-project",
  createProjectValidator,
  AsyncHandler(createProjectController)
);

export default StartUpMughavariRouter;
