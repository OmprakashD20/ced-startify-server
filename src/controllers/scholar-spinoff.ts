import { Request, Response } from "express";

import db from "@/drizzle";
import { ScholarSpinoffSchemaType } from "@/validations/scholar-spinoff";
import {
  createScholarSpinoff,
  getEntries,
  ScholarSpinoffType,
} from "@/services/scholar-spinoff";
import sendEmail from "@/utils/email";

export async function createScholarSpinoffController(
  req: Request<{}, {}, ScholarSpinoffSchemaType["body"], {}>,
  _res: Response
): Promise<{
  statusCode: number;
  message: string;
}> {
  const data = req.body;

  await db.transaction(async (txn) => {
    const { id } = await createScholarSpinoff(data, txn);

    await sendEmail({
      header: "Scholar Spinoff",
      content: `Dear ${data.scholarName},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "Scholar Spinoff". We are currently reviewing your details.
            <br><br>
            <strong>Team ID:</strong> ${id}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br>
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`,
      subject: "Scholar Spinoff Application Submitted",
      to: data.scholarEmail,
    });
  });

  return {
    statusCode: 201,
    message: "Scholar Spinoff registration completed successfully.",
  };
}

export async function getEntriesController(
  _: Request,
  __: Response
): Promise<{
  statusCode: number;
  entries: ScholarSpinoffType[];
}> {
  let { entries } = await getEntries();

  return {
    statusCode: 200,
    entries,
  };
}
