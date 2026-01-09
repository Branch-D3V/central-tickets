"use client";

import {
  Field,
  HStack,
  Icon,
  Text,
  Input as ChakraInput,
  InputGroup,
} from "@chakra-ui/react";
import { InputProps } from "./interface";
import { FiEye, FiEyeOff, FiLock } from "@/components/Icons";
import React from "react";

const InputBase = (
  {
    name,
    label,
    icon,
    error = null,
    isDisabled = false,
    bg = "#F0F0F0",
    border = "none",
    placeholder,
    ...rest
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const [show, setShow] = React.useState(false);
  const verifyIcon = () => {
    return show ? (
      <FiEye color={"gray.500"} size={"18px"} onClick={() => setShow(!show)} />
    ) : (
      <FiEyeOff
        color={"gray.500"}
        size={"18px"}
        onClick={() => setShow(!show)}
      />
    );
  };
  return (
    <Field.Root invalid={!!error} disabled={isDisabled}>
      {label && (
        <Field.Label htmlFor={name}>
          <HStack alignItems={"center"} spaceX={0}>
            {icon && <Icon as={icon} boxSize="4" color="#FF0070" />}
            <Text fontWeight={600} fontSize={16} lineHeight={"24px"}>
              {label}
            </Text>
          </HStack>
        </Field.Label>
      )}
      <InputGroup
        startElement={
          <Icon
            as={FiLock}
            boxSize="4"
            color={error ? "red.500" : "gray.500"}
          />
        }
        endElement={verifyIcon()}
      >
        <ChakraInput
          w={"full"}
          position="relative"
          p={2}
          placeholder={placeholder}
          border={border}
          bg={bg}
          ref={ref}
          name={name}
          id={name}
          type={show ? "text" : "password"}
          size="lg"
          autoComplete="off"
          {...rest}
        />
      </InputGroup>
    </Field.Root>
  );
};

export const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  InputBase
);
