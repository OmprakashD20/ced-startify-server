import "dotenv/config";

import validateEnv from "@/validations/validateEnv";

import { AppConfig } from "@/types";
import Razorpay from "razorpay";

const env = validateEnv();

const config: AppConfig = {
  env,
};

export const razorpay = new Razorpay({
  key_id: config.env.RAZORPAY_KEY_ID,
  key_secret: config.env.RAZORPAY_KEY_SECRET,
});

export default config;
