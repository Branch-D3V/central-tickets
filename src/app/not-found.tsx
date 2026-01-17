"use client";

import { Stack, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ButtonAction from "@/components/Buttons/Action";
import { useRouter } from "next/navigation";

const MotionStack = motion(Stack);
const MotionText = motion(Text);

export default function NotFound() {
  const router = useRouter();
  return (
    <MotionStack
      minH="100vh"
      w="full"
      justify="center"
      align="center"
      px={4}
      gap={6}
      bg="black"
      color="white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      zIndex={50}
    >
      <MotionText
        fontSize={{ base: "96px", md: "140px" }}
        fontWeight="bold"
        color="#FF0080"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        404
      </MotionText>

      <MotionText
        fontSize={{ base: "18px", md: "22px" }}
        textAlign="center"
        maxW="420px"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Essa página não existe…
        <br />
        <Text as="span" color="#FF0080" fontWeight="bold">
          talvez você tenha ido fundo demais 😈
        </Text>
      </MotionText>

      <MotionText
        fontSize="14px"
        opacity={0.7}
        textAlign="center"
        maxW="360px"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ delay: 0.4 }}
      >
        Conteúdo restrito, rota inválida ou curiosidade demais.
        <br />
        Melhor voltar antes que dê problema…
      </MotionText>

      <MotionStack
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <ButtonAction
          onClick={() => router.push("/")}
          size="lg"
          bg="#FF0080"
          color="white"
          _hover={{
            bg: "#C30061",
            transform: "scale(1.05)",
          }}
          transition="all 0.2s"
          borderRadius="full"
        >
          Voltar para um lugar seguro 🔥
        </ButtonAction>
      </MotionStack>

      <Text fontSize="10px" opacity={0.2} position="absolute" bottom="12px">
        Você não deveria estar aqui...
      </Text>
    </MotionStack>
  );
}
