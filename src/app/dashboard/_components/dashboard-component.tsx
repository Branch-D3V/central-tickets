"use client";

import {
  HStack,
  Link,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FaRegCircleCheck,
  FaRegClock,
  FiZap,
  TiTicket,
} from "@/components/Icons";
import { CardInfo } from "@/components/Cards/Info";
import { CardTicket } from "@/components/Cards/Tickets/component";
import useDashboardInsights from "@/hooks/useDashboardInsights/hook";
import useTickets from "@/hooks/useTickets/hook";
import React from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";

export default function DashboardComponent() {
  const router = useRouter();
  const {
    fetchInsights,
    data: insights,
    isLoading: isLoadingInsights,
  } = useDashboardInsights();
  const { list, listTickets, isLoadingList } = useTickets();

  React.useEffect(() => {
    fetchInsights().catch(({ message }) => {
      toaster.create({ description: message, type: "error", closable: true });
    });
    listTickets({ per_page: 5 }).catch(({ message }) => {
      toaster.create({ description: message, type: "error", closable: true });
    });
  }, []);

  const total = insights?.total ?? 0;
  const open = insights?.open ?? 0;
  const inProgress = insights?.in_progress ?? 0;
  const closed = insights?.closed ?? 0;

  return (
    <Stack w={"full"} h={"full"} gap={6}>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 2, md: 4 }}>
        <CardInfo
          title="Total"
          color={"#3B82F6"}
          value={isLoadingInsights ? "—" : String(total)}
          iconBg="#E0F2FE"
          icon={<TiTicket size={22} />}
          description="Tickets criados"
        />
        <CardInfo
          title="Abertos"
          value={isLoadingInsights ? "—" : String(open)}
          iconBg="#FBFAC1"
          color={"#B68B2C"}
          icon={<FaRegClock size={22} />}
          description="Aguardando resposta"
        />
        <CardInfo
          title="Em andamento"
          value={isLoadingInsights ? "—" : String(inProgress)}
          iconBg="#F4E7FF"
          color={"#9634E6"}
          icon={<FiZap size={22} />}
          description="Sendo tratados"
        />
        <CardInfo
          title="Resolvidos"
          value={isLoadingInsights ? "—" : String(closed)}
          iconBg="#D4FFE0"
          color={"#22A273"}
          icon={<FaRegCircleCheck size={22} />}
          description="Concluídos"
        />
      </SimpleGrid>
      <Stack border="1px solid #D9D9D9" borderRadius="20px" gap={0}>
        <HStack
          borderBottom="1px solid #D9D9D9"
          px={{ base: 4, md: 6 }}
          justifyContent={"space-between"}
        >
          <Text fontWeight={600} fontSize="16px" py="16px">
            Tickets Recentes
          </Text>
          <Link
            href="/tickets"
            fontWeight={500}
            fontSize="14px"
            color="#3B82F6"
          >
            Ver todos
          </Link>
        </HStack>
        <Stack px={{ base: 2, md: 6 }} py={4} gap={3}>
          {isLoadingList && (
            <Stack align="center" py={6}>
              <Spinner size="md" color="#3B82F6" />
            </Stack>
          )}
          {!isLoadingList && list && list.length === 0 && (
            <Text textAlign="center" color="#847F83" py={6}>
              Nenhum ticket por aqui ainda.
            </Text>
          )}
          {!isLoadingList &&
            list &&
            list.length > 0 &&
            list
              .slice(0, 5)
              .map((ticket) => (
                <CardTicket
                  key={ticket.id}
                  ticket={ticket}
                  cursor="pointer"
                  _hover={{ borderColor: "#3B82F6" }}
                  onClick={() => router.push(`/tickets/${ticket.id}`)}
                />
              ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
