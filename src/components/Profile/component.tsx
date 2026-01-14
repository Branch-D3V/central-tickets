"use client";

import { Stack, Text, Separator, Box, HStack, Badge } from "@chakra-ui/react";
import { useUser } from "@/contexts/UserContext";
import React from "react";
import FormPersonalInfo from "../Forms/FormPersonalInfo";
import FormPassword from "../Forms/FormPassword";
import { redirect, useRouter } from "next/navigation";
import { FaCrown, FaUser } from "react-icons/fa";

export default function Profile() {
  const { isAuthenticated, user } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

  return (
    <Stack
      maxW={800}
      w="full"
      bg="white"
      borderRadius="10px"
      p={{ base: 6, md: 8 }}
      gap={8}
      align="center"
      justify="space-evenly"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 6px -1px"
      position="relative"
    >
      <Text fontSize={"25px"} fontWeight={300} alignSelf={"flex-start"}>
        Perfil do usuário
      </Text>

      <Stack w={"full"} gap={6}>
        <HStack justify="space-between">
          <HStack>
            {user?.status_acesso ? <FaCrown size={22} /> : <FaUser size={22} />}
            <Text fontSize="lg" fontWeight="bold">
              Status da Conta
            </Text>
          </HStack>

          <Badge
            px={3}
            py={1}
            borderRadius="full"
            bg={user?.status_acesso ? "whiteAlpha.300" : "gray.300"}
            color={user?.status_acesso ? "white" : "gray.700"}
          >
            {user?.status_acesso ? "Premium" : "Gratuita"}
          </Badge>
        </HStack>

        <Text fontSize="sm" opacity={0.9}>
          {user?.status_acesso
            ? "Você tem acesso a todos os recursos exclusivos da plataforma."
            : "Atualize para Premium e desbloqueie todos os recursos."}
        </Text>

        <Box
          onClick={() => router.push("/planos")}
          textAlign={"center"}
          bgColor={"gray.100"}
          p={3}
          borderRadius="12px"
        >
          <Text fontSize="sm" fontWeight="medium">
            {user?.status_acesso
              ? "✔ Conteúdos exclusivos liberados"
              : "🔒 Conteúdos exclusivos bloqueados"}
          </Text>
        </Box>
      </Stack>
      <Stack w={"full"} gap={6}>
        <Text fontSize={"18px"}>Informações pessoais</Text>
        <FormPersonalInfo />
      </Stack>
      <Separator w={"full"} borderColor="#FF0080" />
      <Stack w={"full"} gap={6}>
        <Text fontSize={"18px"}>Alterar Senha</Text>
        <FormPassword />
      </Stack>
    </Stack>
  );
}
