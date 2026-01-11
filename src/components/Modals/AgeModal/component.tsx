"use client";

import { Dialog, HStack, Portal } from "@chakra-ui/react";
import { Stack, Text, Button } from "@chakra-ui/react";
import { parseCookies, setCookie } from "nookies";
import { MdBlock } from "@/components/Icons";
import React from "react";

export default function AgeModal() {
  const [open, setOpen] = React.useState(false);
  const [blocked, setBlocked] = React.useState(false);
  const COOKIE_NAME = "age_verified";
  const COOKIE_DURATION = 60 * 30;

  React.useEffect(() => {
    const cookies = parseCookies();
    if (!cookies[COOKIE_NAME]) {
      setOpen(true);
    }
  }, []);

  const handleEnter = () => {
    setCookie(null, COOKIE_NAME, "true", {
      maxAge: COOKIE_DURATION,
      path: "/",
      sameSite: "lax",
    });

    setOpen(false);
  };

  const handleExit = () => {
    setBlocked(true);
  };

  return (
    <Dialog.Root
      open={open}
      placement={"center"}
      onOpenChange={() => {}}
      closeOnEscape={false}
      closeOnInteractOutside={false}
      modal
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(15px)" />
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            color="black"
            borderRadius="12px"
            maxW="420px"
            mx={4}
            p={6}
          >
            <Dialog.Body>
              {!blocked ? (
                <Stack gap={6} textAlign="center">
                  <Text fontSize="22px" fontWeight="bold">
                    🔞 Conteúdo adulto
                  </Text>

                  <Text fontSize="15px" opacity={0.85}>
                    Este site contém conteúdo explícito e é destinado
                    exclusivamente a maiores de 18 anos.
                  </Text>

                  <Stack gap={4}>
                    <Button
                      bg="#FF0080"
                      color="white"
                      fontWeight={800}
                      fontSize={"16px"}
                      _hover={{ bg: "#C30061" }}
                      onClick={handleEnter}
                    >
                      Tenho +18 anos — Entrar
                    </Button>

                    <Text
                      cursor={"pointer"}
                      color="gray.800"
                      onClick={handleExit}
                    >
                      Não tenho +18 anos — Sair
                    </Text>
                  </Stack>
                </Stack>
              ) : (
                <Stack gap={4} textAlign="center">
                  <HStack w={"full"} justify={"center"}>
                    <MdBlock color="red" size={"22px"} />
                    <Text fontSize="22px" fontWeight="bold">
                      Acesso restrito
                    </Text>
                  </HStack>

                  <Text fontSize="15px" opacity={0.8}>
                    Este site é destinado apenas a usuários com mais de 18 anos.
                  </Text>
                </Stack>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
