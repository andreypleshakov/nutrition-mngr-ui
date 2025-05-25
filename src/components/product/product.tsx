import { useEffect, useState } from "react";
import { Products } from "../../api/getProducts";
import "./product.css";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { ProductPic } from "../product-pic/product-pic";
import { BasicNutrients, DailyFood } from "../../api/getStatAndGoal";
import { useTgIdContext } from "../../context/tg-context";
import { calculateNutrient, convertKeyToName } from "../../utils";
import { useRefetch } from "../../context/refetch-context";

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

  const tgId = useTgIdContext();

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

  const handleSave = async () => {
    const date = new Date();

    const convertedNutrients = nutrients?.reduce((acc, item) => {
      acc[item.key as keyof BasicNutrients] = parseFloat(item.value);
      return acc;
    }, {} as BasicNutrients);

    if (convertedNutrients) {
      const payload: DailyFood = {
        name: props.name,
        dateOfConsumption: date.toISOString(),
        mass: Number(valueInput),
        ...convertedNutrients,
        tgId: tgId,
      };

      console.log(payload);

      try {
        const response = await fetch(
          `http://localhost:3001/statistic/${tgId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server Error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log(result);
        triggerRefetch();
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error message:", error.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    }
    setStyle("fade-out");
    setTimeout(() => {
      setIsExpanded(false);
      setStyle("");
      setValueInput("0");
    }, 200);
  };

  const triggerRefetch = useRefetch();

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
            {/* need to disable button if nothing in value input*/}
            {valueInput !== "0" && <Button onClick={handleSave}>save</Button>}
          </div>
        </div>
      )}
    </div>
  );
};
