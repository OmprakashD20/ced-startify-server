import db from "@/drizzle";
import {
  InternHuntStartupTable,
  InternHuntStudentTable,
} from "@/drizzle/schema";
import { generateTeamId } from "@/utils";
import {
  InternHuntStartupSchemaType,
  InternHuntStudentSchemaType,
} from "@/validations/intern-hunt";

export async function createStartup(
  data: InternHuntStartupSchemaType,
  txn = db
): Promise<{ id: string }> {
  const [startup] = await txn
    .insert(InternHuntStartupTable)
    .values({
      id: generateTeamId("IHSU"),
      ...data,
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
