import { convertDateToTime } from "../utils";

export type BasicNutrients = {
  kcal: number;
  protein: number;
  totalFat: number;
  saturatedFat: number;
  unsaturatedFat: number;
  carbs: number;
  fiber: number;
};

type FetchedStat = {
  totals: DailyFood;
  arrayOfProducts: DailyFood[];
};

type StatAndGoalResponse = {
  statistic: FetchedStat;
  goal: BasicNutrients;
  barPercentage: BasicNutrients;
};

export type DailyFood = BasicNutrients & {
  id?: string;
  name: string;
  dateOfConsumption: string;
  mass: number;
  tgId: number;
};

export const getStatAndGoal = async (
  tgId: number
): Promise<StatAndGoalResponse> => {
  const startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);

  const queryParams = new URLSearchParams({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  const [responseStat, responseGoal] = await Promise.all([
    fetch(`http://localhost:3001/statistic/${tgId}?${queryParams}`),
    fetch(`http://localhost:3001/goal/${tgId}`),
  ]);

  if (!responseStat.ok || !responseGoal.ok) {
    throw new Error(
      `HTTP error! Statistic: ${responseStat.status}, Goal: ${responseGoal.status}`
    );
  }

  const resultStat: FetchedStat = await responseStat.json();

  const rawDataGoal = await responseGoal.json();

  const resultGoal: BasicNutrients = {
    kcal: rawDataGoal.kcal,
    protein: rawDataGoal.protein,
    totalFat: rawDataGoal.totalFat,
    saturatedFat: rawDataGoal.saturatedFat,
    unsaturatedFat: rawDataGoal.unsaturatedFat,
    carbs: rawDataGoal.carbs,
    fiber: rawDataGoal.fiber,
  };

  const arrayOfProducts = resultStat.arrayOfProducts.map((product) => ({
    ...product,
    dateOfConsumption: convertDateToTime(product.dateOfConsumption),
  }));

  const barPercentage = Object.keys(resultGoal).reduce((acc, key) => {
    const nutrientKey = key as keyof BasicNutrients;
    acc[nutrientKey] = getBarPercentage(resultGoal, resultStat, nutrientKey);
    return acc;
  }, {} as BasicNutrients);

  const result: StatAndGoalResponse = {
    statistic: { ...resultStat, arrayOfProducts },
    goal: resultGoal,
    barPercentage: barPercentage,
  };

  return result;
};

function getBarPercentage(
  resultGoal: BasicNutrients,
  resultStat: FetchedStat,
  key: keyof BasicNutrients
): number {
  const result =
    resultGoal[key] === 0
      ? 0
      : (resultStat.totals[key] / resultGoal[key]) * 100;

  return result;
}
