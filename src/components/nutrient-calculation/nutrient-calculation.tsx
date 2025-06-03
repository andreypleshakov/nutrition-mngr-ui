import { calculateNutrient } from "../../utils";

type NutrientCalculationProps = {
  name: string;
  valueInput: string;
  valueNutrient: number;
};

export const NutrientCalculation = (props: NutrientCalculationProps) => {
  const calculatedNutrient = calculateNutrient(
    props.valueInput,
    props.valueNutrient
  );

  return (
    <span>
      <strong>{props.name} = </strong>
      <span>{calculatedNutrient}</span>
      {props.name !== "Kcal" && <span> g</span>}
    </span>
  );
};