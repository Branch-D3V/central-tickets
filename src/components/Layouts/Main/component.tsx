"use client";

import { Stack } from "@chakra-ui/react";
import React from "react";
import SidebarComponent from "../Sidebar";
import { usePathname } from "next/navigation";

const HIDE_SIDEBAR_ON = ["/login", "/"];

function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideSidebar = HIDE_SIDEBAR_ON.includes(pathname);

  if (hideSidebar) {
    return (
      <Stack w="full" minH="100dvh">
        {children}
      </Stack>
    );
  }

  return (
    <Stack w="full" minH="100dvh">
      <SidebarComponent />
      <Stack w="full" h="full" mt={24} p={{ base: 2, md: 12 }}>
        {children}
      </Stack>
    </Stack>
  );
}

export { MainLayout };
