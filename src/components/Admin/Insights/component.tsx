"use client";

import { Stack, Text, Separator, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useUser } from "@/contexts/UserContext";
import React from "react";
import { redirect } from "next/navigation";
import InsightCard from "@/components/Cards/Insight";
import {
  FaRegImage,
  FaUser,
  MdOndemandVideo,
  MdWorkspacePremium,
} from "@/components/Icons";

export default function Insights() {
  const { user, isAuthenticated, isLoadingPages, insight, isLoadingInsight } =
    useUser();

  React.useEffect(() => {
    if (
      isLoadingPages &&
      !isAuthenticated &&
      user.tipo_usuario !== "administrador"
    ) {
      redirect("/");
    }
  }, [isAuthenticated, user]);

  if (isLoadingInsight) {
    return (
      <Stack>
        <Spinner size="lg" alignSelf="center" color={"#FF0080"} />
      </Stack>
    );
  }

  return (
    <Stack
      zIndex={20}
      w="full"
      maxW={450}
      bg="white"
      borderRadius="16px"
      p={{ base: 6, md: 8 }}
      gap={8}
      boxShadow="0 10px 25px rgba(0,0,0,0.08)"
    >
      <Text fontSize="24px" fontWeight="medium">
        Insights
      </Text>

      <Stack gap={4}>
        <Text fontSize="18px" fontWeight="medium">
          Mídias
        </Text>

        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
          <InsightCard
            key="fotos"
            icon={FaRegImage}
            label="Fotos"
            value={insight?.fotos || 0}
          />
          <InsightCard
            key="videos"
            icon={MdOndemandVideo}
            label="Vídeos"
            value={insight?.videos || 0}
          />
        </SimpleGrid>
      </Stack>

      <Separator borderColor="#FF0080" />

      <Stack gap={4}>
        <Text fontSize="18px" fontWeight="medium">
          Clientes
        </Text>

        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
          <InsightCard
            key="usuarios"
            label="Usuários"
            icon={FaUser}
            value={insight?.usuarios || 0}
          />
          <InsightCard
            key="assinantes"
            label="Assinantes"
            icon={MdWorkspacePremium}
            value={insight?.assinantes || 0}
          />
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
