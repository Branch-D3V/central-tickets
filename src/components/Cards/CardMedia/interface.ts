import { StackProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface CardMediaProps extends StackProps {
  icon: IconType;
  info: string | number;
  iconColor?: string;
  iconSize?: string | number;
}
