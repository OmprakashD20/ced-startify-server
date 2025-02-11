import express from "express";

import StartUpCafeRouter from "@/routes/v1/startup-cafe";
import StartUpMughavariRouter from "@/routes/v1/startup-mughavari";
import InternHuntRouter from "@/routes/v1/intern-hunt";
import StartupAtlasRouter from "@/routes/v1/startup-atlas";
import ScholarSpinoffRouter from "@/routes/v1/scholar-spinoff";
import StartupPathFinderRouter from "@/routes/v1/startup-path-finder";
import PitchXRouter from "@/routes/v1/pitch-x";
import GurusPitchRouter from "@/routes/v1/gurus-pitch";
import StartupDistrictRouter from "@/routes/v1/startup-district";
import GoldenStarECellRouter from "@/routes/v1/golden-star-ecell";
import FounderFindRouter from "@/routes/v1/founder-find";

const v1Router = express.Router();

v1Router.use("/startup-cafe", StartUpCafeRouter);
v1Router.use("/startup-mughavari", StartUpMughavariRouter);
v1Router.use("/intern-hunt", InternHuntRouter);
v1Router.use("/startup-atlas", StartupAtlasRouter);
v1Router.use("/scholar-spinoff", ScholarSpinoffRouter);
v1Router.use("/startup-path-finder", StartupPathFinderRouter);
v1Router.use("/pitch-x", PitchXRouter);
v1Router.use("/gurus-pitch", GurusPitchRouter);
v1Router.use("/founder-find", FounderFindRouter);
v1Router.use("/startup-district", StartupDistrictRouter);
v1Router.use("/golden-star-ecell", GoldenStarECellRouter);

v1Router.get(
  "/colleges",
  AsyncHandler(async (_: Request, __: Response) => ({
    statusCode: 200,
    colleges,
  }))
);

export default v1Router;
