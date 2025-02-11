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
      eventName: "Founder Find",
      name: data.name,
      subject: "Founder Find Registration Submitted",
      teamId: id,
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
