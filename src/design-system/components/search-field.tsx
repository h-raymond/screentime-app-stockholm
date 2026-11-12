"use client";

import * as React from "react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/design-system/components/input-group";
import { type InputSurfaceVariant } from "@/design-system/components/input-surface-variants";
import { cn } from "@/lib/utils";

type SearchFieldProps = Omit<
  React.ComponentProps<"input">,
  "defaultValue" | "onChange" | "type" | "value"
> & {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
  variant?: InputSurfaceVariant;
  clearLabel?: string;
};

/**
 * A pill InputGroup with a leading search icon and a clear button that
 * becomes available once there is a value. The parent owns search state.
 */
export function SearchField({
  className,
  variant = "filled",
  onClear,
  clearLabel = "Clear search",
  value,
  disabled,
  onChange,
  ...props
}: SearchFieldProps) {
  const showClear = !disabled && value.length > 0;

  return (
    <InputGroup
      data-slot="search-field"
      variant={variant}
      className={cn("rounded-full", className)}
    >
      <InputGroupInput
        {...props}
        type="search"
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="[&::-webkit-search-cancel-button]:hidden"
      />
      <InputGroupAddon>
        <MagnifyingGlassIcon aria-hidden />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-compact"
          aria-label={clearLabel}
          aria-hidden={!showClear}
          disabled={!showClear}
          tabIndex={showClear ? 0 : -1}
          onClick={onClear}
          className={cn(!showClear && "invisible")}
        >
          <XMarkIcon aria-hidden />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
