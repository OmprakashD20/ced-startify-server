import { Request, Response } from "express";

import db from "@/drizzle";
import {
    createCoFounder,
    createCompany,
    createFounder,
    createStartUpMughavari,
} from "@/services/startup-mughavari";
import sendEmail from "@/utils/email";
import { StartupMughavariSchemaType } from "@/validations/startup-mughavari";

export async function createProjectController(
  req: Request<{}, {}, StartupMughavariSchemaType["body"], {}>,
  _res: Response
): Promise<{ statusCode: number }> {
  const { founder, hasCoFounders, coFounders, company } = req.body;

  await db.transaction(async (txn) => {
    const { id: founderId } = await createFounder({ data: founder }, txn);

    const { id: companyId } = await createCompany(
      { data: { ...company, hasCoFounders }, founderId },
      txn
    );

    await createStartUpMughavari(
      { data: { paymentId: "some_payment_id", approved: false }, companyId },
      txn
    );

    if (hasCoFounders && coFounders) {
      for (const coFounder of coFounders) {
        await createCoFounder({ data: coFounder, companyId }, txn);
      }
    }
  });

  await sendEmail({
    to: founder.email,
    subject: "Application submitted successfully",
  });

  return { statusCode: 201 };
}
