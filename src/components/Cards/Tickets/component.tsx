import { Badge, HStack, Stack, Text } from "@chakra-ui/react";
import { CardTicketProps } from "./interface";
import dayjs from "dayjs";
import { TicketPriority, TicketStatus, TicketType } from "@/interfaces/Ticket";

const STATUS_META: Record<
  TicketStatus,
  { label: string; colorPalette: string }
> = {
  open: { label: "Aberto", colorPalette: "blue" },
  in_progress: { label: "Em andamento", colorPalette: "purple" },
  waiting_operator: { label: "Aguardando operador", colorPalette: "yellow" },
  closed: { label: "Resolvido", colorPalette: "green" },
};

const PRIORITY_META: Record<
  TicketPriority,
  { label: string; colorPalette: string }
> = {
  high: { label: "Alta", colorPalette: "red" },
  medium: { label: "Média", colorPalette: "yellow" },
  low: { label: "Baixa", colorPalette: "green" },
};

const TYPE_META: Record<TicketType, string> = {
  technical: "Técnico",
  financial: "Financeiro",
  operational: "Operacional",
  improvement: "Melhoria",
};

export function CardTicket({ ticket, ...rest }: CardTicketProps) {
  const status = STATUS_META[ticket.status];
  const priority = PRIORITY_META[ticket.priority];

  return (
    <Stack
      p={{ base: 4, md: 6 }}
      w={"full"}
      border="1px solid #D9D9D9"
      borderRadius="15px"
      {...rest}
    >
      <HStack w={"full"} justifyContent="space-between">
        <HStack>
          <Text fontWeight={400} color={"#847F83"}>
            #TKT - {ticket.id}
          </Text>
          <Badge
            fontWeight={600}
            size={"md"}
            colorPalette={status.colorPalette}
          >
            {status.label}
          </Badge>
        </HStack>
        <Text fontWeight={400} color={"#847F83"}>
          {dayjs(ticket.created_at).format("DD/MM/YYYY - HH:mm")}
        </Text>
      </HStack>
      <Text fontWeight={600} fontSize="18px">
        {ticket.title}
      </Text>
      <Text fontWeight={400} color={"#555050"}>
        {ticket.description}
      </Text>
      <HStack>
        <Text fontWeight={600}>Tipo: {TYPE_META[ticket.type]}</Text> -
        <Text fontWeight={600} color={"#3B82F6"}>
          Prioridade:{" "}
          <Badge
            fontWeight={600}
            size={"sm"}
            colorPalette={priority.colorPalette}
            textTransform={"uppercase"}
          >
            {priority.label}
          </Badge>
        </Text>
      </HStack>
    </Stack>
  );
}
