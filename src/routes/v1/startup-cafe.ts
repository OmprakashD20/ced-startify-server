import express from "express";

import { createProjectController } from "@/controllers/startup-cafe";
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

export default StartUpCafeRouter;
