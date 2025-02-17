import express from "express";

import {
  createStartupAtlasProjectController,
  getEntriesController,
} from "@/controllers/startup-atlas";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  StartupAtlasSchema,
  StartupAtlasSchemaType,
} from "@/validations/startup-atlas";

const StartupAtlasRouter = express.Router();

const { validator: createProjectValidator } =
  ValidatorFactory<StartupAtlasSchemaType>(StartupAtlasSchema);

StartupAtlasRouter.post(
  "/create-project",
  createProjectValidator,
  AsyncHandler(createStartupAtlasProjectController)
);

StartupAtlasRouter.get("/entries", AsyncHandler(getEntriesController));

export default StartupAtlasRouter;
