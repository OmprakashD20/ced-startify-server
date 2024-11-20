import { Request, Response } from "express";

import db from "@/drizzle";
import { createStartup } from "@/services/startup-atlas";
import { StartupAtlasSchemaType } from "@/validations/startup-atlas";
import sendEmail from "@/utils/email";

export async function createStartupAtlasProjectController(
  req: Request<{}, {}, StartupAtlasSchemaType["body"], {}>,
  res: Response
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
