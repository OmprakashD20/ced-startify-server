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
  InferResultType,
} from "@/types";
import { generateTeamId } from "@/utils";

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
): Promise<{ id: string }> {
  const [startup] = await txn
    .insert(StartupMughavariTable)
    .values({ ...data, companyId, id: generateTeamId("SM") })
    .returning();

  return { id: startup.id };
}

export type StartupMughavariCofounder = InferResultType<"CoFounderTable">;
export type StartupMughavariType = InferResultType<
  "StartupMughavariTable",
  {
    with: {
      company: {
        with: {
          founder: true;
          coFounders: true;
        };
      };
    };
  }
>;

export async function getEntries(): Promise<{ entries: StartupMughavariType[] }> {
  const entries = await db.query.StartupMughavariTable.findMany({
    with: {
      company: {
        with: {
          founder: true,
          coFounders: true,
        },
      },
    },
  });

  return { entries };
}
