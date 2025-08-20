import db from "@/drizzle";
import { ipToIpo, ipToIpoMembers } from "@/drizzle/schema";
import { IpToIpoMembersType, IpToIpoType } from "@/types";
import { generateTeamId } from "@/utils";

type StudentParams = {
  id: IpToIpoMembersType["id"];
  data: Omit<IpToIpoMembersType, "id">;
};

export async function createMember(
  data: Omit<StudentParams["data"], "createdAt">,
  txn = db
): Promise<{ id: number }> {
  const [member] = await txn.insert(ipToIpoMembers).values(data).returning();

  return { id: member.id };
}

type IpToIpoParams = {
  id: IpToIpoType["id"];
  data: Omit<IpToIpoType, "id" | "createdAt" | "updatedAt">;
};

export async function createIPtoIPO(
  data: Omit<IpToIpoParams["data"], "id">,
  txn = db
): Promise<{ id: string }> {
  const [result] = await txn
    .insert(ipToIpo)
    .values({
      ...data,
      id: generateTeamId("IPO"),
    })
    .returning();

  return { id: result.id };
}