import { Request, Response } from "express";

import db from "@/drizzle";
import {
  createGurusPitch,
  createGurusPitchMember,
  GetGuruPitchType,
  getGurusPitch,
} from "@/services/gurus-pitch";
import { GurusPitchSchemaType } from "@/validations/gurus-pitch";
import sendEmail from "@/utils/email";

export async function createGurusPitchController(
  req: Request<{}, {}, GurusPitchSchemaType["body"], {}>,
  _res: Response
): Promise<{ statusCode: number; message: string }> {
  const { coFounders, ...data } = req.body;

  await db.transaction(async (txn) => {
    const { id: gurusPitchId } = await createGurusPitch(data, txn);

    for (const founder of coFounders) {
      const founderData = { ...founder, gurusPitchId };
      await createGurusPitchMember(founderData, txn);
    }

    await sendEmail({
      to: data.facultyEmail,
      subject: "Gurus Pitch application submitted",
      name: data.facultyName,
      teamId: gurusPitchId,
      eventName: "Gurus Pitch",
    });
  });

  return {
    statusCode: 201,
    message: "Gurus Pitch registration completed successfully.",
  };
}

export async function getGurusPitchController(
  _req: Request,
  _res: Response
): Promise<{ gurusPitch: GetGuruPitchType; statusCode: number }> {
  const { gurusPitch } = await getGurusPitch();

  return { gurusPitch, statusCode: 200 };
}
