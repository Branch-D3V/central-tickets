import { Button } from "@chakra-ui/react";
import { ButtonActionProps } from "./interface";

export function ButtonAction({
  children,
  onClick,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  ...rest
}: ButtonActionProps) {
  return (
    <Button
      loading={loading}
      position="relative"
      onClick={onClick}
      disabled={disabled}
      px={4}
      {...rest}
    >
      {leftIcon && <>{leftIcon}</>}
      {children}
      {rightIcon && <>{rightIcon}</>}
    </Button>
  );
}
