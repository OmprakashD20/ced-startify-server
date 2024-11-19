import { asc, eq } from "drizzle-orm";

import db from "@/drizzle";
import { StudentTable, StudentToStartUpCafeTable } from "@/drizzle/schema";
import { StudentToStartUpCafeType, StudentType } from "@/types";

type StudentParams = {
  id: StudentType["id"];
  data: Omit<StudentType, "id">;
  exists: boolean;
};

export async function createStudent(
  data: Omit<StudentParams["data"], "createdAt">,
  txn = db
): Promise<{ id: string }> {
  const [student] = await txn.insert(StudentTable).values(data).returning();

  return { id: student.id };
}

export async function checkStudentExists(
  email: StudentParams["data"]["email"],
  txn = db
): Promise<{
  exists: StudentParams["exists"];
  id?: StudentParams["id"];
}> {
  const [student] = await txn
    .select()
    .from(StudentTable)
    .where(eq(StudentTable.email, email));

  if (!student) return { exists: false };

  return { exists: true, id: student.id };
}

export async function getStudents(): Promise<StudentType[]> {
  const students = await db
    .select()
    .from(StudentTable)
    .orderBy(asc(StudentTable.createdAt));

  return students;
}

export async function assignStartUpCafe(data: StudentToStartUpCafeType, txn = db) {
  return await txn.insert(StudentToStartUpCafeTable).values(data);
}
