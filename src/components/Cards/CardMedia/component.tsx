"use client";

import { HStack, Icon, Text } from "@chakra-ui/react";
import { CardMediaProps } from "./interface";

export function CardMedia({
  icon,
  info,
  iconColor = "#FF0080",
  iconSize = "60px",
  ...rest
}: CardMediaProps) {
  return (
    <HStack
      borderRadius="10px"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
      bg="white"
      minW="150px"
      maxH={"135px"}
      align="center"
      justify="center"
      p={5}
      gap={4}
      {...rest}
    >
      <Icon as={icon} color={iconColor} boxSize={{base: "32px", md: iconSize}} />
      <Text fontSize={{ base: "26px", md: "40px" }} color="gray.500">
        {info}
      </Text>
    </HStack>
  );
}
