import db from "@/drizzle";
import { StartupPathFinderTable } from "@/drizzle/schema";
import { StartupPathFinderSchemaType } from "@/validations/startup-path-finder";
import { generateTeamId } from "@/utils";

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
