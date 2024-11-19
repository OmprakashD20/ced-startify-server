import express from "express";

import StartUpCafeRouter from "@/routes/v1/startup-cafe";
import StartUpMughavariRouter from "@/routes/v1/startup-mughavari";

const v1Router = express.Router();

v1Router.use("/startup-cafe", StartUpCafeRouter);
v1Router.use("/startup-mughavari", StartUpMughavariRouter);

export default v1Router;
