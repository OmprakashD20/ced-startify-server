import db from "@/drizzle";
import { StartUpCafeTable } from "@/drizzle/schema";
import { InferResultType, StartUpCafeType } from "@/types";
import { generateTeamId } from "@/utils";
import { eq } from "drizzle-orm";

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

export type GetStartupsType = InferResultType<
  "StartUpCafeTable",
  { with: { students: true } }
>[];
export async function getStartups(): Promise<{
  startups: GetStartupsType;
}> {
  const startups = await db.query.StartUpCafeTable.findMany({
    with: {
      students: true,
    },
  });

  return { startups };
}

export async function getStartupCafe(id: string, txn = db) {
  return await txn.query.StartUpCafeTable.findFirst({
    where: eq(StartUpCafeTable.id, id),
    with: { students: true },
  });
}

export async function updateStartupCafe(
  data: StartUpCafeParams["data"],
  id: StartUpCafeParams["id"],
  txn = db
) {
  await txn
    .update(StartUpCafeTable)
    .set(data)
    .where(eq(StartUpCafeTable.id, id));
}

export async function approveStartupCafe(
  data: Pick<StartUpCafeParams["data"], "approved">,
  id: StartUpCafeParams["id"],
  txn = db
) {
  await txn
    .update(StartUpCafeTable)
    .set(data)
    .where(eq(StartUpCafeTable.id, id));
}

export async function addDocument(
  id: StartUpCafeParams["id"],
  document: string,
  txn = db
) {
  await txn
    .update(StartUpCafeTable)
    .set({ document })
    .where(eq(StartUpCafeTable.id, id));
}
