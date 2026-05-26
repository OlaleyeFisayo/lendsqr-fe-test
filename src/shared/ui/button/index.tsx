import type { ComponentPropsWithRef } from "react";
import "./button.scss";

type ButtonProps = ComponentPropsWithRef<"button">;

export default function Button({
  children,
  className,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={["app-button", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
