import express from "express";

import { createScholarSpinoffController, getEntriesController } from "@/controllers/scholar-spinoff";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  ScholarSpinoffSchema,
  ScholarSpinoffSchemaType,
} from "@/validations/scholar-spinoff";

const ScholarSpinoffRouter = express.Router();

const { validator: createScholarSpinoffValidator } =
  ValidatorFactory<ScholarSpinoffSchemaType>(ScholarSpinoffSchema);

ScholarSpinoffRouter.post(
  "/create-project",
  createScholarSpinoffValidator,
  AsyncHandler(createScholarSpinoffController)
);

ScholarSpinoffRouter.get("/entries", AsyncHandler(getEntriesController));

export default ScholarSpinoffRouter;
