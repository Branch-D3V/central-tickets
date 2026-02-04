"use client";

import { Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ButtonAction from "@/components/Buttons/Action";
import { useRouter } from "next/navigation";

const MotionStack = motion(Stack);
const MotionText = motion(Text);

export default function NotFound() {
  const router = useRouter();
  return (
    <MotionStack
      h="100vh"
      w="full"
      justify="center"
      align="center"
      px={4}
      gap={6}
      bg="white"
      color="black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      zIndex={50}
    >
      <MotionText
        fontSize={{ base: "96px", md: "140px" }}
        fontWeight="bold"
        color="#3B82F6"
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
        Essa página não existe
        <br />
        <Text as="span" color="#3B82F6" fontWeight="bold">
          Retorne e verifique.
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
        Caso o erro persista,
        <br />
        Entre em contato com o suporte.
      </MotionText>

      <MotionStack
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <ButtonAction
          onClick={() => router.push("/")}
          size="lg"
          bg="#3B82F6"
          color="white"
          _hover={{
            bg: "#295daf",
            transform: "scale(1.05)",
          }}
          transition="all 0.2s"
          borderRadius="full"
        >
          Voltar para Dashboard
        </ButtonAction>
      </MotionStack>
    </MotionStack>
  );
}
