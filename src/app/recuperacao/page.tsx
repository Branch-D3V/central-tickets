import FormRecovery from "@/components/Forms/FormRecovery";
import { Stack } from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <Stack
      minH="100vh"
      w={"full"}
      justify={"center"}
      align={"center"}
      px={2}
      pt={{ base: "80px", md: 0 }}
    >
      <FormRecovery />
    </Stack>
  );
}
