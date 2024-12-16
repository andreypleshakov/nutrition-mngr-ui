import { Products } from "../../api/getProducts";
import { BasicNutrients } from "../../api/getStatAndGoal";
import { AddConsumption } from "../add-consumption/add-consumption";
import { Button } from "../button/button";
import { NutritionBar } from "../nutrition-bar/nutrition-bar";
import { convertKeyToName } from "../product/product";
import { SubNutrient } from "../sub-nutrient/sub-nutrient";
import "./total-statistic.css";
import { createPortal } from "react-dom";

type TotalStatisticProps = {
  dailyStat: BasicNutrients;
  goal: BasicNutrients;
  barPercentage: BasicNutrients;
  productsList: Products[];

  onClick: () => void;
  modalStatus: boolean;
};

export const TotalStatistic = (props: TotalStatisticProps) => {
  return (
    <div className="main-window">
      {props.modalStatus &&
        createPortal(<AddConsumption productsList={props.productsList} onClick={props.onClick} />, document.body)}

      <div className="general-statistic">
        <span className="g-statistic-text">
          <span>Consumed</span>
          <span className="kcal-numbers">{props.dailyStat.kcal.toFixed()}</span>
          <span>KCAL</span>
        </span>

        <NutritionBar
          height={props.barPercentage.kcal.toFixed()}
          statusBar="main"
        />

        <span className="g-statistic-text">
          <span>Daily goal</span>
          <span className="kcal-numbers">{props.goal.kcal}</span>
          <span>KCAL</span>
        </span>
      </div>

      <div className="line" />

      <div className="nutrition-bars">
        {Object.entries(props.goal)
          .filter(
            ([key, value]) =>
              key !== "kcal" &&
              key !== "saturatedFat" &&
              key !== "unsaturatedFat" &&
              value > 0
          )
          .map(([key, value]) => (
            <SubNutrient
              key={key}
              name={convertKeyToName(key)}
              nutrientGoal={value.toFixed()}
              nutrientStat={props.dailyStat[
                key as keyof BasicNutrients
              ].toFixed()}
              barHeight={props.barPercentage[
                key as keyof BasicNutrients
              ].toFixed()}
            />
          ))}
      </div>

      <Button onClick={props.onClick}>+ New Entry</Button>
    </div>
  );
};
