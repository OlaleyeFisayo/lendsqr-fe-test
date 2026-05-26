import type { ComponentPropsWithRef } from "react";
import "./button.scss";

type ButtonProps = ComponentPropsWithRef<"button">;

export default function Button({
  children,
  className,
  ref,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps & {
  variant?: "danger-outline" | "outline" | "primary" | "secondary-outline";
}) {
  return (
    <button
      ref={ref}
      type={type}
      className={["app-button", `app-button--${variant}`, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
