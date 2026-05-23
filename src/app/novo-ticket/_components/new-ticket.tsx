"use client";

import { useRef, useState } from "react";
import {
  Box,
  Dialog,
  HStack,
  IconButton,
  Portal,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
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
import {
  FaPlus,
  FiUploadCloud,
  FiX,
  LuTicketPlus,
  MdCheckCircle,
} from "@/components/Icons";
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

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
const ACCEPT_ATTR = ACCEPTED_MIME_TYPES.join(",");

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function NewTicketComponent() {
  const router = useRouter();
  const {
    createTicket,
    isLoadingCreate,
    uploadAttachments,
    isLoadingUploadAttachments,
  } = useTickets();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [createdTicketId, setCreatedTicketId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTicketSchema),
  });

  const handleAddFiles = (selected: FileList | null) => {
    if (!selected || selected.length === 0) return;

    const incoming = Array.from(selected);
    const accepted: File[] = [];
    const rejected: string[] = [];

    for (const file of incoming) {
      if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
        rejected.push(`${file.name}: tipo não suportado`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        rejected.push(`${file.name}: excede 10 MB`);
        continue;
      }
      accepted.push(file);
    }

    if (rejected.length) {
      toaster.create({
        title: "Alguns arquivos foram ignorados",
        description: rejected.join(" • "),
        type: "warning",
        closable: true,
      });
    }

    setFiles((prev) => {
      const next = [...prev, ...accepted];
      if (next.length > MAX_FILES) {
        toaster.create({
          description: `Máximo de ${MAX_FILES} arquivos por upload.`,
          type: "warning",
          closable: true,
        });
        return next.slice(0, MAX_FILES);
      }
      return next;
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitForm = async (data: CreateTicketSchemaType) => {
    const payload: CreateTicketPayload = {
      title: data.title,
      description: data.description,
      type: data.type as TicketType,
      priority: data.priority as TicketPriority,
      due_at: data.due_at || null,
    };

    try {
      const { data: created } = await createTicket(payload);
      if (!created?.id) {
        throw new Error("Ticket criado, mas ID não retornado.");
      }
      setCreatedTicketId(created.id);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar ticket";
      toaster.create({
        description: message,
        type: "error",
        closable: true,
      });
    }
  };

  const finishAndRedirect = (message: string) => {
    toaster.create({
      title: "Sucesso",
      description: message,
      type: "success",
    });
    setCreatedTicketId(null);
    setFiles([]);
    router.push("/tickets");
  };

  const handleSkipAttachments = () => {
    finishAndRedirect("Ticket criado com sucesso!");
  };

  const handleUploadAttachments = async () => {
    if (!createdTicketId || files.length === 0) return;

    try {
      await uploadAttachments(createdTicketId, files);
      finishAndRedirect("Ticket e anexos enviados com sucesso!");
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Falha ao enviar anexos";
      toaster.create({
        title: "Erro ao enviar anexos",
        description: message,
        type: "error",
        closable: true,
      });
    }
  };

  const isDialogOpen = createdTicketId !== null;

  return (
    <>
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

      <Dialog.Root
        open={isDialogOpen}
        onOpenChange={(e) => {
          if (!e.open && !isLoadingUploadAttachments) {
            handleSkipAttachments();
          }
        }}
        closeOnInteractOutside={!isLoadingUploadAttachments}
        closeOnEscape={!isLoadingUploadAttachments}
        size="md"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="20px">
              <Dialog.Header>
                <HStack gap={2}>
                  <MdCheckCircle size={24} color="#22C55E" />
                  <Dialog.Title fontSize="18px" fontWeight={700}>
                    Ticket aberto com sucesso!
                  </Dialog.Title>
                </HStack>
              </Dialog.Header>

              <Dialog.Body>
                <Stack gap={4}>
                  <Text fontSize="14px" color="#555">
                    Deseja anexar arquivos (imagens, prints ou documentos) ao
                    ticket agora?
                  </Text>
                  <Text fontSize="12px" color="#777">
                    Até {MAX_FILES} arquivos, 10 MB cada. JPEG, PNG, WEBP, GIF,
                    PDF, DOC, DOCX, XLS, XLSX.
                  </Text>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={ACCEPT_ATTR}
                    style={{ display: "none" }}
                    onChange={(e) => handleAddFiles(e.target.files)}
                  />

                  <ButtonAction
                    type="button"
                    variant="outline"
                    borderRadius="full"
                    borderColor="#D9D9D9"
                    color="#555050"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={
                      files.length >= MAX_FILES ||
                      isLoadingUploadAttachments
                    }
                    leftIcon={<FiUploadCloud />}
                    alignSelf="flex-start"
                  >
                    Selecionar arquivos
                  </ButtonAction>

                  {files.length > 0 && (
                    <Stack gap={2}>
                      {files.map((file, index) => (
                        <HStack
                          key={`${file.name}-${index}`}
                          justify="space-between"
                          bg="#F0F0F0"
                          borderRadius="10px"
                          px={3}
                          py={2}
                        >
                          <Box minW={0}>
                            <Text
                              fontSize="14px"
                              fontWeight={500}
                              truncate
                              maxW="320px"
                            >
                              {file.name}
                            </Text>
                            <Text fontSize="12px" color="#777">
                              {formatBytes(file.size)}
                            </Text>
                          </Box>
                          <IconButton
                            aria-label="Remover anexo"
                            size="sm"
                            variant="ghost"
                            disabled={isLoadingUploadAttachments}
                            onClick={() => handleRemoveFile(index)}
                          >
                            <FiX />
                          </IconButton>
                        </HStack>
                      ))}
                    </Stack>
                  )}
                </Stack>
              </Dialog.Body>

              <Dialog.Footer>
                <HStack gap={3} w="full" justify="flex-end">
                  <ButtonAction
                    type="button"
                    variant="outline"
                    borderRadius="full"
                    borderColor="#D9D9D9"
                    color="#555050"
                    onClick={handleSkipAttachments}
                    disabled={isLoadingUploadAttachments}
                  >
                    Pular
                  </ButtonAction>
                  <ButtonAction
                    type="button"
                    variant="plain"
                    borderRadius="full"
                    bg="#3B82F6"
                    color="white"
                    loading={isLoadingUploadAttachments}
                    disabled={files.length === 0}
                    onClick={handleUploadAttachments}
                    _hover={{ bg: "#2563EB" }}
                    rightIcon={<FiUploadCloud />}
                  >
                    Enviar anexos
                  </ButtonAction>
                </HStack>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
