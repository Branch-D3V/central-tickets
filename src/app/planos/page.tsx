import Plans from "@/components/Plans";
import { Stack } from "@chakra-ui/react";

export default function PlansPage() {
  return (
    <Stack
      minH="100vh"
      w={"full"}
      justify={"center"}
      align={"center"}
      px={2}
      pt={{ base: "80px", md: 0 }}
    >
      <Plans />
    </Stack>
  );
}
