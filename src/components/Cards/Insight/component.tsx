import { HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { InsightCardProps } from "./interface";

export default function InsightCard({ label, value, icon }: InsightCardProps) {
  return (
    <Stack
      w="full"
      p={4}
      borderRadius="12px"
      border="1px solid"
      borderColor="gray.200"
      bg="gray.50"
      _hover={{
        bg: "gray.100",
        transform: "translateY(-2px)",
      }}
      transition="all 0.2s ease"
    >
      <HStack>
        {icon && <Icon as={icon} boxSize="4" color={"#FF0080"} />}
        <Text fontSize="14px" color="gray.600">
          {label}
        </Text>
      </HStack>
      <Text fontSize="28px" fontWeight="bold">
        {value}
      </Text>
    </Stack>
  );
}
