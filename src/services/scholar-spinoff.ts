import db from "@/drizzle";
import { ScholarSpinoffTable } from "@/drizzle/schema";
import { ScholarSpinoffSchemaType } from "@/validations/scholar-spinoff";
import { generateTeamId } from "@/utils";

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
