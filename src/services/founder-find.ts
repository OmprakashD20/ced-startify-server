import db from "@/drizzle";
import { FounderFindSchemaType } from "@/validations/founder-find";
import { FounderFindTable } from "@/drizzle/schema";
import { generateTeamId } from "@/utils";
import { InferResultType } from "@/types";

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

export type GetFoundersType = InferResultType<"FounderFindTable">[];
export async function getFounders(): Promise<{ founders: GetFoundersType }> {
  const founders = await db.query.FounderFindTable.findMany();

  return { founders };
}
