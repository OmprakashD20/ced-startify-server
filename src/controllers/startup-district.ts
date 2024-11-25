import { Request, Response } from "express";
import db from "@/drizzle";
import {
  createStartupDistrict,
  createStartupDistrictMember,
} from "@/services/startup-district";
import { StartupDistrictSchemaType } from "@/validations/startup-district";
import sendEmail from "@/utils/email";

export async function createStartupDistrictController(
  req: Request<{}, {}, StartupDistrictSchemaType["body"], {}>,
  _res: Response
): Promise<{ statusCode: number; message: string }> {
  const { coFounders, ...data } = req.body;

  await db.transaction(async (txn) => {
    const { id: startupDistrictId } = await createStartupDistrict(data, txn);

    for (const founder of coFounders) {
      const founderData = { ...founder, startupDistrictId };
      await createStartupDistrictMember(founderData, txn);
    }

    await sendEmail({
      to: data.founderEmail,
      subject: "Startup District Application Submitted",
      name: data.founderName,
      teamId: startupDistrictId,
      eventName: "Startup District",
    });
  });

  return {
    statusCode: 201,
    message: "Startup District registration completed successfully.",
  };
}
