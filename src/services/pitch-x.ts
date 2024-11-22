import db from "@/drizzle";
import { PitchXTable, PitchXMemberTable } from "@/drizzle/schema";
import {
  PitchXMemberSchemaType,
  PitchXSchemaType,
} from "@/validations/pitch-x";
import { generateTeamId } from "@/utils";

export async function createPitchX(
  data: Omit<PitchXSchemaType["body"], "teamMembers">,
  txn = db
): Promise<{ id: string }> {
  const [pitchX] = await txn
    .insert(PitchXTable)
    .values({
      id: generateTeamId("PX"),
      ...data,
    })
    .returning();

  return { id: pitchX.id };
}

export async function createPitchXMember(
  data: PitchXMemberSchemaType & { pitchXId: string },
  txn = db
): Promise<{ id: number }> {
  const [member] = await txn.insert(PitchXMemberTable).values(data).returning();

  return { id: member.id };
}
