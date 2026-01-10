"use client";

import { Stack } from "@chakra-ui/react";
import React from "react";
import HeaderComponent from "../Header";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      w={"full"}
      h={"full"}
      direction={"row"}
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
      <HeaderComponent />
      {children}
    </Stack>
  );
}

export { MainLayout };
