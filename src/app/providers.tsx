"use client";

import { Provider } from "@/components/ui/provider";
import { SecurityProvider } from "@/providers/securityProvider";
import { Stack } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <SecurityProvider>
        <Stack w={"full"} h={"full"}>
          {children}
        </Stack>
      </SecurityProvider>
    </Provider>
  );
}
