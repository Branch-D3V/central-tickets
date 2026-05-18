"use client";

import {
  Badge,
  Box,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import useTickets from "@/hooks/useTickets/hook";
import { useUser } from "@/contexts/UserContext";
import React from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  sendMessageSchema,
  SendMessageSchemaType,
} from "@/schemas/messageSchema";
import Textarea from "@/components/FormControl/Textarea";
import Select from "@/components/FormControl/Select";
import Input from "@/components/FormControl/Input";
import ButtonAction from "@/components/Buttons/Action";
import {
  FiChevronLeft,
  HiOutlineTicket,
  IoMdLogIn,
} from "@/components/Icons";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import {
  Ticket,
  TicketActivity,
  TicketMessage,
  TicketPriority,
  TicketStatus,
  UpdateTicketPayload,
} from "@/interfaces/Ticket";

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

const TYPE_LABEL: Record<string, string> = {
  technical: "Técnico",
  financial: "Financeiro",
  operational: "Operacional",
  improvement: "Melhoria",
};

const STATUS_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  open: ["in_progress", "closed"],
  in_progress: ["waiting_operator", "closed"],
  waiting_operator: ["in_progress", "closed"],
  closed: ["open"],
};

const PRIORITY_OPTIONS = (
  ["high", "medium", "low"] as TicketPriority[]
).map((p) => ({ value: p, label: PRIORITY_META[p].label }));

interface TicketDetailProps {
  id: string;
}

export default function TicketDetailComponent({ id }: TicketDetailProps) {
  const router = useRouter();
  const { user } = useUser();
  const {
    getTicket,
    updateTicket,
    sendMessage,
    detail,
    isLoadingDetail,
    isLoadingUpdate,
    isLoadingSendMessage,
  } = useTickets();

  const canManage = user.role === "support" || user.role === "admin";

  const load = React.useCallback(() => {
    getTicket(id).catch(({ message }) => {
      toaster.create({ description: message, type: "error", closable: true });
    });
  }, [getTicket, id]);

  React.useEffect(() => {
    load();
  }, [load]);

  if (isLoadingDetail && !detail) {
    return (
      <Stack align="center" py={20}>
        <Spinner size="lg" color="#3B82F6" />
      </Stack>
    );
  }

  if (!detail) {
    return (
      <Stack
        align="center"
        py={20}
        border="1px dashed #D9D9D9"
        borderRadius="20px"
      >
        <Text fontWeight={600}>Ticket não encontrado.</Text>
        <ButtonAction
          variant="plain"
          color="#3B82F6"
          onClick={() => router.push("/tickets")}
          leftIcon={<FiChevronLeft />}
        >
          Voltar para tickets
        </ButtonAction>
      </Stack>
    );
  }

  const ticket = detail;
  const status = STATUS_META[ticket.status];
  const priority = PRIORITY_META[ticket.priority];

  return (
    <Stack gap={4} w="full">
      <HStack gap={2}>
        <IconButton
          aria-label="Voltar"
          variant="plain"
          color="#3B82F6"
          onClick={() => router.push("/tickets")}
        >
          <FiChevronLeft />
        </IconButton>
        <Text color="#847F83" fontSize="14px">
          / Tickets / #{ticket.id}
        </Text>
      </HStack>

      <Stack
        border="1px solid #D9D9D9"
        borderRadius="20px"
        p={{ base: 4, md: 6 }}
        gap={3}
        bg="white"
      >
        <HStack justify="space-between" wrap="wrap" gap={2}>
          <HStack gap={3}>
            <Icon
              bg="#3B82F6"
              as={HiOutlineTicket}
              boxSize={10}
              p={2}
              borderRadius="10px"
              color="white"
            />
            <Stack gap={0}>
              <Text color="#847F83" fontSize="12px">
                #TKT-{ticket.id}
              </Text>
              <Text fontWeight={700} fontSize="20px">
                {ticket.title}
              </Text>
            </Stack>
          </HStack>
          <HStack>
            <Badge size="lg" colorPalette={status.colorPalette}>
              {status.label}
            </Badge>
            <Badge size="lg" colorPalette={priority.colorPalette}>
              {priority.label}
            </Badge>
          </HStack>
        </HStack>

        <Text color="#555050">{ticket.description}</Text>

        <HStack
          gap={6}
          wrap="wrap"
          color="#847F83"
          fontSize="13px"
          pt={2}
          borderTop="1px solid #F0F0F0"
        >
          <Text>
            <b>Tipo:</b> {TYPE_LABEL[ticket.type] ?? ticket.type}
          </Text>
          <Text>
            <b>Criado:</b>{" "}
            {dayjs(ticket.created_at).format("DD/MM/YYYY HH:mm")}
          </Text>
          {ticket.updated_at && (
            <Text>
              <b>Atualizado:</b>{" "}
              {dayjs(ticket.updated_at).format("DD/MM/YYYY HH:mm")}
            </Text>
          )}
          {ticket.due_at && (
            <Text>
              <b>Prazo:</b> {dayjs(ticket.due_at).format("DD/MM/YYYY HH:mm")}
            </Text>
          )}
        </HStack>

        {ticket.tags && ticket.tags.length > 0 && (
          <HStack wrap="wrap" gap={2}>
            {ticket.tags.map((tag) => (
              <Badge key={tag.id} variant="subtle" colorPalette="gray">
                {tag.name}
              </Badge>
            ))}
          </HStack>
        )}
      </Stack>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={4}>
        <GridItem>
          <Stack gap={4}>
            <MessagesSection
              messages={ticket.messages ?? []}
              canSeeInternal={canManage}
              onSend={async (payload) => {
                await sendMessage(id, payload)
                  .then(() => {
                    toaster.create({
                      description: "Mensagem enviada",
                      type: "success",
                    });
                    load();
                  })
                  .catch(({ message }) => {
                    toaster.create({
                      description: message,
                      type: "error",
                      closable: true,
                    });
                  });
              }}
              isSending={isLoadingSendMessage}
              canSendInternal={canManage}
            />

            <ActivitiesSection activities={ticket.activities ?? []} />
          </Stack>
        </GridItem>

        {canManage && (
          <GridItem>
            <ActionsPanel
              ticket={ticket}
              isLoading={isLoadingUpdate}
              onUpdate={async (payload) => {
                await updateTicket(id, payload)
                  .then(() => {
                    toaster.create({
                      description: "Ticket atualizado",
                      type: "success",
                    });
                    load();
                  })
                  .catch(({ message }) => {
                    toaster.create({
                      description: message,
                      type: "error",
                      closable: true,
                    });
                  });
              }}
            />
          </GridItem>
        )}
      </Grid>
    </Stack>
  );
}

