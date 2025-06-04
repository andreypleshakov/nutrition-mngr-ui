import styles from "./add-consumption.module.css";
import crossIcon from "../../assets/icons/cross-icon.svg";
import { useRef, useState } from "react";
import { Products } from "../../api/getProducts";
import { Product } from "../product/product";
import { CreateEntry } from "../create-entry/create-entry";
import { useVirtualizer } from "@tanstack/react-virtual";
import { motion } from "motion/react";

type AddConsumptionProps = {
  onClick: () => void;
  productsList: Products[];
};

export const AddConsumption = (props: AddConsumptionProps) => {
  const [isAdd, setIsAdd] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: props.productsList.length,
    estimateSize: () => 80,
    getScrollElement: () => scrollRef.current,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const handlerSwitch = () => {
    setIsAdd((a) => !a);
  };

  /*

  THIS IS FILTERING LOGIC (TODO)

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

   */

  return (
    <div className={styles.main}>
      <div className={styles["header-switch"]}>
        <div className={styles.header}>
          <span>
            <strong>New entry</strong>
          </span>
          <img
            className={styles.x}
            src={crossIcon}
            alt="cross-icon"
            onClick={props.onClick}
          />
        </div>

        <div className={styles.switch} onClick={handlerSwitch}>
          <motion.div
            className={styles.switcher}
            animate={{ x: isAdd ? "0%" : "100%" }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          />

          <motion.span
            className={styles.add}
            initial={{ color: "#ffffff" }}
            animate={{ color: isAdd ? "#ffffff" : "#81b081" }}
            transition={{ duration: 0.3 }}
          >
            Add
          </motion.span>

          <motion.span
            className={styles.create}
            initial={{ color: "#81b081" }}
            animate={{ color: !isAdd ? "#ffffff" : "#81b081" }}
            transition={{ duration: 0.3 }}
          >
            Create
          </motion.span>
        </div>
      </div>

      {isAdd ? (
        <div className={styles["product-list"]} ref={scrollRef}>
          <div
            className={styles["product-list-relative"]}
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            <div
              className={styles["product-list-absolute"]}
              style={{
                transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
              }}
            >
              {virtualItems &&
                virtualItems.map((vItem) => {
                  const product = props.productsList[vItem.index];
                  return (
                    <div
                      className={styles.product}
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
