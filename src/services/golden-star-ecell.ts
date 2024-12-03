import db from "@/drizzle";
import {
  GoldenStarECellAwardTable,
  GoldenStarECellActivityTable,
} from "@/drizzle/schema";
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

export async function createGoldenStarECellActivities(
  activities: GoldenStarECellAwardsSchemaType["body"]["activities"],
  ecellId: string,
  txn = db
): Promise<void> {
  const activitiesData = [
    ...activities.awarenessPrograms.map((activity) => ({
      name: activity.name,
      type: "Awareness Program",
      beneficiaryCount: activity.beneficiaryCount,
      outcomes: activity.outcomes,
      proofUrl: activity.proofUrl,
      ecellId,
    })),
    ...activities.workshops.map((activity) => ({
      name: activity.name,
      type: "Workshop",
      beneficiaryCount: activity.beneficiaryCount,
      outcomes: activity.outcomes,
      proofUrl: activity.proofUrl,
      ecellId,
    })),
    ...activities.otherEvents.map((activity) => ({
      name: activity.name,
      type: "Other Event",
      beneficiaryCount: activity.beneficiaryCount,
      outcomes: activity.outcomes,
      proofUrl: activity.proofUrl,
      ecellId,
    })),
  ];

  await txn.insert(GoldenStarECellActivityTable).values(activitiesData);
}
