import db from "@/drizzle";
import { eq } from "drizzle-orm";

import { GurusPitchTable, GurusPitchMemberTable } from "@/drizzle/schema";
import { InferResultType } from "@/types";
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

export type GetGuruPitchType = InferResultType<
  "GurusPitchTable",
  {
    with: { members: true };
  }
>[];
export async function getGurusPitch(): Promise<{
  gurusPitch: GetGuruPitchType;
}> {
  const gurusPitch = await db.query.GurusPitchTable.findMany({
    with: {
      members: true,
    },
  });

  return { gurusPitch };
}
