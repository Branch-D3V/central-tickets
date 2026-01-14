"use client";
import { Box, Skeleton, useBreakpointValue } from "@chakra-ui/react";
import type { Banner as BannerProps } from "./interface";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

export function Banner({
  data = [],
  loading = false,
  height,
  ...rest
}: BannerProps) {
  const defaultHeight = useBreakpointValue({
    base: "220px",
    sm: "280px",
    md: "373px",
    lg: "550px",
  });

  return (
    <Skeleton
      loading={loading === true}
      minH={loading ? "64" : "none"}
      w={"full"}
      maxW={"1200px"}
    >
      <Box overflow="hidden" h={height ?? defaultHeight} w="full">
        <Box
          position="relative"
          overflow="hidden"
          w="full"
          h={height ?? defaultHeight}
        >
          <ReactCarousel
            autoPlay={true}
            infiniteLoop
            interval={4000}
            showArrows={true}
            showStatus={false}
            verticalSwipe="natural"
            showIndicators={true}
            showThumbs={false}
          >
            {data.map((item, index) => (
              <Box
                key={index}
                w="full"
                h={height ?? defaultHeight}
                position="relative"
                {...rest}
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                )}
              </Box>
            ))}
          </ReactCarousel>
        </Box>
      </Box>
    </Skeleton>
  );
}
