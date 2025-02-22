import { Request, Response } from "express";

import db from "@/drizzle";
import { FounderFindSchemaType } from "@/validations/founder-find";
import {
  createFounderFind,
  getFounders,
  GetFoundersType,
} from "@/services/founder-find";
import sendEmail from "@/utils/email";

export async function createFounderFindController(
  req: Request<{}, {}, FounderFindSchemaType["body"], {}>,
  _res: Response
): Promise<{
  statusCode: number;
  message: string;
}> {
  const data = req.body;

  await db.transaction(async (txn) => {
    const { id } = await createFounderFind(data, txn);

    await sendEmail({
      header: "Founder Find",
      content: `Dear ${data.name},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "Founder Find". We are currently reviewing your details.
            <br><br>
            <strong>Team ID:</strong> ${id}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br> 
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`, 
      subject: "Founder Find Registration Submitted", 
      to: data.email,
    });
  });

  return {
    statusCode: 201,
    message: "Founder Find registration completed successfully.",
  };
}

export async function getFoundersController(
  _req: Request,
  _res: Response
): Promise<{ founders: GetFoundersType; statusCode: number }> {
  const { founders } = await getFounders();

  return { founders, statusCode: 200 };
}
