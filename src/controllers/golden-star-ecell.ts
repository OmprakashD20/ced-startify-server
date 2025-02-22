import { Request, Response } from "express";

import db from "@/drizzle";
import {
  createGoldenStarECellAward,
  getECellEntries,
  getRegisteredInstitutions,
} from "@/services/golden-star-ecell";
import sendEmail from "@/utils/email";

const link =
  "https://docs.google.com/forms/d/e/1FAIpQLSeKm6hvKvbZZE2FDZDOqiEq-G_R-F2KyXV5NmCHJFuDq0OKJg/viewform?usp=sharing";

import { GoldenStarECellAwardsSchemaType } from "@/validations/golden-star-ecell";
import { GoldenStarECellAwardType } from "@/types";

export async function createGoldenStarECellAwardController(
  req: Request<{}, {}, GoldenStarECellAwardsSchemaType["body"], {}>,
  _: Response
): Promise<{ statusCode: number; message: string }> {
  const { ...data } = req.body;

  await db.transaction(async (txn) => {
    const { id: ecellId } = await createGoldenStarECellAward(data, txn);

    await sendEmail({
      to: data.ecellCoordinator.email,
      subject: "Golden Star ECell Award registration completed",
      header: "Golden Star ECell Award",
      content: `Dear ${data.ecellCoordinator.name},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "Golden Star ECell Award". We are currently reviewing your details.
            <br><br>
            <strong>Team ID:</strong> ${ecellId}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br><strong>Submission Link:</strong> <a href=${link}>Click Here</a>
            <br><br>
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`,
    });
  });

  return {
    statusCode: 201,
    message: "Golden Star ECell Award registration completed successfully.",
  };
}

export async function getRegisteredInstitutionsController(
  _: Request,
  __: Response
): Promise<{
  statusCode: number;
  institutions: { institutionName: string }[];
}> {
  let institutions = await getRegisteredInstitutions();

  //remove duplicate institutions
  institutions = institutions.filter(
    (v, i, a) =>
      a.findIndex((t) => t.institutionName === v.institutionName) === i
  );

  return {
    statusCode: 200,
    institutions,
  };
}

export async function getECellEntriesController(
  _: Request,
  __: Response
): Promise<{
  statusCode: number;
  entries: GoldenStarECellAwardType[];
}> {
  let { entries } = await getECellEntries();

  return {
    statusCode: 200,
    entries,
  };
}
