"use client";

import { Field, NativeSelect, Text } from "@chakra-ui/react";
import { SelectProps } from "./interface";
import React from "react";

const SelectBase = (
  {
    name,
    label,
    error = null,
    isDisabled = false,
    bg = "#F0F0F0",
    options,
    placeholder,
    required = false,
    ...rest
  }: SelectProps,
  ref: React.ForwardedRef<HTMLSelectElement>
) => {
  return (
    <Field.Root invalid={!!error} disabled={isDisabled}>
      {label && (
        <Field.Label htmlFor={name}>
          <Text fontWeight={600} fontSize={16} lineHeight={"24px"}>
            {label}
          </Text>
          {required && (
            <Text as="span" color="red.500">
              {" "}
              *
            </Text>
          )}
        </Field.Label>
      )}
      <NativeSelect.Root size="lg" disabled={isDisabled}>
        <NativeSelect.Field
          ref={ref}
          name={name}
          id={name}
          bg={bg}
          border="none"
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  );
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  SelectBase
);
