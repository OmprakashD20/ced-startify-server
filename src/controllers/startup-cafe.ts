import { Request, Response } from "express";

import db from "@/drizzle";
import {
  approveStartupCafe,
  createStartUpCafe,
  getColleges,
  getStartupCafe,
  getStartups,
  GetStartupsType,
  updateStartupCafe,
} from "@/services/startup-cafe";
import {
  createStudent,
  getStudentByCafeID,
  updateStudent,
} from "@/services/student";
import {
  StartUpCafeSchemaType,
  UpdateStartupCafeSchemaType,
} from "@/validations/startup-cafe";
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
      content: `Dear ${students[0].name},
            <br><br>
            Thank you for submitting your application for AU Startify 3.0 - "Startup Cafe Prototyping Hackathon". We are currently reviewing your details.
            <br><br>
            <strong>Team ID:</strong> ${startupCafeId}
            <br>
            <strong>Status:</strong> <span class="status">Pending</span>
            <br>
            We will notify you once your application status changes. If you have any questions in the meantime, feel free to reach out to our support team.`,
      header: "Startup Cafe Prototyping Hackathon",
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

export async function updateStartupCafeController(
  req: Request<
    UpdateStartupCafeSchemaType["params"],
    {},
    UpdateStartupCafeSchemaType["body"]
  >,
  _res: Response
): Promise<{ statusCode: number }> {
  const { teamMembers: students, ...data } = req.body;

  await db.transaction(async (txn) => {
    await updateStartupCafe(
      {
        ...data,
        sameInstitution: data.sameInstitution === "yes",
      },
      data.id,
      txn
    );

    students.forEach(async ({ id, ...student }) => {
      console.log(id, student);
      const existingStudent = await getStudentByCafeID(
        student.startupCafeId,
        student.email
      );
      if (existingStudent) {
        await updateStudent(student, id, txn);
      } else {
        createStudent(student, txn);
      }
    });
  });

  return { statusCode: 200 };
}

export async function approveStartupCafeController(
  req: Request<UpdateStartupCafeSchemaType["params"]>,
  _res: Response
): Promise<{ statusCode: number }> {
  const id = req.params.id;
  await approveStartupCafe({ approved: true }, id);

  const startup = await getStartupCafe(id);

  await sendEmail({
    to: startup?.students[0].email!,
    subject: "Application Approved",
    content: `Dear ${startup?.students[0].name},
            <br><br>Your application for AU Startify 3.0 - "Startup Cafe Prototyping Hackathon" has been approved. <br><br> <strong>Team ID:</strong> ${id} <br> <strong>Status:</strong> <span class="status">Approved✅</span> <br> If you have any questions in the meantime, feel free to reach out to our support team.`,
    header: "Startup Cafe Prototyping Hackathon",
  });

  return { statusCode: 200 };
}
