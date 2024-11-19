import db from "@/drizzle";
import { StartUpCafeTable } from "@/drizzle/schema";
import { StartUpCafeType } from "@/types";

type StartUpCafeParams = {
  id: StartUpCafeType["id"];
  data: Omit<StartUpCafeType, "id" | "createdAt" | "updatedAt">;
};

export async function createStartUpCafe(
  data: Omit<StartUpCafeParams["data"], "approved">,
  txn = db
): Promise<{ id: number }> {
  const [startup_cafe] = await txn
    .insert(StartUpCafeTable)
    .values(data)
    .returning();

  return { id: startup_cafe.id };
}
