import { Request, Response } from "express";

import db from "@/drizzle";
import { createStartUpCafe } from "@/services/startup-cafe";
import {
  assignStartUpCafe,
  checkStudentExists,
  createStudent,
} from "@/services/student";
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
      //check if student exists
      const { exists, id } = await checkStudentExists(student.email, txn);

      if (exists)
        //assign the startup cafe
        return await assignStartUpCafe({
          startupCafeId,
          studentId: id!,
        });

      //create a student
      const { id: studentId } = await createStudent(student, txn);

      //assign the startup cafe
      return await assignStartUpCafe({
        startupCafeId,
        studentId,
      });
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
