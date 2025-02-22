import { Request, Response } from "express";
import db from "@/drizzle";
import {
  createPitchX,
  createPitchXMember,
  getEntries,
  PitchXType,
} from "@/services/pitch-x";
import { PitchXSchemaType } from "@/validations/pitch-x";
import sendEmail from "@/utils/email";

export async function createPitchXController(
  req: Request<{}, {}, PitchXSchemaType["body"], {}>,
  _res: Response
): Promise<{ statusCode: number; message: string }> {
  const { teamMembers, ...data } = req.body;

  await db.transaction(async (txn) => {
    const { id: pitchXId } = await createPitchX(data, txn);

    for (const member of teamMembers) {
      const memberData = { ...member, pitchXId };
      await createPitchXMember(memberData, txn);
    }

    await sendEmail({
      to: data.email,
      subject: "Pitch X application submitted",
      header: "Pitch X",
      content: `Dear ${data.name},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "Pitch X". We are currently reviewing your details.
            <br><br>
            <strong>Team ID:</strong> ${pitchXId}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br>
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`,
    });
  });

  return {
    statusCode: 201,
    message: "Pitch X registration completed successfully.",
  };
}

export async function getEntriesController(
  _: Request,
  __: Response
): Promise<{
  statusCode: number;
  entries: PitchXType[];
}> {
  let { entries } = await getEntries();

  return {
    statusCode: 200,
    entries,
  };
}
