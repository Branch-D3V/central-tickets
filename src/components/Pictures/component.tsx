"use client";

import { thumbnailsPictures } from "@/data/thumbnails";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Portal,
  Stack,
  Text,
  Image,
  Spinner,
  Pagination,
  ButtonGroup,
} from "@chakra-ui/react";
import { FiLock, FiChevronLeft, FiChevronRight, FiX } from "@/components/Icons";

import React from "react";
import UploadImageModal from "../Modals/UploadImageModal";
import { useUser } from "@/contexts/UserContext";
import useFetch from "@/hooks/useFetch/hook";
import { Media } from "@/interfaces/Media";
import { AlertMessage } from "../Alert/component";
import { SelectionProvider } from "@/providers/selectionProvider";
import { SelectableItem } from "@/providers/selectableItem";
import { useRouter } from "next/navigation";

export default function PicturesComponent() {
  const [request, isLoading, data, pagination] = useFetch<Array<Media>>();
  const { isAuthenticated, user } = useUser();
  const route = useRouter();

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const close = () => setActiveIndex(null);

  const next = () =>
    setActiveIndex((prev) => {
      if (prev === null || !data?.length) return prev;
      return (prev + 1) % data.length;
    });

  const prev = () =>
    setActiveIndex((prev) => {
      if (prev === null || !data?.length) return prev;
      return (prev - 1 + data.length) % data.length;
    });

  const handleFetchImages = (page = 1) => {
    request("/api/media/", {
      method: "GET",
      params: {
        tipo: "IMAGEM",
        page,
        page_size: 40,
      },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleFetchImages(page);
  };

  React.useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  React.useEffect(() => {
    handleFetchImages(1);
  }, []);

  return (
    <Stack w={"full"} h={"full"}>
      <HStack justifyContent="space-between" w={"full"}>
        <Text fontSize="38px" zIndex={10}>
          Fotos
        </Text>
        {isAuthenticated && user?.tipo_usuario === "administrador" && (
          <UploadImageModal onSuccess={handleFetchImages} />
        )}
      </HStack>
      {!isLoading ? (
        !!data?.length ? (
          <SelectionProvider>
            <Box
              columnCount={{ base: 1, sm: 2, md: 3, lg: 4 }}
              columnGap="12px"
            >
              {data?.map((image, index) => (
                <Box
                  key={image.uuid}
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
                      ? setActiveIndex(index)
                      : route.push("/planos")
                  }
                >
                  <Box position="relative" w="100%">
                    <SelectableItem key={image.uuid} id={image.uuid}>
                      <Image
                        src={image.url_thumb}
                        alt={image.titulo ?? "Foto"}
                        width={800}
                        height={1200}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          filter: !user.status_acesso ? "blur(12px)" : "none",
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
              title="Nenhuma foto encontrada."
              message="Não há fotos para exibir no momento."
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

      {activeIndex !== null && data && (
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
              onClick={close}
              zIndex={20}
            >
              <FiX />
            </IconButton>

            <IconButton
              aria-label="prev"
              position="absolute"
              left="20px"
              color="white"
              variant="ghost"
              fontSize="40px"
              onClick={prev}
              zIndex={20}
            >
              <FiChevronLeft />
            </IconButton>

            {/* Next */}
            <IconButton
              aria-label="next"
              position="absolute"
              right="20px"
              color="white"
              variant="ghost"
              fontSize="40px"
              onClick={next}
              zIndex={20}
            >
              <FiChevronRight />
            </IconButton>

            {/* Imagem */}
            <Box position="relative" maxW="90vw" maxH="90vh">
              <Image
                src={data[activeIndex].url_thumb}
                alt={data[activeIndex].titulo ?? "Foto"}
                width={1600}
                height={1600}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  maxWidth: "100%",
                  maxHeight: "90vh",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />

              {/* Anti-capture overlay */}
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
