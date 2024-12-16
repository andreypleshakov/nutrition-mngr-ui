import { Products } from "../../api/getProducts";
import { Product } from "../product/product";
import "./list-of-products";

type ListOfProductsProps = {
  productsList: Products[];
}

export const ListOfProducts = (props: ListOfProductsProps) => {
  return (
    <div>
      {/* {props.productsList &&
        props.productsList.map((product, index) => (
          <Product key={index} {...product} />
        ))} */}
    </div>
  );
};
