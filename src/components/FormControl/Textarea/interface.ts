import { TextareaProps as ChakraTextareaProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

export interface TextareaProps extends ChakraTextareaProps {
  label?: string;
  error?: FieldError | null;
  isDisabled?: boolean;
  required?: boolean;
}
