import type {
  ComponentPropsWithRef,
  ReactNode,
} from "react";
import {
  useId,
  useState,
} from "react";

import "./input.scss";

type InputProps = ComponentPropsWithRef<"input"> & {
  error?: string;
  label?: ReactNode;
};

export default function Input({
  "aria-describedby": ariaDescribedBy,
  error,
  id,
  label,
  name,
  ref,
  type,
  ...props
}: InputProps) {
  const isPassword = type === "password";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const generatedId = useId();
  const inputId = id ?? name ?? generatedId;
  const errorId = `${inputId}-error`;
  const hasError = error !== undefined && error !== "";
  const describedBy = hasError
    ? [ariaDescribedBy, errorId]
        .filter((value): value is string => value !== undefined && value !== "")
        .join(" ")
    : ariaDescribedBy;

  return (
    <div>
      <div className={`input-container${hasError ? " input-container--error" : ""}`}>
        {label !== undefined && label !== null && (
          <label htmlFor={inputId}>
            {label}
          </label>
        )}
        <div className="container">
          <input
            ref={ref}
            aria-describedby={describedBy}
            aria-invalid={hasError ? true : undefined}
            id={inputId}
            name={name}
            type={isPassword && isPasswordVisible ? "text" : type}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setIsPasswordVisible(currentValue => !currentValue)}
            >
              {isPasswordVisible ? "hide" : "show"}
            </button>
          )}
        </div>
      </div>
      {hasError && (
        <p
          id={errorId}
          className="error-message"
        >
          {error}
        </p>
      )}
    </div>
  );
}