function MessagesSection({
  messages,
  onSend,
  isSending,
  canSeeInternal,
  canSendInternal,
}: {
  messages: TicketMessage[];
  onSend: (payload: SendMessageSchemaType) => Promise<void>;
  isSending: boolean;
  canSeeInternal: boolean;
  canSendInternal: boolean;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sendMessageSchema),
    defaultValues: { body: "", internal: false },
  });

  const internal = watch("internal");

  const visible = canSeeInternal
    ? messages
    : messages.filter((m) => !m.internal);

  return (
    <Stack
      border="1px solid #D9D9D9"
      borderRadius="20px"
      bg="white"
      p={{ base: 4, md: 6 }}
      gap={4}
    >
      <Text fontWeight={600} fontSize="16px">
        Mensagens ({visible.length})
      </Text>

      <Stack gap={3} maxH="500px" overflowY="auto">
        {visible.length === 0 && (
          <Text color="#847F83" fontSize="14px">
            Nenhuma mensagem ainda.
          </Text>
        )}
        {visible.map((m) => (
          <Box
            key={m.id}
            border="1px solid"
            borderColor={m.internal ? "#FCD34D" : "#E5E7EB"}
            bg={m.internal ? "#FFFBEB" : "#F9FAFB"}
            borderRadius="12px"
            p={3}
          >
            <HStack justify="space-between">
              <HStack gap={2}>
                <Text fontWeight={600} fontSize="14px">
                  {m.author?.nome ?? "Usuário"}
                </Text>
                {m.author?.role && (
                  <Badge colorPalette="blue" size="sm">
                    {m.author.role}
                  </Badge>
                )}
                {m.internal && (
                  <Badge colorPalette="yellow" size="sm">
                    Interna
                  </Badge>
                )}
              </HStack>
              <Text color="#847F83" fontSize="12px">
                {dayjs(m.created_at).format("DD/MM/YYYY HH:mm")}
              </Text>
            </HStack>
            <Text mt={2} color="#1F2937" whiteSpace="pre-wrap">
              {m.body}
            </Text>
          </Box>
        ))}
      </Stack>

      <Stack
        as="form"
        onSubmit={handleSubmit(async (data) => {
          await onSend(data);
          reset({ body: "", internal: false });
        })}
        gap={3}
        borderTop="1px solid #F0F0F0"
        pt={3}
      >
        <Textarea
          placeholder="Escreva uma mensagem..."
          {...register("body")}
          error={errors.body}
        />
        <HStack justify="space-between" wrap="wrap" gap={2}>
          {canSendInternal && (
            <Checkbox.Root
              checked={!!internal}
              onCheckedChange={(e) => setValue("internal", !!e.checked)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>
                <Text fontSize="14px" color="#555050">
                  Mensagem interna
                </Text>
              </Checkbox.Label>
            </Checkbox.Root>
          )}
          <ButtonAction
            type="submit"
            variant="plain"
            bg="#3B82F6"
            color="white"
            borderRadius="full"
            loading={isSending}
            _hover={{ bg: "#2563EB" }}
            rightIcon={<IoMdLogIn />}
          >
            Enviar
          </ButtonAction>
        </HStack>
      </Stack>
    </Stack>
  );
}

