import db from "@/drizzle";
import { StartupAtlasTable } from "@/drizzle/schema";
import { InferResultType } from "@/types";
import { generateTeamId } from "@/utils";
import { StartupAtlasSchemaType } from "@/validations/startup-atlas";

export async function createStartup(
  data: StartupAtlasSchemaType["body"],
  txn = db
): Promise<{ id: string }> {
  const [startup] = await txn
    .insert(StartupAtlasTable)
    .values({
      id: generateTeamId("SA"),
      isIndianStudent: data.isIndianStudent,
      nationality: data.nationality,
      institutionName: data.institution.name,
      institutionPocName: data.institution.pocName,
      institutionPocPhone: data.institution.pocPhone,
      institutionPocEmail: data.institution.pocEmail,
      studentName: data.student.name,
      studentPhone: data.student.phone,
      studentEmail: data.student.email,
      studentDegree: data.student.degree,
      studentDepartment: data.student.department,
      yearOfStudy: data.student.yearOfStudy,
      institutionBonafide: data.institutionBonafide,
      paymentId: data.paymentId,
    })
    .returning();

  return { id: startup.id };
}

export type StartupAtlasType = InferResultType<"StartupAtlasTable">;

export async function getEntries(): Promise<{ entries: StartupAtlasType[] }> {
  const entries = await db.query.StartupAtlasTable.findMany();

  return { entries };
}
