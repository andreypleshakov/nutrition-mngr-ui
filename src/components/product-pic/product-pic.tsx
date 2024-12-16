import "./product-pic.css";
import productIcon from "../../assets/icons/food-icon.svg";

type ProductPicProps = {
  picture?: string;
}

export const ProductPic = (props: ProductPicProps) => {
  return (
    <div className="product-pic">
      {props.picture ? (
        <img src={props.picture} alt="product-pic" />
      ) : (
        <img src={productIcon} alt="product-placeholder" className="product-icon"/>
      )}
    </div>
  );
};
