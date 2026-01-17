"use client";

import { thumbnailsVideos } from "@/data/thumbnails";
import {
  Box,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  Image,
  Pagination,
  Portal,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FiLock,
  FiX,
  IoAlertCircleOutline,
  FiChevronLeft,
  FiChevronRight,
} from "@/components/Icons";
import React from "react";
import { FiPlay } from "react-icons/fi";
import UploadVideoModal from "../Modals/UploadVideoModal/component";
import { useUser } from "@/contexts/UserContext";
import useFetch from "@/hooks/useFetch/hook";
import { Media } from "@/interfaces/Media";
import { AlertMessage } from "../Alert/component";
import { getTokenClient } from "@/server/getToken";
import { useRouter } from "next/navigation";
import { SelectionProvider } from "@/providers/selectionProvider";
import { SelectableItem } from "@/providers/selectableItem";

export default function VideosComponent() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [request, isLoading, data, pagination] = useFetch<Array<Media>>();
  const { isAuthenticated, user } = useUser();
  const route = useRouter();
  const token = getTokenClient();

  const handleRequestVideos = (page = 1) => {
    request("/api/media/", {
      method: "GET",
      params: { tipo: "VIDEO", page, page_size: 20 },
      headers: { Authorization: token || "" },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleRequestVideos(page);
  };

  const videos = Array.from({ length: 10 }).map(
    (_, i) => thumbnailsVideos[i % thumbnailsVideos.length],
  );

  const haveProcess = data && data?.some((video) => video.status !== "PRONTO");

  React.useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i! + 1) % videos.length);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i! - 1 + videos.length) % videos.length);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  React.useEffect(() => {
    handleRequestVideos();
  }, []);

  return (
    <Stack w={"full"} h={"full"}>
      <HStack justifyContent="space-between" w={"full"}>
        <Text fontSize="38px" zIndex={10}>
          Videos
        </Text>
        {isAuthenticated && user?.tipo_usuario === "administrador" && (
          <UploadVideoModal onSuccess={() => handleRequestVideos()} />
        )}
      </HStack>
      {user.tipo_usuario == "administrador" && haveProcess && (
        <HStack w={"full"} zIndex={10} color={"#FF0080"}>
          <IoAlertCircleOutline />
          Ao fazer uploads simultâneos, o processamento poderá demorar mais.
        </HStack>
      )}
      {!isLoading ? (
        !!data?.length ? (
          <SelectionProvider>
            <Box
              zIndex={9999}
              columnCount={{ base: 1, sm: 2, md: 3 }}
              columnGap="12px"
            >
              {data?.map((video, index) =>
                video.status == "PRONTO" ? (
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
                      user.status_acesso
                        ? route.push(`/videos/${video.uuid}`)
                        : route.push("/planos")
                    }
                  >
                    <Box
                      w="100%"
                      aspectRatio="16 / 9"
                      bg="black"
                      position="relative"
                    >
                      <SelectableItem key={video.uuid} id={video.uuid}>
                        <Image
                          src={video.url_thumb}
                          alt={video.titulo}
                          w="100%"
                          h="100%"
                          objectFit="contain"
                          filter={!user.status_acesso ? "blur(10px)" : "none"}
                          transform="scale(1.05)"
                          transition="transform 0.3s ease"
                          _groupHover={{ transform: "scale(1.1)" }}
                        />
                      </SelectableItem>

                      <Box
                        position="absolute"
                        inset={0}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={3}
                        bg={
                          !user.status_acesso
                            ? "rgba(0,0,0,0.6)"
                            : "rgba(0,0,0,0.25)"
                        }
                        transition="background 0.3s"
                      >
                        {!user.status_acesso ? (
                          <Icon as={FiLock} boxSize="28px" color="white" />
                        ) : (
                          <Icon
                            as={FiPlay}
                            boxSize="44px"
                            color="white"
                            opacity={0.9}
                            _groupHover={{ transform: "scale(1.1)" }}
                            transition="transform 0.2s"
                          />
                        )}
                      </Box>

                      {video.eh_premium && (
                        <Box
                          position="absolute"
                          top="10px"
                          left="10px"
                          bg="rgba(0,0,0,0.7)"
                          px={2}
                          py={1}
                          borderRadius="6px"
                          fontSize="11px"
                          fontWeight="bold"
                          color="white"
                        >
                          PREMIUM
                        </Box>
                      )}
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
                          lineHeight="1.3"
                          lineClamp={2}
                        >
                          {video.titulo}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ) : user.tipo_usuario === "administrador" ? (
                  <Box
                    key={index}
                    mb="12px"
                    breakInside="avoid"
                    position="relative"
                    borderRadius="14px"
                    overflow="hidden"
                    cursor="not-allowed"
                  >
                    <Box
                      w="100%"
                      aspectRatio="16 / 9"
                      bg="black"
                      position="relative"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      gap={3}
                    >
                      <Text color="white" fontSize="16px" fontWeight="bold">
                        Processando
                      </Text>
                      <Spinner size="lg" color="white" />
                    </Box>
                  </Box>
                ) : null,
              )}
            </Box>
            {pagination?.total_pages > 1 && (
              <Stack my={8} align="center">
                <Pagination.Root
                  count={pagination.total_pages}
                  pageSize={1}
                  page={currentPage}
                  onPageChange={(e) => handlePageChange(e.page)}
                >
                  <ButtonGroup variant="ghost" size="md">
                    <Pagination.PrevTrigger asChild>
                      <IconButton
                        aria-label="Anterior"
                        color={"#FF0080"}
                        _hover={{
                          bg: "#FF0080",
                          color: "white",
                        }}
                      >
                        <FiChevronLeft />
                      </IconButton>
                    </Pagination.PrevTrigger>

                    <Pagination.Items
                      render={(page) => (
                        <IconButton
                          key={page.value}
                          color={
                            page.value === currentPage ? "white" : "#FF0080"
                          }
                          bg={
                            page.value === currentPage
                              ? "#FF0080"
                              : "transparent"
                          }
                          _hover={{
                            bg: "#FF0080",
                            color: "white",
                          }}
                        >
                          {page.value}
                        </IconButton>
                      )}
                    />

                    <Pagination.NextTrigger asChild>
                      <IconButton
                        aria-label="Próxima"
                        color={"#FF0080"}
                        _hover={{
                          bg: "#FF0080",
                          color: "white",
                        }}
                      >
                        <FiChevronRight />
                      </IconButton>
                    </Pagination.NextTrigger>
                  </ButtonGroup>
                </Pagination.Root>
              </Stack>
            )}
          </SelectionProvider>
        ) : (
          <Stack
            zIndex={20}
            w={"full"}
            alignItems="center"
            justifyContent="center"
            h={"full"}
          >
            <AlertMessage
              color={"#000000"}
              bg={"transparent"}
              maxW={"300px"}
              status="info"
              title="Nenhum vídeo encontrado."
              message="Não há vídeos para exibir no momento."
            />
          </Stack>
        )
      ) : (
        <Stack
          w={"full"}
          alignItems="center"
          justifyContent="center"
          h={"full"}
        >
          <Spinner size="xl" color="#FF0080" />
        </Stack>
      )}

      {activeIndex !== null && (
        <Portal>
          <Box
            position="fixed"
            inset={0}
            bg="rgba(0,0,0,0.95)"
            zIndex={3000}
            display="flex"
            alignItems="center"
            justifyContent="center"
            userSelect="none"
            onContextMenu={(e) => e.preventDefault()}
          >
            <IconButton
              aria-label="close"
              position="absolute"
              top="20px"
              right="20px"
              color="white"
              variant="ghost"
              fontSize="28px"
              onClick={() => setActiveIndex(null)}
            >
              <FiX />
            </IconButton>

            <Box position="relative" maxW="90vw" w="900px">
              <video
                src={videos[activeIndex].src}
                controls
                autoPlay
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  width: "100%",
                  height: "auto",
                  minHeight: "400px",
                  borderRadius: "12px",
                }}
              />

              <Box
                position="absolute"
                inset={0}
                zIndex={10}
                onContextMenu={(e) => e.preventDefault()}
              />
            </Box>
          </Box>
        </Portal>
      )}
    </Stack>
  );
}
