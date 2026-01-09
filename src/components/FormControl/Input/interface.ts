import { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

export interface InputProps extends ChakraInputProps {
  label?: string;
  error?: FieldError | null;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: React.ElementType;
}
