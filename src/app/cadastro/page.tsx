import FormRegister from "@/components/Forms/FormRegister";
import { Stack } from "@chakra-ui/react";

export default function RegisterPage() {
  return (
    <Stack
      minH="100vh"
      w={"full"}
      justify={"center"}
      align={"center"}
      px={2}
      pt={{ base: "80px", md: 0 }}
    >
      <FormRegister />
    </Stack>
  );
}
