import express from "express";

import StartUpCafeRouter from "@/routes/v1/startup-cafe";
import StartUpMughavariRouter from "@/routes/v1/startup-mughavari";
import InternHuntRouter from "@/routes/v1/intern-hunt";
import StartupAtlasRouter from "@/routes/v1/startup-atlas";
import ScholarSpinoffRouter from "@/routes/v1/scholar-spinoff";

const v1Router = express.Router();

v1Router.use("/startup-cafe", StartUpCafeRouter);
v1Router.use("/startup-mughavari", StartUpMughavariRouter);
v1Router.use("/intern-hunt", InternHuntRouter);
v1Router.use("/startup-atlas", StartupAtlasRouter);
v1Router.use("/scholar-spinoff", ScholarSpinoffRouter);

export default v1Router;
