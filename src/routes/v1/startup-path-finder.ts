import express from "express";

import { createStartupPathFinderController, getEntriesController } from "@/controllers/startup-path-finder";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  StartupPathFinderSchema,
  StartupPathFinderSchemaType,
} from "@/validations/startup-path-finder";

const StartupPathFinderRouter = express.Router();

const { validator: createStartupPathFinderValidator } =
  ValidatorFactory<StartupPathFinderSchemaType>(StartupPathFinderSchema);

StartupPathFinderRouter.post(
  "/create-project",
  createStartupPathFinderValidator,
  AsyncHandler(createStartupPathFinderController)
);

StartupPathFinderRouter.get("/entries", AsyncHandler(getEntriesController));

export default StartupPathFinderRouter;
