"use client";

import {
  Avatar,
  Box,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  RiVerifiedBadgeFill,
  FaRegImage,
  MdOndemandVideo,
  IoIosHeart,
  FiLock,
} from "@/components/Icons";

import { keyframes } from "@emotion/react";
import { CardMedia } from "../Cards/CardMedia/component";

export default function AuthPage() {
  const fadeUp = keyframes`
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const thumbnails = [
    "/assets/banner/1.webp",
    "/assets/banner/2.webp",
    "/assets/banner/3.webp",
    "/assets/banner/4.webp",
  ];

  const fakeGrid = (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} gap={3}>
      {Array.from({ length: 10 }).map((_, index) => {
        const bgImage = thumbnails[index % thumbnails.length];

        return (
          <Box
            key={index}
            position="relative"
            w="full"
            h="140px"
            borderRadius="12px"
            overflow="hidden"
          >
            <Box
              w="full"
              h="full"
              bgImage={`url(${bgImage})`}
              bgSize="cover"
              bgPos="center"
              filter="blur(10px)"
              transform="scale(1.1)"
            />

            <Box
              position="absolute"
              inset={0}
              bg="rgba(0,0,0,0.45)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FiLock} boxSize="40px" color="white" opacity={0.9} />
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
  );

  return (
    <>
      <Stack
        w="full"
        zIndex={10}
        gap={2}
        px={4}
        py={{ base: 6, md: 10 }}
        align="center"
        justify="center"
        textAlign="center"
      >
        <Text
          zIndex={10}
          fontWeight="extrabold"
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "7xl" }}
          lineHeight="shorter"
          color="#FF0080"
          letterSpacing="-0.02em"
          animation={`${fadeUp} 0.8s ease-out forwards`}
        >
          Liberte-se com conteúdos exclusivos
        </Text>

        <Text
          color="gray.500"
          fontSize={{ base: "md", md: "lg" }}
          maxW="720px"
          animation={`${fadeUp} 1s ease-out forwards`}
        >
          Descubra experiências únicas, acesso premium e conteúdos feitos para
          quem quer uma liberdade EXTREMA.
        </Text>
      </Stack>
      <Stack
        w={"full"}
        direction={{ base: "column", md: "row" }}
        mt={{ base: 8, md: 4 }}
        justify={"space-evenly"}
      >
        <Stack
          maxW={{ base: "full", md: "500px" }}
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
            minW={"188px"}
            minH={"112px"}
            transform="translateX(-50%)"
            border="5px solid white"
            borderRadius="full"
            boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
            bg="white"
            zIndex={2}
          >
            <Avatar.Root size="full" minW={"188px"} minH={"112px"}>
              <Avatar.Fallback name="Andressa Urach" />
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
              {/* <HStack justify={"center"} gap={4}>
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
              </HStack> */}
            </Stack>
            <Text
              fontSize="sm"
              color="gray.500"
              overflow="auto"
              maxH={"100px"}
              transition="max-height 0.4s ease, opacity 0.3s ease"
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
          </Stack>
        </Stack>
        <SimpleGrid
          zIndex={10}
          gap={{ base: 2, md: 4 }}
          columns={{ base: 2, md: 1, lg: 2 }}
        >
          <CardMedia icon={FaRegImage} info={429} />
          <CardMedia icon={MdOndemandVideo} info={350} />
          <CardMedia icon={IoIosHeart} info={"31.8K"} />
          <CardMedia icon={FiLock} info={343} />
        </SimpleGrid>
      </Stack>
      <Stack w={"full"} p={4}>
        <Tabs.Root defaultValue="fotos">
          <Tabs.List>
            <Tabs.Trigger
              justifyContent={"center"}
              fontSize={"18px"}
              w={"full"}
              value="fotos"
              color={"#FF0080"}
            >
              <FaRegImage size={"20px"} />
              Fotos
            </Tabs.Trigger>
            <Tabs.Trigger
              justifyContent={"center"}
              fontSize={"18px"}
              w={"full"}
              value="videos"
              color={"#FF0080"}
            >
              <MdOndemandVideo size={"20px"} />
              Videos
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="fotos">{fakeGrid}</Tabs.Content>
          <Tabs.Content value="videos">{fakeGrid}</Tabs.Content>
        </Tabs.Root>
      </Stack>
    </>
  );
}
