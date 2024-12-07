import db from "@/drizzle";
import { FounderFindSchemaType } from "@/validations/founder-find";
import { FounderFindTable } from "@/drizzle/schema";
import { generateTeamId } from "@/utils";

export async function createFounderFind(
  data: FounderFindSchemaType["body"],
  txn = db
): Promise<{ id: string }> {
  const [founderFind] = await txn
    .insert(FounderFindTable)
    .values({
      ...data,
      id: generateTeamId("FF"), 
    })
    .returning();

  return { id: founderFind.id };
}
