"use client";

import { Stack } from "@chakra-ui/react";
import React from "react";
import SidebarComponent from "../Sidebar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Stack position="relative" w="full" minH="100dvh">
      <SidebarComponent />
      {children}
    </Stack>
  );
}

export { MainLayout };
