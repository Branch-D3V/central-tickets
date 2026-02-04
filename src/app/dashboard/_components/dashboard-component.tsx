import { Badge, HStack, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import {
  FaRegCircleCheck,
  FaRegClock,
  FiZap,
  TiTicket,
} from "@/components/Icons";
import { CardInfo } from "@/components/Cards/Info";
import { tickets } from "@/data/ticket";
import { CardTicket } from "@/components/Cards/Tickets/component";

export default function DashboardComponent() {
  return (
    <Stack w={"full"} h={"full"} gap={6}>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 2, md: 4 }}>
        <CardInfo
          title="Total"
          color={"#3B82F6"}
          value={"34"}
          iconBg="#E0F2FE"
          icon={<TiTicket size={22} />}
          description="Tickets criados"
        />
        <CardInfo
          title="Pendentes"
          value={"0"}
          iconBg="#FBFAC1"
          color={"#B68B2C"}
          icon={<FaRegClock size={22} />}
          description="Aguardando resposta"
        />
        <CardInfo
          title="Ativo"
          value={"0"}
          iconBg="#F4E7FF"
          color={"#9634E6"}
          icon={<FiZap size={22} />}
          description="Em andamento"
        />
        <CardInfo
          title="Resolvidos"
          value={"1"}
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
        <Stack px={{ base: 2, md: 6 }} py={4}>
          {tickets.map((ticket, index) => (
            <CardTicket key={index} ticket={ticket} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
