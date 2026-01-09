import { ButtonProps } from "@chakra-ui/react";

export interface ButtonActionProps extends ButtonProps {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  loading?: boolean;
}
