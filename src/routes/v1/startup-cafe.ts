import express from "express";

import {
  approveStartupCafeController,
  createProjectController,
  getCollegesController,
  getStartupsController,
  updateStartupCafeController,
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

StartUpCafeRouter.patch(
  "/update/:id",
  AsyncHandler(updateStartupCafeController)
);

StartUpCafeRouter.patch(
  "/approve/:id",
  AsyncHandler(approveStartupCafeController)
);

export default StartUpCafeRouter;
