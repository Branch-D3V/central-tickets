"use client";

import {
  Avatar,
  Box,
  Center,
  GridItem,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  RiVerifiedBadgeFill,
  FaRegImage,
  MdOndemandVideo,
  FiLock,
  FaUser,
} from "@/components/Icons";

import { keyframes } from "@emotion/react";
import { CardMedia } from "../Cards/CardMedia/component";
import Banner from "../Banner";
import { defaultBanners } from "@/data/defaultBanners";
import React from "react";
import useFetch from "@/hooks/useFetch/hook";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { SelectionProvider } from "@/providers/selectionProvider";
import { SelectableItem } from "@/providers/selectableItem";
import { Media } from "@/interfaces/Media";
import { AlertMessage } from "../Alert/component";

export default function DashboardComponent() {
  const [request, , data] = useFetch<Array<Media>>();
  const { user, isAuthenticated, insight, isLoadingInsight } = useUser();

  const router = useRouter();

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

  const fakeGrid = (type: string) => {
    return (
      <SelectionProvider>
        {data ? (
          <Box columnCount={{ base: 1, sm: 2, md: 3, lg: 4 }} columnGap="12px">
            {data
              ?.filter((media) => media.tipo === type)
              ?.map((image, index) => (
                <Box
                  key={index}
                  mb="12px"
                  breakInside="avoid"
                  position="relative"
                  borderRadius="14px"
                  overflow="hidden"
                  cursor="pointer"
                  role="group"
                  transition="all 0.3s ease"
                  _hover={{ transform: "translateY(-4px)" }}
                  onClick={() =>
                    isAuthenticated && user.status_acesso === true
                      ? type === "IMAGEM"
                        ? router.push(`/fotos/`)
                        : router.push(`/videos/${image.uuid}/`)
                      : router.push("/planos")
                  }
                >
                  <Box position="relative" w="100%">
                    <SelectableItem key={index} id={image.uuid}>
                      <Image
                        src={image.url_thumb}
                        alt={image.titulo ?? "Foto"}
                        width={800}
                        height={1200}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          filter: !user.status_acesso ? "blur(20px)" : "none",
                          transform: "scale(1.05)",
                          transition: "transform 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.1)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                      />
                    </SelectableItem>

                    <Box
                      position="absolute"
                      inset={0}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg={
                        !user.status_acesso
                          ? "rgba(0,0,0,0.6)"
                          : "rgba(0,0,0,0.25)"
                      }
                      transition="background 0.3s"
                    >
                      {!user.status_acesso && (
                        <Icon as={FiLock} boxSize="34px" color="white" />
                      )}
                    </Box>

                    {image.titulo && (
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        px={4}
                        py={3}
                        bgGradient="linear(to-t, rgba(0,0,0,0.85), transparent)"
                      >
                        <Text
                          color="white"
                          fontSize="14px"
                          fontWeight="semibold"
                          lineClamp={2}
                          lineHeight="1.3"
                        >
                          {image.titulo}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
          </Box>
        ) : (
          <Stack>
            <AlertMessage
              bg={"transparent"}
              status="info"
              title="Indisponível"
              message="Nenhum conteúdo disponível."
            />
          </Stack>
        )}
      </SelectionProvider>
    );
  };

  React.useEffect(() => {
    request("/api/media", {
      method: "GET",
    });
  }, []);

  return (
    <Stack align={"center"}>
      <Banner data={defaultBanners} />

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
        {isLoadingInsight ? (
          <Center
            bg={"white"}
            zIndex={20}
            w={"full"}
            maxW={450}
            borderRadius={"16px"}
            p={{ base: 6, md: 8 }}
            gap={8}
            boxShadow={"0 10px 25px rgba(0,0,0,0.08)"}
          >
            <Spinner size="xl" alignSelf="center" color={"#FF0080"} />
          </Center>
        ) : (
          <SimpleGrid
            zIndex={10}
            gap={{ base: 2, md: 4 }}
            columns={{ base: 2, md: 1, lg: 2 }}
          >
            <CardMedia icon={FaRegImage} info={insight?.fotos || 0} />
            <CardMedia icon={MdOndemandVideo} info={insight?.videos || 0} />
            <GridItem colSpan={{ base: 2, md: 1, lg: 2 }}>
              <CardMedia icon={FaUser} info={insight?.assinantes || 0} />
            </GridItem>
          </SimpleGrid>
        )}
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
          <Tabs.Content value="fotos">{fakeGrid("IMAGEM")}</Tabs.Content>
          <Tabs.Content value="videos">{fakeGrid("VIDEO")}</Tabs.Content>
        </Tabs.Root>
      </Stack>
    </Stack>
  );
}
