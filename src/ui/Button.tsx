import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "turq";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  small?: boolean;
}

export function Button({ variant = "primary", small, className = "", ...rest }: ButtonProps) {
  const variantClass = variant === "primary" ? "" : variant;
  const classes = ["btn", variantClass, small ? "small" : "", className].filter(Boolean).join(" ");
  return <button className={classes} {...rest} />;
}
