import db from "@/drizzle";
import { GurusPitchTable, GurusPitchMemberTable } from "@/drizzle/schema";
import { generateTeamId } from "@/utils";
import {
  GurusPitchSchemaType,
  GurusPitchMemberSchemaType,
} from "@/validations/gurus-pitch";

export async function createGurusPitch(
  data: Omit<GurusPitchSchemaType["body"], "coFounders">,
  txn = db
): Promise<{ id: string }> {
  const [pitch] = await txn
    .insert(GurusPitchTable)
    .values({
      id: generateTeamId("GP"),
      ...data,
      isStartupRegistered: data.isStartupRegistered === "yes",
    })
    .returning();

  return { id: pitch.id };
}

export async function createGurusPitchMember(
  data: GurusPitchMemberSchemaType,
  txn = db
): Promise<void> {
  await txn.insert(GurusPitchMemberTable).values(data);
}
