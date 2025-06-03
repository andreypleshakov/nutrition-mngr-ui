import "./add-consumption.css";
import crossIcon from "../../assets/icons/cross-icon.svg";
import searchIcon from "../../assets/icons/search-icon.svg";
import { useRef, useState } from "react";
import { Products } from "../../api/getProducts";
import { Product } from "../product/product";
import { Input } from "../input/input";
import { DropdownButton } from "../dropdown-button/dropdown-button";
import { CreateEntry } from "../create-entry/create-entry";
import { InputWithName } from "../input-with-name/input-with-name";
import { useVirtualizer } from "@tanstack/react-virtual";

type AddConsumptionProps = {
  onClick: () => void;
  productsList: Products[];
};

export const AddConsumption = (props: AddConsumptionProps) => {
  const [button, setButton] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: props.productsList.length,
    estimateSize: () => 80,
    getScrollElement: () => scrollRef.current,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const handlerSwitch = () => {
    setButton((b) => !b);
  };

  const handleTest = () => {
    // props.productsList.sort((a, b) => b.fiber - a.fiber)
    const topFiber = props.productsList.filter(
      (product) => product.fiber > 0.01
    );
    // topFiber.sort((a, b) => b.fiber - a.fiber);
    const sortedKcalFiber = [...topFiber].sort(
      (a, b) => b.kcal / b.fiber - a.kcal / a.fiber
    );
  };

  const handleTest2 = () => {
    // props.productsList.sort((a, b) => b.fiber - a.fiber)
    const topFiber = props.productsList.filter(
      (product) => product.protein > 0.2
    );
    // topFiber.sort((a, b) => b.fiber - a.fiber);
    const sortedKcalFiber = [...topFiber].sort(
      (a, b) => b.kcal / b.protein - a.kcal / a.protein
    );
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

        {/* {button ? (
          <div className="meal-search">
            <DropdownButton />
            <div onClick={handleTest2}>TEST</div>
            <Input
              imageSrc={searchIcon}
              placeholder="Search"
              type="string"
              label="g"
            />
          </div>
        ) : (
          <InputWithName name="Name" placeholder="Enter name" />
        )} */}
      </div>

      {button ? (
        <div className="product-list-2" ref={scrollRef}>
          <div
            className="product-list-relative"
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            <div
              className="product-list-absolute"
              style={{
                transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
              }}
            >
              {virtualItems &&
                virtualItems.map((vItem) => {
                  const product = props.productsList[vItem.index];
                  return (
                    <div
                      className="product-list-additional"
                      key={vItem.key}
                      data-index={vItem.index}
                      ref={virtualizer.measureElement}
                    >
                      <Product {...product} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <CreateEntry />
      )}
    </div>
  );
};
