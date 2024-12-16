import { useState } from "react";
import "./consumed-product.css";
import arrowDown from "../../assets/icons/arrow-down.svg";
import productOptions from "../../assets/icons/product-options-icon.svg";
import { DailyFood } from "../../api/getStatAndGoal";
import { ProductPic } from "../product-pic/product-pic";

type ConsumedProductProps = DailyFood & {
  deletionStatus: () => void;
}

export const ConsumedProduct = (props: ConsumedProductProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [style, setStyle] = useState("");

  const handleArrowClick = () => {
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

  return (
    <div className={`consumed-product ${isExpanded ? "cons-h-o" : "cons-h-c"}`}>
      <div className="name-mass">
        <div className="name-time-icon">
          <img
            className={`icon ${
              isExpanded ? "arrow-expanded" : "arrow-collapsed"
            }`}
            src={arrowDown}
            alt="arrow-down"
            onClick={handleArrowClick}
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

      {isExpanded && (
        <div className={`pic-nutritions ${style}`}>
          <ProductPic />
          <span className="nutritions">
            <span>{props.protein} g / Protein</span>
            <span>{props.carbs} g / Carbs</span>
            <span>{props.totalFat} g / Fat</span>
            <span>{props.fiber} g / Fiber</span>
          </span>
        </div>
      )}
    </div>
  );
};
