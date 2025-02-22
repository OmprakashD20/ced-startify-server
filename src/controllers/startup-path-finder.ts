import { Request, Response } from "express";

import db from "@/drizzle";
import { StartupPathFinderSchemaType } from "@/validations/startup-path-finder";
import {
  createStartupPathFinder,
  getEntries,
  PathFinderType,
} from "@/services/startup-path-finder";
import sendEmail from "@/utils/email";

export async function createStartupPathFinderController(
  req: Request<{}, {}, StartupPathFinderSchemaType["body"], {}>,
  _res: Response
): Promise<{ statusCode: number; message: string }> {
  const data = req.body;

  await db.transaction(async (txn) => {
    const { id } = await createStartupPathFinder(data, txn);

    await sendEmail({
      header: "Startup PathFinder",
      content: `Dear ${data.name},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "Startup PathFinder". We are currently reviewing your details.
            <br><br>
            <strong>Team ID:</strong> ${id}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br>
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`,
      subject: "Startup PathFinder Application Submitted",
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
