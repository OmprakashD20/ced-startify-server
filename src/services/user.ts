import { asc, eq } from "drizzle-orm";

import db from "@/drizzle";
import { UserTable, UserToProjectTable } from "@/drizzle/schema";
import { UserToProjectType, UserType } from "@/types";

type UserParams = {
  id: UserType["id"];
  data: Omit<UserType, "id">;
  exists: boolean;
};

export async function createUser(
  data: Omit<UserParams["data"], "createdAt">,
  txn = db
): Promise<{ id: string }> {
  const [user] = await txn.insert(UserTable).values(data).returning();

  return { id: user.id };
}

export async function checkUserExists(
  email: UserParams["data"]["email"],
  txn = db
): Promise<{
  exists: UserParams["exists"];
  id?: UserParams["id"];
}> {
  const [user] = await txn
    .select()
    .from(UserTable)
    .where(eq(UserTable.email, email));

  if (!user) return { exists: false };

  return { exists: true, id: user.id };
}

export async function getUsers(): Promise<UserType[]> {
  const users = await db
    .select()
    .from(UserTable)
    .orderBy(asc(UserTable.createdAt));

  return users;
}

export async function assignProject(data: UserToProjectType, txn = db) {
  return await txn.insert(UserToProjectTable).values(data);
}
