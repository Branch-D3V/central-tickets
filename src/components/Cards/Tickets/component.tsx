import { Badge, HStack, Stack, Text } from "@chakra-ui/react";
import { CardTicketProps } from "./interface";
import dayjs from "dayjs";

export function CardTicket({ ticket, ...rest }: CardTicketProps) {
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
            colorPalette={ticket.status === "resolvido" ? "green" : "yellow"}
          >
            {ticket.status}
          </Badge>
        </HStack>
        <Text fontWeight={400} color={"#847F83"}>
          {dayjs(ticket.created_at).format("DD/MM/YYYY - HH:mm")}
        </Text>
      </HStack>
      <Text fontWeight={600} fontSize="18px">
        {ticket.name}
      </Text>
      <Text fontWeight={400} color={"#555050"}>
        {ticket.description}
      </Text>
      <HStack>
        <Text fontWeight={600}>Tipo: {ticket.type}</Text> -
        <Text fontWeight={600} color={"#3B82F6"}>
          Prioridade:{" "}
          <Badge
            fontWeight={600}
            size={"sm"}
            colorPalette={
              ticket.priority === "alta"
                ? "red"
                : ticket.priority === "média"
                  ? "yellow"
                  : "green"
            }
            textTransform={"uppercase"}
          >
            {ticket.priority}
          </Badge>
        </Text>
      </HStack>
    </Stack>
  );
}
