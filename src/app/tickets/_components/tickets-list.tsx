"use client";

import {
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CardTicket } from "@/components/Cards/Tickets/component";
import useTickets, { ListTicketsParams } from "@/hooks/useTickets/hook";
import React from "react";
import Select from "@/components/FormControl/Select";
import Input from "@/components/FormControl/Input";
import { FaPlus, TiTicket } from "@/components/Icons";
import ButtonAction from "@/components/Buttons/Action";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";

const STATUS_OPTIONS = [
  { value: "open", label: "Aberto" },
  { value: "in_progress", label: "Em andamento" },
  { value: "waiting_operator", label: "Aguardando operador" },
  { value: "closed", label: "Resolvido" },
];

const PRIORITY_OPTIONS = [
  { value: "high", label: "Alta" },
  { value: "medium", label: "Média" },
  { value: "low", label: "Baixa" },
];

const TYPE_OPTIONS = [
  { value: "technical", label: "Técnico" },
  { value: "financial", label: "Financeiro" },
  { value: "operational", label: "Operacional" },
  { value: "improvement", label: "Melhoria" },
];

export default function TicketsListComponent() {
  const { list, listTickets, isLoadingList } = useTickets();
  const router = useRouter();

  const [filters, setFilters] = React.useState<ListTicketsParams>({});

  const load = React.useCallback(
    (next: ListTicketsParams) => {
      listTickets(next).catch(({ message }) => {
        toaster.create({
          description: message,
          type: "error",
          closable: true,
        });
      });
    },
    [listTickets]
  );

  React.useEffect(() => {
    load(filters);
  }, [filters]);

  const handleFilter =
    (key: keyof ListTicketsParams) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFilters((prev) => ({ ...prev, [key]: value || undefined }));
    };

  return (
    <Stack gap={6} w="full">
      <HStack justify="space-between" wrap="wrap" gap={3}>
        <HStack>
          <TiTicket size={26} color="#3B82F6" />
          <Text fontSize="22px" fontWeight={700}>
            Tickets
          </Text>
        </HStack>
        <ButtonAction
          variant="plain"
          bg="#3B82F6"
          color="white"
          borderRadius="full"
          fontSize="14px"
          _hover={{ bg: "#2563EB" }}
          onClick={() => router.push("/novo-ticket")}
          rightIcon={<FaPlus />}
        >
          Novo ticket
        </ButtonAction>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 4 }} gap={3}>
        <Input
          placeholder="Buscar"
          value={filters.search ?? ""}
          onChange={handleFilter("search")}
        />
        <Select
          placeholder="Status"
          options={STATUS_OPTIONS}
          value={filters.status ?? ""}
          onChange={handleFilter("status")}
        />
        <Select
          placeholder="Prioridade"
          options={PRIORITY_OPTIONS}
          value={filters.priority ?? ""}
          onChange={handleFilter("priority")}
        />
        <Select
          placeholder="Tipo"
          options={TYPE_OPTIONS}
          value={filters.type ?? ""}
          onChange={handleFilter("type")}
        />
      </SimpleGrid>

      {isLoadingList && (
        <Stack align="center" py={10}>
          <Spinner size="lg" color="#3B82F6" />
        </Stack>
      )}

      {!isLoadingList && list && list.length === 0 && (
        <Stack
          align="center"
          justify="center"
          border="1px dashed #D9D9D9"
          borderRadius="20px"
          py={16}
          color="#847F83"
        >
          <Text fontWeight={600}>Nenhum ticket encontrado.</Text>
          <Text fontSize="14px">Ajuste os filtros ou crie um novo.</Text>
        </Stack>
      )}

      {!isLoadingList && list && list.length > 0 && (
        <Stack gap={3}>
          {list.map((ticket) => (
            <CardTicket
              key={ticket.id}
              ticket={ticket}
              cursor="pointer"
              _hover={{ borderColor: "#3B82F6" }}
              onClick={() => router.push(`/tickets/${ticket.id}`)}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
