"use client";

import { Stack } from "@chakra-ui/react";
import React from "react";
import HeaderComponent from "../Header";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Stack position="relative" w="full" minH="100dvh">
      <HeaderComponent />
      {children}
    </Stack>
  );
}

export { MainLayout };
