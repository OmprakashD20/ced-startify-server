import express from "express";
import { createGoldenStarECellAwardController } from "@/controllers/golden-star-ecell";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  GoldenStarECellAwardsSchema,
  GoldenStarECellAwardsSchemaType,
} from "@/validations/golden-star-ecell";

const GoldenStarECellRouter = express.Router();

const { validator: createECellAwardValidator } =
  ValidatorFactory<GoldenStarECellAwardsSchemaType>(
    GoldenStarECellAwardsSchema
  );

GoldenStarECellRouter.post(
  "/create-award",
  createECellAwardValidator,
  AsyncHandler(createGoldenStarECellAwardController)
);

export default GoldenStarECellRouter;
