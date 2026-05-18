"use client";

import { Field, Text, Textarea as ChakraTextarea } from "@chakra-ui/react";
import { TextareaProps } from "./interface";
import React from "react";

const TextareaBase = (
  {
    name,
    label,
    error = null,
    isDisabled = false,
    bg = "#F0F0F0",
    border = "none",
    required = false,
    placeholder,
    ...rest
  }: TextareaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>
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
      <ChakraTextarea
        ref={ref}
        name={name}
        id={name}
        bg={bg}
        border={border}
        placeholder={placeholder}
        size="lg"
        minH="120px"
        autoComplete="off"
        {...rest}
      />
    </Field.Root>
  );
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  TextareaBase
);
