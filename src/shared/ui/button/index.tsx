import type { PropsWithChildren } from "react";
import "./button.scss";

type ButtonProps = PropsWithChildren;

export default function Button({ children }: ButtonProps) {
  return (
    <button id="app-button">
      {children}
    </button>
  );
}
