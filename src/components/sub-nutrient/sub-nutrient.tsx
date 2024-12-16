import { NutritionBar } from "../nutrition-bar/nutrition-bar";
import "./sub-nutrient.css";

type SubNutrientProps = {
  name: string;
  barHeight: string;
  nutrientStat: string;
  nutrientGoal: string;
};

export const SubNutrient = (props: SubNutrientProps) => {
  return (
    <div className="nutrition-text-bar">
      <NutritionBar height={props.barHeight} statusBar="sub" />
      <span className="nutrient-name">{props.name}</span>
      <span className="nutrient-amount">
        {props.nutrientStat}g / {props.nutrientGoal}g
      </span>
    </div>
  );
};
