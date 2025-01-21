import express from "express";

import {
  createProjectController,
  getCollegesController,
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

export default StartUpCafeRouter;
