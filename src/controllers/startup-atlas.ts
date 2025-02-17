import { Request, Response } from "express";

import db from "@/drizzle";
import {
  createStartup,
  getEntries,
  StartupAtlasType,
} from "@/services/startup-atlas";
import { StartupAtlasSchemaType } from "@/validations/startup-atlas";
import sendEmail from "@/utils/email";

export async function createStartupAtlasProjectController(
  req: Request<{}, {}, StartupAtlasSchemaType["body"], {}>,
  _res: Response
): Promise<{
  statusCode: number;
  message: string;
}> {
  const data = req.body;

  await db.transaction(async (txn) => {
    const { id } = await createStartup(data, txn);

    await sendEmail({
      eventName: "Startup Atlas",
      name: data.student.name,
      subject: "Application Submitted",
      teamId: id,
      to: data.student.email,
    });
  });

  return {
    statusCode: 201,
    message: "Startup Atlas registration completed successfully.",
  };
}

export async function getEntriesController(
  _: Request,
  __: Response
): Promise<{
  statusCode: number;
  entries: StartupAtlasType[];
}> {
  let { entries } = await getEntries();

  return {
    statusCode: 200,
    entries,
  };
}
