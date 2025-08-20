import { NextFunction, Request, Response } from "express";
import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from "drizzle-orm";

import * as schema from "@/drizzle/schema";

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

type QueryConfig<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>;

export type InferResultType<
  TableName extends keyof TSchema,
  QBConfig extends QueryConfig<TableName> = {}
> = BuildQueryResult<TSchema, TSchema[TableName], QBConfig>;

export function enumToPgEnum<T extends Record<string, any>>(
  myEnum: T
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: any) => `${value}`) as any;
}

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export interface AppConfig {
  env: {
    PORT: number;
    NODE_ENV: string;
    DATABASE_URL: string;
    RAZORPAY_KEY_ID: string;
    RAZORPAY_KEY_SECRET: string;
    RESEND_API_KEY: string;
  };
}

export interface ValidatorFactoryReturn<T> {
  validator: (req: Request, res: Response, next: NextFunction) => void;
}

export interface AsyncHandlerReturn<T> {
  statusCode: number;
  data?: T;
}

export type StudentType = InferResultType<"StudentTable">;
export type StartUpCafeType = InferResultType<"StartUpCafeTable">;
export type FounderType = InferResultType<"FounderTable">;
export type CompanyType = InferResultType<"CompanyTable">;
export type CoFounderType = InferResultType<"CoFounderTable">;
export type StartUpMughavariType = InferResultType<"StartupMughavariTable">;
export type GoldenStarECellAwardType =
  InferResultType<"GoldenStarECellAwardTable">;
export type IpToIpoMembersType = InferResultType<"ipToIpoMembers">;
export type IpToIpoType = InferResultType<"ipToIpo">;