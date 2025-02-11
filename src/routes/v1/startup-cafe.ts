import express from "express";

import {
  createProjectController,
  getCollegesController,
  getStartupsController,
} from "@/controllers/startup-cafe";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  StartUpCafeSchema,
  StartUpCafeSchemaType,
} from "@/validations/startup-cafe";

const StartUpCafeRouter = express.Router();

const { validator: createProjectValidator } =
  ValidatorFactory<StartUpCafeSchemaType>(StartUpCafeSchema);

StartUpCafeRouter.post(
  "/create-project",
  createProjectValidator,
  AsyncHandler(createProjectController)
);

StartUpCafeRouter.get("/colleges", AsyncHandler(getCollegesController));

StartUpCafeRouter.get("/startups", AsyncHandler(getStartupsController));

export default StartUpCafeRouter;
