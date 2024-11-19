import express from "express";

import {
  createOrderController,
  verifyPaymentController,
} from "@/controllers/payment";
import AsyncHandler from "@/utils/asyncHandler";
import ValidatorFactory from "@/validations";
import {
  CreateOrderSchema,
  CreateOrderSchemaType,
  VerifyPaymentSchema,
  VerifyPaymentSchemaType,
} from "@/validations/payment";

const PaymentRouter = express.Router();

const { validator: createOrderValidator } =
  ValidatorFactory<CreateOrderSchemaType>(CreateOrderSchema);

PaymentRouter.post(
  "/create-order",
  createOrderValidator,
  AsyncHandler(createOrderController)
);

const { validator: verifyPaymentValidator } =
  ValidatorFactory<VerifyPaymentSchemaType>(VerifyPaymentSchema);

PaymentRouter.post(
  "/verify-payment",
  verifyPaymentValidator,
  AsyncHandler(verifyPaymentController)
);

export default PaymentRouter;
