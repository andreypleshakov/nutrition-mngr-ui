import "./dropdown-button.css";
import arrowDown from "../../assets/icons/arrow-down.svg";
import { useState } from "react";

export const DropdownButton = () => {
  const [active, setActive] = useState(false);
  const [check, setCheck] = useState(false);

  const handleClick = () => {
    setActive((a) => !a);
  };

  const handleCheckChange = (event: React.MouseEvent<HTMLSpanElement>) => {
    const element = event.currentTarget.textContent;

    if (element === "Products" && check) {
      setCheck(false);
      setActive(false);
    }

    if (element === "Meals" && !check) {
      setCheck(true);
      setActive(false);
    }
  };

  return (
    <div className="dropdown">
      {active && (
        <div className="dropdown-menu">
          <div className="products-check" onClick={handleCheckChange}>
            <span className={`${!check ? "text-green" : ""}`}>Products</span>
          </div>

          <div className="meal-check" onClick={handleCheckChange}>
            <span className={`${check ? "text-green" : ""}`}>Meals</span>
          </div>
        </div>
      )}

      <div
        className={`meal ${active ? "meal-on" : "meal-off"}`}
        onClick={handleClick}
      >
        <span>{!check ? "Products" : "Meals"}</span>
        <img className="x" src={arrowDown} alt="arrow-down" />
      </div>
    </div>
  );
};
