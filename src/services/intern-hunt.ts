import db from "@/drizzle";
import {
  InternHuntStartupTable,
  InternHuntStudentTable,
} from "@/drizzle/schema";
import { InferResultType } from "@/types";
import { generateTeamId } from "@/utils";
import {
  InternHuntStartupSchemaType,
  InternHuntStudentSchemaType,
} from "@/validations/intern-hunt";
import { eq } from "drizzle-orm";

export async function createStartup(
  data: InternHuntStartupSchemaType & { password: string },
  txn = db
): Promise<{ id: string }> {
  const [startup] = await txn
    .insert(InternHuntStartupTable)
    .values({
      id: generateTeamId("IHSU"),
      ...data,
      internshipPositions: parseInt(data.internshipPositions),
      password: "",
    })
    .returning();

  return { id: startup.id };
}

export async function createStudent(
  data: InternHuntStudentSchemaType,
  txn = db
): Promise<{ id: string }> {
  const [student] = await txn
    .insert(InternHuntStudentTable)
    .values({
      id: generateTeamId("IHST"),
      ...data,
    })
    .returning();

  return { id: student.id };
}

export type InternHuntStartupType = InferResultType<"InternHuntStartupTable">;
export type InternHuntStudentType = InferResultType<"InternHuntStudentTable">;

export async function getStartupEntries(): Promise<{
  entries: InternHuntStartupType[];
}> {
  const entries = await db.query.InternHuntStartupTable.findMany();

  return { entries };
}

export async function getStudentEntries(): Promise<{
  entries: InternHuntStudentType[];
}> {
  const entries = await db.query.InternHuntStudentTable.findMany();

  return { entries };
}

export async function comparePassword(
  userEmail: string,
  userPassword: string
): Promise<boolean> {
  const startup = await db.query.InternHuntStartupTable.findFirst({
    where: eq(InternHuntStartupTable.email, userEmail),
  });

  if (!startup) return false;

  return startup.password === userPassword;
}
