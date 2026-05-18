import { NativeSelectFieldProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends NativeSelectFieldProps {
  label?: string;
  error?: FieldError | null;
  isDisabled?: boolean;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  bg?: string;
}
