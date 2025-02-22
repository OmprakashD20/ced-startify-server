import express from "express";

import {
  createPitchXController,
  getEntriesController,
} from "@/controllers/pitch-x";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import { PitchXSchema, PitchXSchemaType } from "@/validations/pitch-x";

const PitchXRouter = express.Router();

const { validator: createProjectValidator } =
  ValidatorFactory<PitchXSchemaType>(PitchXSchema);

PitchXRouter.post(
  "/create-project",
  createProjectValidator,
  AsyncHandler(createPitchXController)
);

PitchXRouter.get("/entries", AsyncHandler(getEntriesController));

export default PitchXRouter;
