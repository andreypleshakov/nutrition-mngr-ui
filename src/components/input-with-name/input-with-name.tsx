import { Input } from "../input/input";
import "./input-with-name.css";

type InputWithNameProps = {
  name: string;
  placeholder: string;
  label?: string
};

export const InputWithName = (props: InputWithNameProps) => {
  return (
    <div className="name-product-input">
      <span>{props.name}</span>
      <Input placeholder={props.placeholder} type="string" label={props.label}/>
    </div>
  );
};
