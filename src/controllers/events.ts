import { Request, Response } from "express";

import db from "@/drizzle";
import {
  StartUpCafeTable,
  FounderFindTable,
  GoldenStarECellAwardTable,
  GurusPitchTable,
  InternHuntStartupTable,
  InternHuntStudentTable,
  ScholarSpinoffTable,
  StartupAtlasTable,
  StartupDistrictTable,
  StartupMughavariTable,
  StartupPathFinderTable,
  PitchXTable,
} from "@/drizzle/schema";

type Event =
  | "startup-cafe"
  | "pitch-x"
  | "startup-mughavari"
  | "e-cell-awards"
  | "gurus-pitch"
  | "intern-hunt-startup"
  | "intern-hunt-student"
  | "founder-find"
  | "startup-atlas"
  | "path-finder"
  | "startup-district"
  | "scholars-spin-off";

export async function getEventCountController(
  _req: Request,
  _res: Response
): Promise<{
  statusCode: number;
  count: Record<Event, number>;
}> {
  const count: Record<Event, number> = {
    "startup-cafe": await db.$count(StartUpCafeTable),
    "pitch-x": await db.$count(PitchXTable),
    "startup-mughavari": await db.$count(StartupMughavariTable),
    "e-cell-awards": await db.$count(GoldenStarECellAwardTable),
    "gurus-pitch": await db.$count(GurusPitchTable),
    "intern-hunt-startup": await db.$count(InternHuntStartupTable),
    "intern-hunt-student": await db.$count(InternHuntStudentTable),
    "founder-find": await db.$count(FounderFindTable),
    "startup-atlas": await db.$count(StartupAtlasTable),
    "path-finder": await db.$count(StartupPathFinderTable),
    "startup-district": await db.$count(StartupDistrictTable),
    "scholars-spin-off": await db.$count(ScholarSpinoffTable),
  };
  return {
    statusCode: 201,
    count,
  };
}
