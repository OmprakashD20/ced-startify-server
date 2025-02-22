import db from "@/drizzle";
import { StudentTable } from "@/drizzle/schema";
import { StudentType } from "@/types";
import { eq } from "drizzle-orm";

type StudentParams = {
  id: StudentType["id"];
  data: Omit<StudentType, "id">;
  exists: boolean;
};

export async function createStudent(
  data: Omit<StudentParams["data"], "createdAt">,
  txn = db
): Promise<{ id: number }> {
  const [student] = await txn.insert(StudentTable).values(data).returning();

  return { id: student.id };
}

export async function getStudentByCafeID(startupCafeId: string, email: string, txn = db) {
  return await txn.query.StudentTable.findFirst({
    where: (fields) => eq(fields.startupCafeId, startupCafeId) && eq(fields.email, email)
  })
}

export async function updateStudent(
  data: Omit<StudentParams["data"], "createdAt">,
  id: StudentParams["id"],
  txn = db
) {
  await txn.update(StudentTable).set(data).where(eq(StudentTable.id, id));
}
