"use client";

import DashboardPage from "@/components/Dashboard/component";
import Banner from "@/components/Banner";
import { defaultBanners } from "@/data/defaultBanners";
import { Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Stack w={"full"} h={"full"} align={"center"} justify={"start"} pt={"80px"}>
      <Banner data={defaultBanners} />
      <DashboardPage />
    </Stack>
  );
}
