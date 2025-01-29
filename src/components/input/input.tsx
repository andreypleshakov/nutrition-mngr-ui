import "./input.css";

type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageSrc?: string;
  placeholder: string;
  type: string;
  label?: string;
};

export const Input = (props: InputProps) => {
  return (
    <div className="input-wrapper">
      {props.imageSrc && (
        <img src={props.imageSrc} alt="icon" className="input-icon" />
      )}

      <input
        className="input"
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
      />

      <span className="input-label">{props.label}</span>
    </div>
  );
};
