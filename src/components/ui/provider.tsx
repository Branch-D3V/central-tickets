"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
import { UserProvider } from "@/contexts/UserContext";
import { Toaster } from "./toaster";
import GlobalLoader from "../GlobalLoader/component";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider defaultTheme="light">
        <UserProvider>
          <GlobalLoader />
          {children}
          <Toaster />
        </UserProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
