import express from "express";

import { createInternHuntController } from "@/controllers/intern-hunt";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  InternHuntSchema,
  InternHuntSchemaType,
} from "@/validations/intern-hunt";

const InternHuntRouter = express.Router();

const { validator: createProjectValidator } =
  ValidatorFactory<InternHuntSchemaType>(InternHuntSchema);

InternHuntRouter.post(
  "/create-project",
  createProjectValidator,
  AsyncHandler(createInternHuntController)
);

export default InternHuntRouter;
