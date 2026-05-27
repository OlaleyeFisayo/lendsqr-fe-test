import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import * as SelectPrimitive from "@radix-ui/react-select";
import "./select.scss";

export type SelectOption = {
  label: ReactNode;
  value: string;
};

type SelectProps = {
  ariaLabel?: string;
  className?: string;
  clearLabel?: ReactNode;
  disabled?: boolean;
  id?: string;
  name?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: ReactNode;
  value?: string;
  variant?: "filter" | "pagination";
};

const EMPTY_VALUE = "__app_select_empty__";

export default function Select({
  ariaLabel,
  className,
  clearLabel,
  disabled,
  id,
  name,
  onValueChange,
  options,
  placeholder = "Select",
  value,
  variant = "filter",
}: SelectProps) {
  function handleValueChange(nextValue: string) {
    onValueChange?.(nextValue === EMPTY_VALUE ? "" : nextValue);
  }

  return (
    <SelectPrimitive.Root
      name={name}
      value={value === "" ? undefined : value}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        id={id}
        aria-label={ariaLabel}
        className={["app-select", `app-select--${variant}`, className].filter(Boolean).join(" ")}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <Icon
            icon="tabler:chevron-down"
            aria-hidden="true"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="app-select-content"
          collisionPadding={16}
          position="popper"
          sideOffset={6}
        >
          <SelectPrimitive.Viewport className="app-select-viewport">
            {clearLabel !== undefined && (
              <SelectPrimitive.Item
                className="app-select-item"
                value={EMPTY_VALUE}
              >
                <SelectPrimitive.ItemText>{clearLabel}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            )}
            {options.map(option => (
              <SelectPrimitive.Item
                className="app-select-item"
                key={option.value}
                value={option.value}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
