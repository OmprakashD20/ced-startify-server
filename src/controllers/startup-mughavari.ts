import { Request, Response } from "express";

import db from "@/drizzle";
import {
  createCoFounder,
  createCompany,
  createFounder,
  createStartUpMughavari,
  getEntries,
  StartupMughavariCofounder,
} from "@/services/startup-mughavari";
import sendEmail from "@/utils/email";
import { StartupMughavariSchemaType } from "@/validations/startup-mughavari";

export async function createProjectController(
  req: Request<{}, {}, StartupMughavariSchemaType["body"], {}>,
  _res: Response
): Promise<{ statusCode: number }> {
  const { founder, hasCoFounders, coFounders, company, paymentId } = req.body;

  await db.transaction(async (txn) => {
    const { id: founderId } = await createFounder({ data: founder }, txn);

    const { id: companyId } = await createCompany(
      { data: { ...company, hasCoFounders }, founderId },
      txn
    );

    const { id: startupMughavariId } = await createStartUpMughavari(
      { data: { paymentId, approved: false }, companyId },
      txn
    );

    if (hasCoFounders && coFounders) {
      for (const coFounder of coFounders) {
        await createCoFounder({ data: coFounder, companyId }, txn);
      }
    }

    await sendEmail({
      to: founder.email,
      subject: "Application submitted successfully",
      header: "Startup Mughavari",
      content: `Dear ${founder.name},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "Startup Mughavari". We are currently reviewing your details.
            <br><br>
            <strong>Team ID:</strong> ${startupMughavariId}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br>
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`,
    });
  });

  return { statusCode: 201 };
}

export async function getEntriesController(
  _: Request,
  __: Response
): Promise<{
  statusCode: number;
  entries: {
    id: string;
    founderName: string;
    founderEmail: string;
    founderPhone: string;
    name: string;
    address: string;
    type: string;
    sector: string;
    hasCoFounders: boolean;
    coFounders: StartupMughavariCofounder[];
    approved: boolean;
    paymentId: string;
  }[];
}> {
  let { entries } = await getEntries();

  const result = entries.map((entry) => ({
    id: entry.id,
    founderName: entry.company?.founder?.name || "",
    founderEmail: entry.company?.founder?.email || "",
    founderPhone: entry.company?.founder?.phone || "",
    name: entry.company?.name || "",
    address: entry.company?.address || "",
    type: entry.company?.type || "",
    sector: entry.company?.sector || "",
    hasCoFounders: entry.company?.hasCoFounders || false,
    coFounders:
      entry.company?.coFounders?.map((coFounder) => ({
        id: coFounder.id,
        name: coFounder.name,
        email: coFounder.email,
        phone: coFounder.phone,
        companyId: coFounder.companyId,
      })) || [],
    approved: entry.approved ?? false,
    paymentId: entry.paymentId,
  }));

  return {
    statusCode: 200,
    entries: result,
  };
}
