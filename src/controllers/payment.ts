import { Request, Response } from "express";
import crypto from "crypto";
import { Orders } from "razorpay/dist/types/orders";

import config, { razorpay } from "@/config";
import { generateReceipt } from "@/utils";
import {
  CreateOrderSchemaType,
  VerifyPaymentSchemaType,
} from "@/validations/payment";

export async function createOrderController(
  req: Request<{}, {}, CreateOrderSchemaType["body"], {}>,
  _res: Response
): Promise<{ order: Orders.RazorpayOrder; statusCode: number }> {
  const { amount } = req.body;

  const options = {
    amount: parseInt(amount) * 100,
    currency: "INR",
    receipt: `receipt_${generateReceipt()}`,
  };

  const order = await razorpay.orders.create(options);

  return {
    order,
    statusCode: 201,
  };
}

export async function verifyPaymentController(
  req: Request<{}, {}, VerifyPaymentSchemaType["body"], {}>,
  _res: Response
): Promise<{ message: string; statusCode: number }> {
  const { order_id, payment_id, signature } = req.body;

  const expectedSignature = crypto
    .createHmac("sha256", config.env.RAZORPAY_KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest("hex");

  if (signature === expectedSignature) {
    return { statusCode: 200, message: "Payment successful" };
  }

  return { statusCode: 400, message: "Invalid signature" };
}
