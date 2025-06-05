import { useState } from "react";
import "./consumed-product.css";
import arrowDown from "../../assets/icons/arrow-down.svg";
import productOptions from "../../assets/icons/product-options-icon.svg";
import { DailyFood } from "../../api/getStatAndGoal";
import { motion, AnimatePresence } from "motion/react";

type ConsumedProductProps = DailyFood & {
  deletionStatus: () => void;
};

export const ConsumedProduct = (props: ConsumedProductProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);

  const closeNutritionWindow = () => {
    if (isAnimate) return;
    setIsVisible(!isVisible);
  };

  return (
    <div className="consumed-product" onClick={closeNutritionWindow}>
      <div className="name-mass">
        <div className="name-time-icon">
          <img
            className={`icon ${
              isVisible ? "arrow-expanded" : "arrow-collapsed"
            }`}
            src={arrowDown}
            alt="arrow-down"
          />
          <span className="name-time">
            <span className="product-name">{props.name}</span>
            <span className="time-consumed">{props.dateOfConsumption}</span>
          </span>
        </div>

        <div className="mass-kcal-icon">
          <span className="mass-kcal">
            <span>{props.mass} g</span>
            <span>{props.kcal} Kcal</span>
          </span>
          <img
            className="icon"
            src={productOptions}
            alt="product-options"
            onClick={props.deletionStatus}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            layout
            className="consumed-product-stat"
            key="consumed-product-stat"
            initial={{ height: 0, marginTop: 0, marginBottom: 0 }}
            animate={{
              height: "auto",
              marginTop: 10,
              marginBottom: 10,
            }}
            exit={{ height: 0, marginTop: 0, marginBottom: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            onAnimationStart={() => setIsAnimate(true)}
            onAnimationComplete={() => setIsAnimate(false)}
          >
            <span className="nutritions">
              <span>{props.protein} g / Protein</span>
              <span>{props.carbs} g / Carbs</span>
              <span>{props.totalFat} g / Fat</span>
              <span>{props.fiber} g / Fiber</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
