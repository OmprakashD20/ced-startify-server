import express from "express";

import {
  createFounderFindController,
  getFoundersController,
} from "@/controllers/founder-find";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  FounderFindSchema,
  FounderFindSchemaType,
} from "@/validations/founder-find";

const FounderFindRouter = express.Router();

const { validator: createFounderFindValidator } =
  ValidatorFactory<FounderFindSchemaType>(FounderFindSchema);

FounderFindRouter.post(
  "/create-founder",
  createFounderFindValidator,
  AsyncHandler(createFounderFindController)
);

FounderFindRouter.get("/founders", AsyncHandler(getFoundersController));

export default FounderFindRouter;
