import { Request, Response } from "express";

import db from "@/drizzle";
import { StartupPathFinderSchemaType } from "@/validations/startup-path-finder";
import { createStartupPathFinder, getEntries, PathFinderType } from "@/services/startup-path-finder";
import sendEmail from "@/utils/email";

export async function createStartupPathFinderController(
  req: Request<{}, {}, StartupPathFinderSchemaType["body"], {}>,
  _res: Response
): Promise<{ statusCode: number; message: string }> {
  const data = req.body;

  await db.transaction(async (txn) => {
    const { id } = await createStartupPathFinder(data, txn);

    await sendEmail({
      eventName: "Startup PathFinder",
      name: data.name,
      subject: "Startup PathFinder Application Submitted",
      teamId: id,
      to: data.email,
    });
  });

  return {
    statusCode: 201,
    message: "Startup PathFinder registration completed successfully.",
  };
}

export async function getEntriesController(
  _: Request,
  __: Response
): Promise<{
  statusCode: number;
  entries: PathFinderType[];
}> {
  let { entries } = await getEntries();

  return {
    statusCode: 200,
    entries,
  };
}
