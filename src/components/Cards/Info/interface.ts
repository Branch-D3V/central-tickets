import { StackProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface CardInfoProps extends StackProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  value: string | number;
  description: string;
  color?: string;
}
