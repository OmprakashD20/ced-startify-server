import express from "express";

import { createGurusPitchController } from "@/controllers/gurus-pitch";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  GurusPitchSchema,
  GurusPitchSchemaType,
} from "@/validations/gurus-pitch";

const GurusPitchRouter = express.Router();

const { validator: createProjectValidator } =
  ValidatorFactory<GurusPitchSchemaType>(GurusPitchSchema);

GurusPitchRouter.post(
  "/create-project",
  createProjectValidator,
  AsyncHandler(createGurusPitchController)
);

export default GurusPitchRouter;
