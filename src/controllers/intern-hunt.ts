import { Request, Response } from "express";

import db from "@/drizzle";
import {
  InternHuntSchemaType,
  InternHuntStartupSchemaType,
  InternHuntStudentSchemaType,
  StartupLoginSchemaType,
} from "@/validations/intern-hunt";
import {
  comparePassword,
  createStartup,
  createStudent,
  getStartupEntries,
  getStudentEntries,
  InternHuntStartupType,
  InternHuntStudentType,
} from "@/services/intern-hunt";
import sendEmail from "@/utils/email";
import { generatePassword } from "@/utils";

export async function createInternHuntController(
  req: Request<{}, {}, InternHuntSchemaType["body"], {}>,
  _res: Response
): Promise<{ statusCode: number; message: string }> {
  const { userType, ...data } = req.body;

  await db.transaction(async (txn) => {
    if (userType === "startup") {
      const { founderName } = data as InternHuntStartupSchemaType;
      const password = generatePassword(12);
      const { id: startupId } = await createStartup(
        { ...(data as InternHuntStartupSchemaType), password },
        txn
      );

      await sendEmail({
        to: data.email,
        subject: "Intern Hunt Startup Created",
        header: "Intern Hunt Startup",
        content: `Dear ${founderName},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "Intern Hunt Startup". We are currently reviewing your details.
            <br><br>
            <strong>Intern Hunt(Startup) ID:</strong> ${startupId}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br>
            You can use the following credentials to log into the <a href={"https://intern-hunt-dashboard.vercel.app/"}>intern hunt dashboard</a> to view the view the students for recruitments.
            <strong>Email:</strong> ${data.email}
            <strong>Password:</strong> ${password}
            <br>
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`,
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
        header: "Intern Hunt Student",
        content: `Dear ${fullName},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "Intern Hunt Student". We are currently reviewing your details.
            <br><br>
            <strong>Team ID:</strong> ${studentId}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br> 
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`,
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

export async function startupLoginController(
  req: Request<{}, {}, StartupLoginSchemaType["body"], {}>,
  _: Response
): Promise<{ statusCode: number; success: boolean }> {
  const { email, password } = req.body;

  const isVerified = await comparePassword(email, password);

  return { statusCode: 200, success: isVerified };
}
