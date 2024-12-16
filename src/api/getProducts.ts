import { BasicNutrients } from "./getStatAndGoal";

export type Products = BasicNutrients & {
  name: string;
}

export const getProducts = async (tgId: number): Promise<Products[]> => {
  const response = await fetch(`http://localhost:3001/products/${tgId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const resultDataProducts = await response.json();

  const resultProducts: Products[] = resultDataProducts.map(
    (element: Products) => ({
      name: element.name,
      kcal: element.kcal,
      protein: element.protein,
      totalFat: element.totalFat,
      saturatedFat: element.saturatedFat,
      unsaturatedFat: element.unsaturatedFat,
      carbs: element.carbs,
      fiber: element.fiber,
    })
  );

  return resultProducts;
};