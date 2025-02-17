import { Request, Response } from "express";

import db from "@/drizzle";
import { ScholarSpinoffSchemaType } from "@/validations/scholar-spinoff";
import { createScholarSpinoff, getEntries, ScholarSpinoffType } from "@/services/scholar-spinoff";
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
      eventName: "Scholar Spinoff",
      name: data.scholarName,
      subject: "Scholar Spinoff Application Submitted",
      teamId: id,
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
