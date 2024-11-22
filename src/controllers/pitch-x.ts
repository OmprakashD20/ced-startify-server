import { Request, Response } from "express";
import db from "@/drizzle";
import { createPitchX, createPitchXMember } from "@/services/pitch-x";
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
      name: data.name,
      teamId: pitchXId,
      eventName: "Pitch X",
    });
  });

  return {
    statusCode: 201,
    message: "Pitch X registration completed successfully.",
  };
}
