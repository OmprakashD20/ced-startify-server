import { Request, Response } from "express";

import db from "@/drizzle";
import { createIPtoIPO, createMember } from "@/services/ip-to-ipo";
import { IpToIpoSchemaType } from "@/validations/ip-to-ipo";
import sendEmail from "@/utils/email";

export async function createProjectController(
  req: Request<{}, {}, IpToIpoSchemaType["body"], {}>,
  _res: Response
): Promise<{ statusCode: number }> {
  const { teamMembers: students, ...data } = req.body;

  await db.transaction(async (txn) => {
    const { id: ipoId } = await createIPtoIPO(
      {
        ...data,
        iprProof: data.iprProof || "no-proof",
        alternateContact: data.alternateContact || null,
        fundingDetails: data.fundingDetails || null,
        memberCount: parseInt(data.memberCount, 10),
      },
      txn
    );

    students.forEach(async (member) => {
      await createMember(
        {
          ...member,
          ipToIpoId: ipoId,
        },
        txn
      );
    });

    await sendEmail({
      to: students[0].email,
      subject: "Application Submitted",
      content: `Dear ${students[0].name},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "IP to IPO". We are currently reviewing your details.
            <br><br>
            <strong>Team ID:</strong> ${ipoId}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br>
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`,
      header: "IP to IPO",
    });
  });

  return { statusCode: 201 };
}
