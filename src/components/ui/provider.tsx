"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { UserProvider } from "@/contexts/UserContext";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <UserProvider>
        <ColorModeProvider {...props} />
      </UserProvider>
    </ChakraProvider>
  );
}
