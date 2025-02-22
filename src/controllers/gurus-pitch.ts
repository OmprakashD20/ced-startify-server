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
      header: "Gurus Pitch",
      content: `Dear ${data.facultyName},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "Gurus Pitch". We are currently reviewing your details.
            <br><br>
            <strong>Team ID:</strong> ${gurusPitchId}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br>
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`,
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

  const result = gurusPitch.map((e) => ({
    ...e,
    memberCount: e.members.length,
  }));

  return { gurusPitch: result, statusCode: 200 };
}
