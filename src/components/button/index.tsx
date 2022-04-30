import { ReactNode } from "react";
import "./style.css";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
  const { children, onClick } = props;
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
