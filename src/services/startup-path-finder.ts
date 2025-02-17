import db from "@/drizzle";
import { StartupPathFinderTable } from "@/drizzle/schema";
import { StartupPathFinderSchemaType } from "@/validations/startup-path-finder";
import { generateTeamId } from "@/utils";
import { InferResultType } from "@/types";

export async function createStartupPathFinder(
  data: StartupPathFinderSchemaType["body"],
  txn = db
): Promise<{ id: string }> {
  const [startupPathFinder] = await txn
    .insert(StartupPathFinderTable)
    .values({
      id: generateTeamId("SPF"),
      ...data,
    })
    .returning();

  return { id: startupPathFinder.id };
}

export type PathFinderType = InferResultType<"StartupPathFinderTable">
export async function getEntries(): Promise<{ entries: PathFinderType[] }> {
  const entries = await db.query.StartupPathFinderTable.findMany();

  return { entries };
}