import * as z from "zod";

export const CreateOrderSchema = z.object({
  body: z.object({
    amount: z.string({
      required_error: "Amount is required",
    }),
  }),
});

export type CreateOrderSchemaType = z.infer<typeof CreateOrderSchema>;

export const VerifyPaymentSchema = z.object({
  body: z.object({
    order_id: z.string({
      required_error: "Order ID is required",
    }),
    payment_id: z.string({
      required_error: "Payment ID is required",
    }),
    signature: z.string({
      required_error: "Signature is required",
    }),
  }),
});

export type VerifyPaymentSchemaType = z.infer<typeof VerifyPaymentSchema>;
