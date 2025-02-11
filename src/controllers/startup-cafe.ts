import { Request, Response } from "express";

import db from "@/drizzle";
import {
  createStartUpCafe,
  getColleges,
  getStartups,
  GetStartupsType,
} from "@/services/startup-cafe";
import { createStudent } from "@/services/student";
import { StartUpCafeSchemaType } from "@/validations/startup-cafe";
import sendEmail from "@/utils/email";

export async function createProjectController(
  req: Request<{}, {}, StartUpCafeSchemaType["body"], {}>,
  _res: Response
): Promise<{ statusCode: number }> {
  const { teamMembers: students, ...data } = req.body;

  await db.transaction(async (txn) => {
    const { id: startupCafeId } = await createStartUpCafe(
      {
        ...data,
        sameInstitution: data.sameInstitution === "yes",
      },
      txn
    );

    students.forEach(async (student) => {
      await createStudent(
        {
          ...student,
          startupCafeId,
        },
        txn
      );
    });

    await sendEmail({
      to: students[0].email,
      subject: "Application Submitted",
      name: students[0].name,
      teamId: startupCafeId,
      eventName: "Startup Cafe Prototyping Hackathon",
    });
  });

  return { statusCode: 201 };
}

export async function getCollegesController(
  _req: Request,
  _res: Response
): Promise<{ colleges: string[]; statusCode: number }> {
  const { colleges } = await getColleges();

  return { colleges, statusCode: 200 };
}

export async function getStartupsController(
  _req: Request,
  _res: Response
): Promise<{ startups: GetStartupsType; statusCode: number }> {
  const { startups } = await getStartups();

  return { startups, statusCode: 200 };
}
