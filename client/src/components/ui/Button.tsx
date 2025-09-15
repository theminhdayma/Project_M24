import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function Button({
  className = "",
  variant = "primary",
  leftIcon,
  rightIcon,
  children,
  ...rest
}: ButtonProps) {
  const variantClass = variant === "primary" ? "btn-primary" : "btn-ghost";
  return (
    <button className={`${variantClass} ${className}`} {...rest}>
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  );
}


