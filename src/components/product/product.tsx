import { useState } from "react";
import { Products } from "../../api/getProducts";
import "./product.css";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { BasicNutrients } from "../../api/getStatAndGoal";
import { useTgIdContext } from "../../context/tg-context";
import { motion, AnimatePresence } from "motion/react";
import { NutrientCalculation } from "../nutrient-calculation/nutrient-calculation";
import { calculateNutrient } from "../../utils";

export const Product = (props: Products) => {
  const [valueInput, setValueInput] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);

  const tgId = useTgIdContext();

  const nutrients = [
    { id: 1, key: "Kcal", value: props.kcal },
    { id: 2, key: "Protein", value: props.protein },
    { id: 3, key: "Total Fat", value: props.totalFat },
    { id: 4, key: "Saturated Fat", value: props.saturatedFat },
    { id: 5, key: "Unsasturated Fat", value: props.unsaturatedFat },
    { id: 6, key: "Carbs", value: props.carbs },
    { id: 7, key: "Fiber", value: props.fiber },
  ];

  const handleSave = async () => {
    const date = new Date();

    const convertedNutrients = nutrients.reduce((acc, item) => {
      acc[item.key as keyof BasicNutrients] = item.value;
      return acc;
    }, {} as BasicNutrients);

    console.log("CONV", convertedNutrients);

    const payload = {
      name: props.name,
      dateOfConsumption: date.toISOString(),
      mass: Number(valueInput),
      kcal: calculateNutrient(valueInput, props.kcal),
      protein: calculateNutrient(valueInput, props.protein),
      totalFat: calculateNutrient(valueInput, props.totalFat),
      saturatedFat: calculateNutrient(valueInput, props.saturatedFat),
      unsaturatedFat: calculateNutrient(valueInput, props.unsaturatedFat),
      carbs: calculateNutrient(valueInput, props.carbs),
      fiber: calculateNutrient(valueInput, props.fiber),
      tgId: tgId,
    };

    console.log("PAYL", payload);

    try {
      const response = await fetch(`http://localhost:3001/statistic/${tgId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }

    if (isAnimate) return;
    setIsVisible(!isVisible);
    setValueInput("");
  };

  const closeNutritionWindow = () => {
    if (isAnimate) return;
    setIsVisible(!isVisible);
    setValueInput("");
  };

  return (
    <div className="product-wrapper">
      <div className="product" onClick={closeNutritionWindow}>
        <div className="pic-name">
          <span className="name">{props.name}</span>
        </div>

        <span className="mass-kcal2">
          <span>100 g</span>
          <span>{(props.kcal * 100).toFixed()} kcal</span>
        </span>
      </div>

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="nutrition-input"
            initial={{ height: 0, marginTop: 0 }}
            animate={{ height: "auto", marginTop: 10 }}
            exit={{ height: 0, marginTop: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            onAnimationStart={() => setIsAnimate(true)}
            onAnimationComplete={() => setIsAnimate(false)}
          >
            <Input
              placeholder="Enter value"
              onChange={(e) => setValueInput(e.target.value)}
              type="number"
            />

            <div className="nutrition-calc-button">
              <span className="nutrition-calculation">
                {nutrients.map((nutrient) => {
                  return (
                    <NutrientCalculation
                      key={nutrient.id}
                      name={nutrient.key}
                      valueNutrient={nutrient.value}
                      valueInput={valueInput}
                    />
                  );
                })}
              </span>

              <Button
                onClick={handleSave}
                disabled={!valueInput || valueInput === "0"}
              >
                save
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
