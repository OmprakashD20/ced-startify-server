import db from "@/drizzle";
import {
  StartupDistrictTable,
  StartupDistrictMemberTable,
} from "@/drizzle/schema";
import { generateTeamId } from "@/utils";
import {
  StartupDistrictSchemaType,
  StartupDistrictMemberSchemaType,
} from "@/validations/startup-district";

export async function createStartupDistrict(
  data: Omit<StartupDistrictSchemaType["body"], "coFounders">,
  txn = db
): Promise<{ id: string }> {
  const [startup] = await txn
    .insert(StartupDistrictTable)
    .values({
      id: generateTeamId("SD"),
      ...data,
    })
    .returning();

  return { id: startup.id };
}

export async function createStartupDistrictMember(
  data: StartupDistrictMemberSchemaType,
  txn = db
): Promise<void> {
  await txn.insert(StartupDistrictMemberTable).values(data);
}
