"use client";

import { Avatar, Box, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import {
  RiVerifiedBadgeFill,
  FaRegImage,
  MdOndemandVideo,
  IoIosHeart,
} from "@/components/Icons";
import React from "react";
import FormLogin from "../Forms/FormLogin";

export default function AuthPage() {
  const [step, setStep] = React.useState(1);
  const [show, setShow] = React.useState(false);
  const [canExpand, setCanExpand] = React.useState(false);
  const textRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    if (textRef.current && textRef.current.scrollHeight > 100) {
      setCanExpand(true);
    }
  }, []);

  return (
    <Stack
      minH="100vh"
      justify={{ base: "flex-start", md: "center" }}
      px={2}
      pt={{ base: "80px", md: 0 }}
    >
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={2}
        position="relative"
        zIndex={1}
      >
        <Stack
          maxW={"500px"}
          bg="white"
          borderRadius="10px"
          p={8}
          pt="72px"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
          position="relative"
        >
          <Box
            position="absolute"
            top="-48px"
            left="50%"
            maxW={"198px"}
            transform="translateX(-50%)"
            border="5px solid white"
            borderRadius="full"
            boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
            bg="white"
            zIndex={2}
          >
            <Avatar.Root size="full">
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="/assets/webp/avatar.webp" />
            </Avatar.Root>
          </Box>
          <Stack mt={4}>
            <Stack gap={0}>
              <HStack justify={"center"} gap={1}>
                <Text textAlign={"center"} fontWeight="bold" fontSize="xl">
                  Andressa Urach
                </Text>
                <RiVerifiedBadgeFill color="#44FF7D" />
              </HStack>
              <HStack justify={"center"} gap={4}>
                <HStack gap={1} alignContent={"center"}>
                  <FaRegImage />
                  <Text fontSize="sm" color="gray.500">
                    429
                  </Text>
                </HStack>
                <HStack gap={1} alignContent={"center"}>
                  <MdOndemandVideo />
                  <Text fontSize="sm" color="gray.500">
                    350
                  </Text>
                </HStack>{" "}
                <HStack gap={1} alignContent={"center"}>
                  <IoIosHeart />
                  <Text fontSize="sm" color="gray.500">
                    31.8K
                  </Text>
                </HStack>
              </HStack>
            </Stack>
            <Text
              ref={textRef}
              fontSize="sm"
              color="gray.500"
              overflow="hidden"
              maxH={show ? "1000px" : "100px"}
              transition="max-height 0.4s ease, opacity 0.3s ease"
              opacity={show ? 1 : 0.9}
            >
              🇧🇷 🇧🇷🇧🇷 A puta onde o melhor do mundo se perdeu… 🏎️ Aqui é
              conteúdo adulto PESADO, sem censura 🔞 Vídeos explícitos,
              provocação intensa, oral, masturbação e tudo mais que você
              imagina… Aqui tem de tudo, de verdade 🔥 Safada, bem puta e
              atrevida… um convite que mexe com a cabeça e não sai da memória
              😈💦 💬 CHAT PRIVADO ATIVO Mando fotos e vídeos exclusivos,
              personalizados, do jeitinho que você pedir 👅📲 Realizo fetiches à
              distância e curto avaliar quando você manda foto do seu pau… eu
              reparo em tudo 😈🍆 Conteúdo pesado MESMO. Gosto de conversar,
              provocar e criar conexão. Aqui você vê de tudo e acaba se
              apaixonando 🔥 💬 Falo com você no chat TODOS OS DIAS!!! 👉 Assina
              e vem.
            </Text>
            {canExpand && (
              <Text
                fontSize="sm"
                color="blue.500"
                cursor="pointer"
                fontWeight="semibold"
                onClick={() => setShow(!show)}
              >
                {show ? "ver menos" : "ver mais"}
              </Text>
            )}
          </Stack>
        </Stack>
        {step == 1 ? <FormLogin setStep={setStep} /> : ""}
      </SimpleGrid>
    </Stack>
  );
}
