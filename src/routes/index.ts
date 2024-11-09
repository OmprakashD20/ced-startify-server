import express from "express";

import {
  createProjectController,
  getProjectsController,
  approveProjectController,
} from "@/controllers/project";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  ApproveProjectSchema,
  ApproveProjectSchemaType,
  ProjectSchema,
  ProjectSchemaType,
} from "@/validations/project";

const router = express.Router();

router.get("/projects", AsyncHandler(getProjectsController));

const { validator: createProjectValidator } =
  ValidatorFactory<ProjectSchemaType>(ProjectSchema);

router.post(
  "/create-project",
  createProjectValidator,
  AsyncHandler(createProjectController)
);

const { validator: approveProjectValidator } =
  ValidatorFactory<ApproveProjectSchemaType>(ApproveProjectSchema);

router.patch(
  "/approve-project",
  approveProjectValidator,
  AsyncHandler(approveProjectController)
);

export default router;
