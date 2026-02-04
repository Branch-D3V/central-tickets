import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { CardInfoProps } from "./interface";

export function CardInfo({
  icon,
  iconBg,
  title,
  color = "#847F83",
  value,
  description,
  ...rest
}: CardInfoProps) {
  return (
    <Stack
      w={"full"}
      border="1px solid #D9D9D9"
      borderRadius="20px"
      minH="150px"
      p={5}
      {...rest}
    >
      <HStack w="full" justify="space-between" align="center">
        <Box bg={iconBg} p={3} borderRadius="8px" color={color}>
          {icon}
        </Box>

        <Text fontSize={16} fontWeight={400} color={"#847F83"}>
          {title}
        </Text>
      </HStack>

      <Text fontSize={30} fontWeight={900} color={color}>
        {value}
      </Text>

      <Text fontSize={16} color="#847F83">
        {description}
      </Text>
    </Stack>
  );
}
