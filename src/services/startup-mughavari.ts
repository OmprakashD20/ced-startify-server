import db from "@/drizzle";
import {
  FounderTable,
  CompanyTable,
  CoFounderTable,
  StartupMughavariTable,
} from "@/drizzle/schema";
import {
  FounderType,
  CompanyType,
  CoFounderType,
  StartUpMughavariType,
} from "@/types";

type FounderParams = {
  data: Omit<FounderType, "id">;
};

export async function createFounder(
  { data }: FounderParams,
  txn = db
): Promise<{ id: number }> {
  const [founder] = await txn.insert(FounderTable).values(data).returning();

  return { id: founder.id };
}

type CompanyParams = {
  data: Omit<CompanyType, "id" | "founderId">;
  founderId: number;
};

export async function createCompany(
  { data, founderId }: CompanyParams,
  txn = db
): Promise<{ id: number }> {
  const [company] = await txn
    .insert(CompanyTable)
    .values({ ...data, founderId })
    .returning();

  return { id: company.id };
}

type CoFounderParams = {
  data: Omit<CoFounderType, "id" | "companyId">;
  companyId: number;
};

export async function createCoFounder(
  { data, companyId }: CoFounderParams,
  txn = db
): Promise<{ id: number }> {
  const [coFounder] = await txn
    .insert(CoFounderTable)
    .values({ ...data, companyId })
    .returning();

  return { id: coFounder.id };
}

type StartUpMughavariParams = {
  data: Omit<
    StartUpMughavariType,
    "id" | "companyId" | "createdAt" | "updatedAt"
  >;
  companyId: number;
};

export async function createStartUpMughavari(
  { data, companyId }: StartUpMughavariParams,
  txn = db
): Promise<{ id: number }> {
  const [startup] = await txn
    .insert(StartupMughavariTable)
    .values({ ...data, companyId })
    .returning();

  return { id: startup.id };
}
