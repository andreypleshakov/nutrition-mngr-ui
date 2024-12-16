import "./nutrition-bar.css";

type NutritionBarProps = {
  height: string;
  statusBar: "main" | "sub";
}

export const NutritionBar = (props: NutritionBarProps) => {
  return (
    <div
      className={`${
        props.statusBar === "main"
          ? "green-nutrition-bar"
          : "black-nutrition-bar"
      }`}
    >
      <div
        className={`${
          props.statusBar === "main"
            ? "green-inner-nutrition-bar"
            : "black-inner-nutrition-bar"
        }`}
        style={{ height: `${props.height}%` }}
      />
    </div>
  );
};