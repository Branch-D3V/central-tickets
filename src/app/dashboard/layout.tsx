import { Stack } from "@chakra-ui/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack w="full" h={"full"} mt={24} p={{ base: 2, md: 12 }}>
      {children}
    </Stack>
  );
}
