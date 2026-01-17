"use client";

import { Stack } from "@chakra-ui/react";
import React from "react";
import HeaderComponent from "../Header";
import AgeModal from "@/components/Modals/AgeModal";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      position="relative"
      w="full"
      minH="100dvh"
      backgroundImage="url('/assets/webp/background.webp')"
      backgroundSize="cover"
      backgroundPosition="center top"
      backgroundRepeat="no-repeat"
    >
      <Stack
        position="fixed"
        inset={0}
        bg="whiteAlpha.800"
        backdropFilter="blur(15px)"
        zIndex={0}
      />

      <Stack position="relative" zIndex={1} w="full">
        <HeaderComponent />
        {children}
        <AgeModal />
      </Stack>
    </Stack>
  );
}

export { MainLayout };
