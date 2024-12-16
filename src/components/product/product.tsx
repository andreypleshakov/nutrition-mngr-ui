import { useEffect, useState } from "react";
import { Products } from "../../api/getProducts";
import "./product.css";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { ProductPic } from "../product-pic/product-pic";

export const Product = (props: Products) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [style, setStyle] = useState("");
  const [valueInput, setValueInput] = useState("0");

  const [nutrients, setNutrients] = useState<
    {
      key: string;
      value: string;
      unit: string;
    }[]
  >();

  const handleClick = () => {
    if (isExpanded) {
      setStyle("fade-out");
      setTimeout(() => {
        setIsExpanded(false);
        setStyle("");
      }, 200);
    } else {
      setIsExpanded(true);
      setTimeout(() => {
        setStyle("fade-in");
      }, 0);
    }
  };

  useEffect(() => {
    const values = Object.entries(props)
      .filter(([key]) => key !== "name")
      .map(([key, value]) => {
        const nutrientAmount = calculateNutrient(valueInput, value as number);
        return {
          key: key,
          value: nutrientAmount,
          unit: key === "kcal" ? "" : "g",
        };
      });

    setNutrients(values);
  }, [valueInput, props]);

  const handleSave = () => {
    nutrients?.forEach((nutrient) => console.log(parseFloat(nutrient.value)));
    setStyle("fade-out");
    setTimeout(() => {
      setIsExpanded(false);
      setStyle("");
    }, 200);
  };

  return (
    <div className={`product-wrapper ${isExpanded ? "expanded" : ""}`}>
      <div className="product" onClick={handleClick}>
        <div className="pic-name">
          <ProductPic />
          <span className="name">{props.name}</span>
        </div>

        <span className="mass-kcal2">
          <span>100 g</span>
          <span>{(props.kcal * 100).toFixed()} kcal</span>
        </span>
      </div>

      {isExpanded && (
        <div className={`nutrition-input ${style}`}>
          <Input
            placeholder="Enter value"
            onChange={(e) => setValueInput(e.target.value)}
            type="number"
          />

          <div className="nutrition-calc-button">
            <span className="nutrition-calculation">
              {nutrients?.map((nutrient) => (
                <span>
                  <strong>{`${convertKeyToName(nutrient.key)} = `}</strong>
                  {`${nutrient.value} ${nutrient.unit}`}
                </span>
              ))}
            </span>
            <Button onClick={handleSave}>save</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export function convertKeyToName(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

function calculateNutrient(valueInput: string, valueNutrient: number): string {
  let covertedNumber = "";
  const inputNumber = Number(valueInput);
  const valueCalculated = inputNumber * valueNutrient;
  inputNumber === 0 || valueCalculated < 0.01
    ? (covertedNumber = valueCalculated.toFixed())
    : (covertedNumber = valueCalculated.toFixed(2));
  return covertedNumber;
}
