import "./add-consumption.css";
import crossIcon from "../../assets/icons/cross-icon.svg";
import searchIcon from "../../assets/icons/search-icon.svg";
import { useState } from "react";
import { Products } from "../../api/getProducts";
import { Product } from "../product/product";
import { Input } from "../input/input";
import { DropdownButton } from "../dropdown-button/dropdown-button";
import { CreateEntry } from "../create-entry/create-entry";
import { InputWithName } from "../input-with-name/input-with-name";

type AddConsumptionProps = {
  onClick: () => void;
  productsList: Products[];
};

export const AddConsumption = (props: AddConsumptionProps) => {
  const [button, setButton] = useState(true);

  const handlerSwitch = () => {
    setButton((b) => !b);
  };

  return (
    <div className="main">
      <div className="new-switch-search">
        <div className="new-entry-x">
          <span>New entry</span>
          <img
            className="x"
            src={crossIcon}
            alt="cross-cion"
            onClick={props.onClick}
          />
        </div>
        <div
          className={`add-create ${button ? "add-create-change" : ""}`}
          onClick={handlerSwitch}
        >
          <div
            className="add-create-switcher"
            style={{
              transform: `translateX(${button ? "0%" : "100%"})`,
            }}
          ></div>

          <span
            className={`add-text-switcher  ${
              button ? "switch-on" : "switch-off"
            }`}
          >
            Add
          </span>
          <span
            className={`create-text-switcher ${
              button ? "switch-off" : "switch-on"
            }`}
          >
            Create
          </span>
        </div>

        {button ? (
          <div className="meal-search">
            <DropdownButton />
            <Input
              imageSrc={searchIcon}
              placeholder="Search"
              type="string"
              label="g"
            />
          </div>
        ) : (
          <InputWithName name="Name" placeholder="Enter name" />
        )}
      </div>

      {button ? (
        <div className="product-list-2">
          {props.productsList &&
            props.productsList.map((product, index) => (
              <Product key={index} {...product} />
            ))}
        </div>
      ) : (
        <CreateEntry />
      )}
    </div>
  );
};
