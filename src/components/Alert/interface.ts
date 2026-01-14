import {AlertRootProps as ChakraAlertProps} from "@chakra-ui/react";

export interface AlertMessageProps extends ChakraAlertProps {
  title: string;
  message: string;
  colorIcon?: string;
  status?: "info" | "warning" | "error" | "success";
}
