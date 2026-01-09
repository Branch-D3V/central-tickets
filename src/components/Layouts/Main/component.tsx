"use client";

import { Stack } from "@chakra-ui/react";
import React from "react";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Stack w={"full"} h={"full"} direction={"row"}>
      {children}
    </Stack>
  );
}

export { MainLayout };
