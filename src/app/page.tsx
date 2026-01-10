"use client";

import AuthPage from "@/components/AuthPage/component";
import Banner from "@/components/Banner";
import { defaultBanners } from "@/data/defaultBanners";
import { Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Stack w={"full"} h={"full"} align={"center"} justify={"start"} pt={"80px"}>
      <Banner data={defaultBanners} />
      <AuthPage />
    </Stack>
  );
}
