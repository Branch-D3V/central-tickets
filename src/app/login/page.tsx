import { Stack, Text } from "@chakra-ui/react";
import FormLogin from "@/components/Forms/FormLogin";

export default function LoginPage() {
  return (
    <Stack
      w="full"
      minH="100dvh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, #EFF6FF, #DBEAFE)"
      bg="#EFF6FF"
      px={{ base: 4, md: 8 }}
      py={12}
      gap={6}
    >
      <FormLogin />
      <Text fontSize="12px" color="#847F83">
        Central Tickets &copy; {new Date().getFullYear()}
      </Text>
    </Stack>
  );
}
