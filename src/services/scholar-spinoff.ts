import db from "@/drizzle";
import { ScholarSpinoffTable } from "@/drizzle/schema";
import { ScholarSpinoffSchemaType } from "@/validations/scholar-spinoff";
import { generateTeamId } from "@/utils";
import { InferResultType } from "@/types";

export async function createScholarSpinoff(
  data: ScholarSpinoffSchemaType["body"],
  txn = db
): Promise<{ id: string }> {
  const [scholarSpinoff] = await txn
    .insert(ScholarSpinoffTable)
    .values({
      id: generateTeamId("SS"),
      ...data,
    })
    .returning();

  return { id: scholarSpinoff.id };
}

export type ScholarSpinoffType = InferResultType<"ScholarSpinoffTable">
export async function getEntries(): Promise<{ entries: ScholarSpinoffType[] }> {
  const entries = await db.query.ScholarSpinoffTable.findMany();

  return { entries };
}