import db from "@/drizzle";
import { StartUpCafeTable } from "@/drizzle/schema";
import { StartUpCafeType } from "@/types";
import { generateTeamId } from "@/utils";

type StartUpCafeParams = {
  id: StartUpCafeType["id"];
  data: Omit<StartUpCafeType, "id" | "createdAt" | "updatedAt">;
};

export async function createStartUpCafe(
  data: Omit<StartUpCafeParams["data"], "approved" | "skipSubmission">,
  txn = db
): Promise<{ id: string }> {
  const [startup_cafe] = await txn
    .insert(StartUpCafeTable)
    .values({
      ...data,
      id: generateTeamId("SC"),
    })
    .returning();

  return { id: startup_cafe.id };
}

export async function getColleges(): Promise<{ colleges: string[] }> {
  const colleges = await db
    .selectDistinct({
      college: StartUpCafeTable.collegeName,
    })
    .from(StartUpCafeTable)
    .orderBy(StartUpCafeTable.collegeName);

  return { colleges: colleges.map((college) => college.college) };
}
