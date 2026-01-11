"use client";

import { thumbnailsPictures } from "@/data/thumbnails";
import { Box, Icon, IconButton, Portal } from "@chakra-ui/react";
import { FiLock, FiChevronLeft, FiChevronRight, FiX } from "@/components/Icons";
import Image from "next/image";
import React from "react";

export default function PicturesComponent() {
  const images = Array.from({ length: 10 }).map(
    (_, i) => thumbnailsPictures[i % thumbnailsPictures.length]
  );

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const close = () => setActiveIndex(null);

  const next = () =>
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );

  const prev = () =>
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );

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

  return (
    <>
      <Box columnCount={{ base: 1, sm: 2, md: 3, lg: 4 }} columnGap="12px">
        {images.map((src, index) => (
          <Box
            key={index}
            mb="12px"
            breakInside="avoid"
            position="relative"
            borderRadius="12px"
            overflow="hidden"
            cursor="pointer"
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={src}
              alt=""
              width={800}
              height={1200}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                filter: "blur(12px)",
                transform: "scale(1.1)",
              }}
            />

            <Box
              position="absolute"
              inset={0}
              bg="rgba(0,0,0,0.45)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FiLock} boxSize="40px" color="white" />
            </Box>
          </Box>
        ))}
      </Box>

      {activeIndex !== null && (
        <Portal>
          <Box
            position="fixed"
            inset={0}
            bg="rgba(0,0,0,0.9)"
            zIndex={2000}
            display="flex"
            alignItems="center"
            justifyContent="center"
            userSelect="none"
            onContextMenu={(e) => e.preventDefault()}
            style={{
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
            }}
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

            <Box position="relative" maxW="90vw" maxH="90vh">
              <Image
                src={images[activeIndex]}
                alt=""
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

              <Box
                position="absolute"
                inset={0}
                zIndex={10}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                cursor="default"
              />
            </Box>
          </Box>
        </Portal>
      )}
    </>
  );
}
