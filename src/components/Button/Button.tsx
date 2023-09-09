import { PropsWithChildren } from "react";
import "./Button.css";

interface ButtonProps extends PropsWithChildren {
  className?: string;
  actionOnClick: () => void;
}

const Button = ({
  className,
  actionOnClick,
  children,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      className={`button${className ? " " + className : ""}`}
      onClick={actionOnClick}
    >
      {children}
    </button>
  );
};

export default Button;
