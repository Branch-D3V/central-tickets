import {ButtonProps} from "@chakra-ui/react";
import {ReactNode} from "react";

export interface ButtonCopyProps extends ButtonProps {
  textCopy: string;
  key?: number | string;
  children: ReactNode;
}
