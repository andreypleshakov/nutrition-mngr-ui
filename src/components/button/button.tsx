import "./button.css";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className="button"
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
