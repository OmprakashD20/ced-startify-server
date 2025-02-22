import { Request, Response } from "express";

import db from "@/drizzle";
import {
  InternHuntSchemaType,
  InternHuntStartupSchemaType,
  InternHuntStudentSchemaType,
} from "@/validations/intern-hunt";
import {
  createStartup,
  createStudent,
  getStartupEntries,
  getStudentEntries,
  InternHuntStartupType,
  InternHuntStudentType,
} from "@/services/intern-hunt";
import sendEmail from "@/utils/email";

export async function createInternHuntController(
  req: Request<{}, {}, InternHuntSchemaType["body"], {}>,
  _res: Response
): Promise<{ statusCode: number; message: string }> {
  const { userType, ...data } = req.body;

  await db.transaction(async (txn) => {
    if (userType === "startup") {
      const { founderName } = data as InternHuntStartupSchemaType;
      const { id: startupId } = await createStartup(
        data as InternHuntStartupSchemaType,
        txn
      );

      await sendEmail({
        to: data.email,
        subject: "Intern Hunt Startup Created",
        name: founderName,
        teamId: startupId,
        eventName: "Intern Hunt Startup",
      });
    } else if (userType === "student") {
      const { fullName } = data as InternHuntStudentSchemaType;
      const { id: studentId } = await createStudent(
        data as InternHuntStudentSchemaType,
        txn
      );

      await sendEmail({
        to: data.email,
        subject: "Intern Hunt Student Registration Complete",
        name: fullName,
        teamId: studentId,
        eventName: "Intern Hunt Student",
      });
    }
  });

  return {
    statusCode: 201,
    message: "Intern Hunt registration completed successfully.",
  };
}

export async function getStartupEntriesController(
  _: Request,
  __: Response
): Promise<{
  statusCode: number;
  entries: Omit<
    InternHuntStartupType,
    "otherIndustryDomain" | "otherInternshipRole"
  >[];
}> {
  let { entries } = await getStartupEntries();

  entries = entries.map((entry) => ({
    ...entry,
    industryDomain:
      entry.industryDomain === "Other"
        ? entry.otherIndustryDomain!
        : entry.industryDomain,
    internshipRoles:
      entry.internshipRoles === "Other"
        ? entry.otherInternshipRole!
        : entry.internshipRoles,
  }));

  return {
    statusCode: 200,
    entries,
  };
}

export async function getStudentEntriesController(
  _: Request,
  __: Response
): Promise<{
  statusCode: number;
  entries: Omit<
    InternHuntStudentType,
    "otherPreferredDomain" | "otherPreferredStartupType" | "otherSkills"
  >[];
}> {
  let { entries } = await getStudentEntries();

  entries = entries.map((entry) => ({
    ...entry,
    skills: entry.skills === "Other" ? entry.otherSkills! : entry.skills,
    preferredDomain:
      entry.preferredDomain === "Other"
        ? entry.otherPreferredDomain!
        : entry.preferredDomain,
    preferredStartupType:
      entry.preferredStartupType === "Other"
        ? entry.otherPreferredStartupType!
        : entry.preferredStartupType,
  }));

  return {
    statusCode: 200,
    entries,
  };
}
