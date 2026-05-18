"use client";

import { HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createTicketSchema,
  CreateTicketSchemaType,
} from "@/schemas/ticketSchema";
import useTickets from "@/hooks/useTickets/hook";
import Input from "@/components/FormControl/Input";
import Textarea from "@/components/FormControl/Textarea";
import Select from "@/components/FormControl/Select";
import ButtonAction from "@/components/Buttons/Action";
import { FaPlus, LuTicketPlus } from "@/components/Icons";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import {
  CreateTicketPayload,
  TicketPriority,
  TicketType,
} from "@/interfaces/Ticket";

const TYPE_OPTIONS = [
  { value: "technical", label: "Técnico" },
  { value: "financial", label: "Financeiro" },
  { value: "operational", label: "Operacional" },
  { value: "improvement", label: "Melhoria" },
];

const PRIORITY_OPTIONS = [
  { value: "high", label: "Alta" },
  { value: "medium", label: "Média" },
  { value: "low", label: "Baixa" },
];

export default function NewTicketComponent() {
  const router = useRouter();
  const { createTicket, isLoadingCreate } = useTickets();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTicketSchema),
  });

  const handleSubmitForm = async (data: CreateTicketSchemaType) => {
    const payload: CreateTicketPayload = {
      title: data.title,
      description: data.description,
      type: data.type as TicketType,
      priority: data.priority as TicketPriority,
      due_at: data.due_at || null,
    };

    await createTicket(payload)
      .then(() => {
        toaster.create({
          title: "Sucesso",
          description: "Ticket criado com sucesso!",
          type: "success",
        });
        router.push("/tickets");
      })
      .catch(({ message }) => {
        toaster.create({
          description: message,
          type: "error",
          closable: true,
        });
      });
  };

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit(handleSubmitForm)}
      gap={6}
      w="full"
      maxW="900px"
      mx="auto"
    >
      <HStack>
        <LuTicketPlus size={26} color="#3B82F6" />
        <Text fontSize="22px" fontWeight={700}>
          Novo ticket
        </Text>
      </HStack>

      <Stack
        gap={4}
        bg="white"
        border="1px solid #D9D9D9"
        borderRadius="20px"
        p={{ base: 4, md: 8 }}
      >
        <Input
          label="Título"
          placeholder="Resumo do problema"
          required
          error={errors.title}
          {...register("title")}
        />
        <Textarea
          label="Descrição"
          placeholder="Detalhe o que está acontecendo, passos para reproduzir, etc."
          required
          error={errors.description}
          {...register("description")}
        />
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
          <Select
            label="Tipo"
            required
            placeholder="Selecione"
            options={TYPE_OPTIONS}
            error={errors.type}
            {...register("type")}
          />
          <Select
            label="Prioridade"
            required
            placeholder="Selecione"
            options={PRIORITY_OPTIONS}
            error={errors.priority}
            {...register("priority")}
          />
          <Input
            label="Prazo (opcional)"
            type="datetime-local"
            error={errors.due_at}
            {...register("due_at")}
          />
        </SimpleGrid>
      </Stack>

      <HStack justify="flex-end" gap={3}>
        <ButtonAction
          variant="outline"
          borderRadius="full"
          borderColor="#D9D9D9"
          color="#555050"
          onClick={() => router.back()}
          type="button"
        >
          Cancelar
        </ButtonAction>
        <ButtonAction
          type="submit"
          variant="plain"
          borderRadius="full"
          bg="#3B82F6"
          color="white"
          loading={isLoadingCreate}
          _hover={{ bg: "#2563EB" }}
          rightIcon={<FaPlus />}
        >
          Criar ticket
        </ButtonAction>
      </HStack>
    </Stack>
  );
}
