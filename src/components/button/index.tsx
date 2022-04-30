import { ReactNode } from "react";
import "./style.css";

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  variant?: "RED" | "DEFAULT";
}

const Button = (props: ButtonProps) => {
  const { children, onClick, variant = "DEFAULT" } = props;
  const variantColor = variant === "RED" ? "red" : "";
  return (
    <button className={`btn ${variantColor}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
