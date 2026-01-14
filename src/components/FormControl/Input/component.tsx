"use client";

import {
  Field,
  Icon,
  Text,
  Input as ChakraInput,
  InputGroup,
} from "@chakra-ui/react";
import { InputProps } from "./interface";
import React from "react";

const InputBase = (
  {
    name,
    label,
    icon,
    type = "text",
    error = null,
    isDisabled = false,
    placeholder,
    bg = "#F0F0F0",
    border = "none",
    required = false,
    ...rest
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
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
      <InputGroup
        startElement={
          icon && (
            <Icon
              as={icon}
              boxSize="4"
              color={error ? "red.500" : "gray.500"}
            />
          )
        }
      >
        <ChakraInput
          border={border}
          bg={bg}
          w={"full"}
          position="relative"
          p={2}
          placeholder={placeholder}
          ref={ref}
          name={name}
          id={name}
          type={type}
          size="lg"
          autoComplete="off"
          {...rest}
        />
      </InputGroup>
    </Field.Root>
  );
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(InputBase);
