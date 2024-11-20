import { Request, Response } from "express";

import db from "@/drizzle";
import {
  InternHuntSchemaType,
  InternHuntStartupSchemaType,
  InternHuntStudentSchemaType,
} from "@/validations/intern-hunt";
import { createStartup, createStudent } from "@/services/intern-hunt";
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
