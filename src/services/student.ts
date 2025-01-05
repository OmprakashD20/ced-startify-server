import db from "@/drizzle";
import { StudentTable } from "@/drizzle/schema";
import { StudentType } from "@/types";

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
