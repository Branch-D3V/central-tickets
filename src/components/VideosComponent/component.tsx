"use client";

import { thumbnailsVideos } from "@/data/thumbnails";
import { Box, Icon, IconButton, Portal } from "@chakra-ui/react";
import { FiLock, FiX } from "@/components/Icons";
import Image from "next/image";
import React from "react";
import { FiPlay } from "react-icons/fi";

export default function VideosComponent() {
  const videos = Array.from({ length: 10 }).map(
    (_, i) => thumbnailsVideos[i % thumbnailsVideos.length]
  );

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

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

  return (
    <>
      <Box columnCount={{ base: 1, sm: 2, md: 3, lg: 4 }} columnGap="12px">
        {videos.map((video, index) => (
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
              src={video.thumb}
              alt=""
              width={800}
              height={500}
              draggable={false}
              style={{
                width: "100%",
                height: "auto",
                filter: "blur(10px)",
                transform: "scale(1.1)",
              }}
            />

            <Box
              position="absolute"
              inset={0}
              bg="rgba(0,0,0,0.5)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
            >
              <Icon as={FiLock} boxSize="32px" color="white" />
              <Icon as={FiPlay} boxSize="40px" color="white" />
            </Box>
          </Box>
        ))}
      </Box>

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
    </>
  );
}
