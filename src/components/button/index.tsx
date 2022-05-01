import { ReactNode } from "react";
import "./style.css";

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  variant?: "RED" | "DEFAULT";
  size?: "S" | "M" | "L";
}

const Button = (props: ButtonProps) => {
  const { children, onClick, variant = "DEFAULT", size = "M" } = props;
  const variantColor = variant === "RED" ? "red" : "";
  return (
    <button className={`btn ${variantColor} ${size}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
