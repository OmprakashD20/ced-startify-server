import express from "express";

import PaymentRouter from "@/routes/payment";
import v1Router from "@/routes/v1";

const router = express.Router();

router.use("/payment", PaymentRouter);
router.use("/v1", v1Router);

export default router;
