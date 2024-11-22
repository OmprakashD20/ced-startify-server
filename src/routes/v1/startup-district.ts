import express from "express";

import { createStartupDistrictController } from "@/controllers/startup-district";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  StartupDistrictSchema,
  StartupDistrictSchemaType,
} from "@/validations/startup-district";

const StartupDistrictRouter = express.Router();

const { validator: createProjectValidator } =
  ValidatorFactory<StartupDistrictSchemaType>(StartupDistrictSchema);

StartupDistrictRouter.post(
  "/create-project",
  createProjectValidator,
  AsyncHandler(createStartupDistrictController)
);

export default StartupDistrictRouter;
