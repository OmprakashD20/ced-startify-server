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
      header: "Startup Atlas",
      subject: "Application Submitted",
      to: data.student.email,
      content: `Dear ${data.student.name},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "Startup Atlas". We are currently reviewing your details.
            <br><br>
            <strong>Team ID:</strong> ${id}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br>
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`,
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
