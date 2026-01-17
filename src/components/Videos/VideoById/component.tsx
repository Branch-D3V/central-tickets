"use client";

import React from "react";
import useFetch from "@/hooks/useFetch/hook";
import { Media } from "@/interfaces/Media";
import {
  Box,
  Spinner,
  Stack,
  Text,
  Image,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

interface VideoByIdComponentProps {
  uuid?: string;
}

export default function VideoById({ uuid }: VideoByIdComponentProps) {
  const [requestById, isLoadingById, dataById] = useFetch<Media>();
  const [request, isLoading, data] = useFetch<Array<Media>>();
  const { isAuthenticated, isLoadingPages } = useUser();

  const router = useRouter();

  React.useEffect(() => {
    if (!uuid) return;

    requestById("/api/media/id", {
      method: "GET",
      headers: {
        "X-MEDIA-UUID": uuid,
      },
    });

    request("/api/media", {
      method: "GET",
      params: {
        tipo: "VIDEO",
      },
    });
  }, [uuid]);

  React.useEffect(() => {
    if (isLoadingPages && !isAuthenticated && !isLoadingPages) {
      redirect("/login");
    }
  }, [isAuthenticated, isLoadingPages]);

  if (isLoadingById) {
    return (
      <Stack w="full" h="60vh" align="center" justify="center">
        <Spinner size="xl" />
        <Text color="gray.500">Carregando vídeo...</Text>
      </Stack>
    );
  }

  if (!dataById) {
    return (
      <Stack w="full" h="60vh" align="center" justify="center">
        <Text color="gray.500">Vídeo não encontrado</Text>
      </Stack>
    );
  }

  return (
    <Stack w="full" px={2} gap={6} zIndex={20}>
      <Stack align="flex-start" gap={6} w="full">
        <Stack maxW={"1250px"} w="full" flex={3} gap={4}>
          <Box
            w="full"
            bg="black"
            borderRadius="12px"
            overflow="hidden"
            aspectRatio="16 / 9"
          >
            <video
              src={dataById.url_player}
              controls
              autoPlay
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>

          <Stack gap={2}>
            <Text fontSize="24px" fontWeight="bold">
              {dataById.titulo}
            </Text>

            {dataById.des && (
              <Text color="gray.600" fontSize="16px">
                {dataById.des}
              </Text>
            )}

            {dataById.eh_premium && (
              <Text color="pink.500" fontWeight="semibold" fontSize="14px">
                Conteúdo exclusivo para assinantes
              </Text>
            )}
          </Stack>
        </Stack>

        <SimpleGrid
          columns={{ base: 2, md: 4, lg: 5, xl: 6 }}
          w={{ base: "full" }}
          gap={4}
          minW={"260px"}
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <Box key={i} w="full">
                  <Center
                    bg={"gray.400"}
                    maxW="300px"
                    w="full"
                    aspectRatio="16 / 9"
                    borderRadius="10px"
                    overflow="hidden"
                  >
                    <Spinner size="xl" />
                  </Center>
                </Box>
              ))
            : data
                ?.filter((video) => video.uuid !== uuid)
                .map((video, index) => (
                  <Box
                    onClick={() => router.push(`/videos/${video.uuid}`)}
                    key={index}
                    cursor="pointer"
                    _hover={{ opacity: 0.85 }}
                  >
                    <Box
                      maxW="300px"
                      w="full"
                      aspectRatio="16 / 9"
                      borderRadius="10px"
                      overflow="hidden"
                      bg="gray.200"
                    >
                      <Image
                        src={video.url_thumb}
                        alt={video.titulo}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                    <Text
                      mt={2}
                      fontSize="14px"
                      fontWeight="semibold"
                      lineHeight="1.3"
                      lineClamp={2}
                    >
                      {video.titulo}
                    </Text>
                  </Box>
                ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
