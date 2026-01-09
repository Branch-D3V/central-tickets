"use client";

import AuthPage from "@/components/AuthPage/component";
import { Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Stack
      w={"full"}
      h={"full"}
      align={"center"}
      justify={"center"}
      backgroundImage="url('/assets/webp/background.webp')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Stack
        position="absolute"
        inset={0}
        bg="whiteAlpha.800"
        backdropFilter="blur(15px)"
      />
      <AuthPage />
    </Stack>
  );
}
