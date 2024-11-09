import { Request, Response } from "express";

import db from "@/drizzle";
import { approveProject, createProject, getProjects } from "@/services/project";
import { assignProject, checkUserExists, createUser } from "@/services/user";
import {
  ApproveProjectSchemaType,
  ProjectSchemaType,
} from "@/validations/project";
import { ProjectType, UserType } from "@/types";

export async function createProjectController(
  req: Request<{}, {}, ProjectSchemaType["body"], {}>,
  _res: Response
): Promise<{ statusCode: number }> {
  const { users, ...data } = req.body;

  await db.transaction(async (txn) => {
    const { id: projectId } = await createProject(data, txn);

    users.forEach(async (user) => {
      //check if user exists
      const { exists, id } = await checkUserExists(user.email, txn);

      if (exists)
        //assign the project
        return await assignProject({
          projectId,
          userId: id!,
        });

      //create a user
      const { id: userId } = await createUser(user, txn);

      //assign the project
      return await assignProject({
        projectId,
        userId,
      });
    });
  });

  return { statusCode: 201 };
}

export async function getProjectsController(
  _req: Request,
  _res: Response
): Promise<{
  projects: Record<number, { project: ProjectType; users: UserType[] }>;
  statusCode: number;
}> {
  const rows = await getProjects();

  const projects = rows.reduce<
    Record<number, { project: ProjectType; users: UserType[] }>
  >((acc, row) => {
    const project = row.project;
    const user = row.user;

    if (!acc[project.id]) acc[project.id] = { project, users: [] };
    if (user) acc[project.id].users.push(user);

    return acc;
  }, {});

  return { projects, statusCode: 200 };
}

export async function approveProjectController(
  req: Request<
    {},
    {},
    ApproveProjectSchemaType["body"],
    ApproveProjectSchemaType["query"]
  >,
  _res: Response
): Promise<{ statusCode: number }> {
  const { approved } = req.body;
  const { id } = req.query;

  await approveProject(Number(id), approved);

  return { statusCode: 200 };
}
