import express from "express";

import { createProjectController } from "@/controllers/ip-to-ipo";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import { IpToIpoSchema, IpToIpoSchemaType } from "@/validations/ip-to-ipo";

const IpoRouter = express.Router();

const { validator: createProjectValidator } =
  ValidatorFactory<IpToIpoSchemaType>(IpToIpoSchema);

IpoRouter.post(
  "/create-project",
  createProjectValidator,
  AsyncHandler(createProjectController)
);

export default IpoRouter;