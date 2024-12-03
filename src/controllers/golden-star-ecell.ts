import { Request, Response } from "express";

import db from "@/drizzle";
import {
  createGoldenStarECellAward,
  createGoldenStarECellActivities,
} from "@/services/golden-star-ecell";
import sendEmail from "@/utils/email";

import { GoldenStarECellAwardsSchemaType } from "@/validations/golden-star-ecell";

export async function createGoldenStarECellAwardController(
  req: Request<{}, {}, GoldenStarECellAwardsSchemaType["body"], {}>,
  _: Response
): Promise<{ statusCode: number; message: string }> {
  const { activities, ...data } = req.body;

  await db.transaction(async (txn) => {
    const { id: ecellId } = await createGoldenStarECellAward(data, txn);

    await createGoldenStarECellActivities(activities, ecellId, txn);

    await sendEmail({
      to: data.ecellCoordinator.email,
      subject: "Golden Star ECell Award registration completed",
      name: data.ecellCoordinator.name,
      eventName: "Golden Star ECell Award",
      teamId: ecellId,
    });
  });

  return {
    statusCode: 201,
    message: "Golden Star ECell Award registration completed successfully.",
  };
}
