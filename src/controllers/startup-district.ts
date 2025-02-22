import { Request, Response } from "express";
import db from "@/drizzle";
import {
  createStartupDistrict,
  createStartupDistrictMember,
  getStartupDistricts,
  GetStartupDistrictsType,
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
      header: "Startup District",
      content: `Dear ${data.founderName},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "Startup District". We are currently reviewing your details.
            <br><br>
            <strong>Team ID:</strong> ${startupDistrictId}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br>
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`,
    });
  });

  return {
    statusCode: 201,
    message: "Startup District registration completed successfully.",
  };
}

export async function getStartupDistrictsController(
  _req: Request,
  _res: Response
): Promise<{ startupDistricts: GetStartupDistrictsType; statusCode: number }> {
  const { startupDistricts } = await getStartupDistricts();

  const result = startupDistricts.map((e) => ({
    ...e,
    memberCount: e.members.length,
  }));

  return { startupDistricts: result, statusCode: 200 };
}