function ActivitiesSection({ activities }: { activities: TicketActivity[] }) {
  if (!activities || activities.length === 0) return null;

  return (
    <Stack
      border="1px solid #D9D9D9"
      borderRadius="20px"
      bg="white"
      p={{ base: 4, md: 6 }}
      gap={3}
    >
      <Text fontWeight={600} fontSize="16px">
        Atividades
      </Text>
      <Stack gap={2}>
        {activities.map((a) => (
          <HStack
            key={a.id}
            gap={3}
            align="flex-start"
            borderLeft="2px solid #3B82F6"
            pl={3}
          >
            <Stack gap={0} flex={1}>
              <Text fontSize="14px" color="#1F2937">
                <b>{a.user?.nome ?? "Sistema"}</b> — {a.action}
              </Text>
              <Text fontSize="12px" color="#847F83">
                {dayjs(a.created_at).format("DD/MM/YYYY HH:mm")}
              </Text>
            </Stack>
          </HStack>
        ))}
      </Stack>
    </Stack>
  );
}

function ActionsPanel({
  ticket,
  onUpdate,
  isLoading,
}: {
  ticket: Ticket;
  onUpdate: (payload: UpdateTicketPayload) => Promise<void>;
  isLoading: boolean;
}) {
  const [status, setStatus] = React.useState<TicketStatus>(ticket.status);
  const [priority, setPriority] = React.useState<TicketPriority>(
    ticket.priority
  );
  const [justification, setJustification] = React.useState("");

  React.useEffect(() => {
    setStatus(ticket.status);
    setPriority(ticket.priority);
    setJustification("");
  }, [ticket.status, ticket.priority]);

  const transitions = STATUS_TRANSITIONS[ticket.status];
  const statusOptions = [
    { value: ticket.status, label: STATUS_META[ticket.status].label },
    ...transitions.map((s) => ({ value: s, label: STATUS_META[s].label })),
  ];

  const isReopening = ticket.status === "closed" && status === "open";
  const statusChanged = status !== ticket.status;
  const priorityChanged = priority !== ticket.priority;
  const canSubmit =
    (statusChanged || priorityChanged) &&
    (!isReopening || justification.trim().length > 0);

  const submit = async () => {
    if (!canSubmit) return;
    const payload: UpdateTicketPayload = {};
    if (statusChanged) payload.status = status;
    if (priorityChanged) payload.priority = priority;
    if (isReopening) payload.justification = justification.trim();
    await onUpdate(payload);
  };

  return (
    <Stack
      border="1px solid #D9D9D9"
      borderRadius="20px"
      bg="white"
      p={{ base: 4, md: 6 }}
      gap={4}
    >
      <Text fontWeight={600} fontSize="16px">
        Ações
      </Text>

      <Select
        label="Status"
        options={statusOptions}
        value={status}
        onChange={(e) => setStatus(e.target.value as TicketStatus)}
      />

      <Select
        label="Prioridade"
        options={PRIORITY_OPTIONS}
        value={priority}
        onChange={(e) => setPriority(e.target.value as TicketPriority)}
      />

      {isReopening && (
        <Input
          label="Justificativa"
          required
          placeholder="Motivo para reabrir"
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        />
      )}

      <ButtonAction
        type="button"
        variant="plain"
        bg="#3B82F6"
        color="white"
        borderRadius="full"
        loading={isLoading}
        disabled={!canSubmit || isLoading}
        _hover={{ bg: "#2563EB" }}
        onClick={submit}
      >
        Atualizar
      </ButtonAction>
    </Stack>
  );
}
