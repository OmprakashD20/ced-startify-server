import db from "@/drizzle";
import { GoldenStarECellAwardTable } from "@/drizzle/schema";
import { GoldenStarECellAwardType, Prettify } from "@/types";
import { generateTeamId } from "@/utils";
import { GoldenStarECellAwardsSchemaType } from "@/validations/golden-star-ecell";

export async function createGoldenStarECellAward(
  data: Omit<GoldenStarECellAwardsSchemaType["body"], "activities">,
  txn = db
): Promise<{ id: string }> {
  const ecellId = generateTeamId("ECELL");

  const [ecellAward] = await txn
    .insert(GoldenStarECellAwardTable)
    .values({
      id: ecellId,
      region: data.region,
      state: data.state,
      district: data.district,
      country: data.country,
      institutionType: data.institutionType,
      participateInDistrictLevel: data.participateInDistrictLevel,
      numberOfAwards: data.numberOfAwards,
      selectedAwards: data.selectedAwards,
      institutionName: data.institutionName,
      institutionDistrict: data.institutionDistrict,
      phoneNumber: data.phoneNumber,
      email: data.email,
      institutionCategory: data.institutionCategory,
      ecellCoordinatorName: data.ecellCoordinator.name,
      ecellCoordinatorEmail: data.ecellCoordinator.email,
      ecellCoordinatorPhone: data.ecellCoordinator.phoneNumber,
      ecellStartYear: data.ecellStartYear,
      entrepreneurshipFacilities: data.entrepreneurshipFacilities,
      institutionalFunding: data.institutionalFunding,
      paymentScreenshot: data.payment.bankScreenshot,
      paymentId: data.payment.paymentId,
    })
    .returning();

  return { id: ecellAward.id };
}

export async function getRegisteredInstitutions(
  txn = db
): Promise<Pick<GoldenStarECellAwardType, "institutionName">[]> {
  return txn.query.GoldenStarECellAwardTable.findMany({
    columns: {
      institutionName: true,
    },
  });
}

export async function getECellEntries(): Promise<{
  entries: GoldenStarECellAwardType[];
}> {
  const entries = await db.query.GoldenStarECellAwardTable.findMany();

  return { entries };
}
