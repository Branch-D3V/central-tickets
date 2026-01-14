"use client";

import { Flex, Spinner } from "@chakra-ui/react";
import { useUser } from "@/contexts/UserContext";

export default function GlobalLoader() {
  const { isLoadingPages } = useUser();

  if (!isLoadingPages) return null;

  return (
    <Flex
      position="fixed"
      inset={0}
      zIndex={9999}
      bg="blackAlpha.800"
      align="center"
      justify="center"
      backdropFilter="blur(8px)"
    >
      <Spinner size="xl" color="#FF0080" />
    </Flex>
  );
}
