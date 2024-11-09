import { eq } from "drizzle-orm";

import db from "@/drizzle";
import { ProjectTable, UserTable, UserToProjectTable } from "@/drizzle/schema";
import { ProjectType, UserToProjectType, UserType } from "@/types";

type ProjectParams = {
  id: ProjectType["id"];
  data: Pick<ProjectType, "name" | "description" | "pptLink" | "approved">;
};

export async function createProject(
  data: Omit<ProjectParams["data"], "approved">,
  txn = db
): Promise<{ id: number }> {
  const [project] = await txn.insert(ProjectTable).values(data).returning();

  return { id: project.id };
}

export async function getProjects(): Promise<
  {
    project: ProjectType;
    user: UserType;
    user_to_project: UserToProjectType;
  }[]
> {
  const result = await db
    .select({
      user: UserTable,
      project: ProjectTable,
      user_to_project: UserToProjectTable,
    })
    .from(UserToProjectTable)
    .innerJoin(UserTable, eq(UserToProjectTable.userId, UserTable.id))
    .innerJoin(ProjectTable, eq(UserToProjectTable.projectId, ProjectTable.id));

  return result;
}

export async function approveProject(
  id: ProjectParams["id"],
  data: ProjectParams["data"]["approved"]
) {
  return await db
    .update(ProjectTable)
    .set({
      approved: data,
    })
    .where(eq(ProjectTable.id, id));
}
