"use client";

import {
  Dialog,
  Portal,
  Stack,
  Text,
  Textarea,
  CloseButton,
} from "@chakra-ui/react";
import { MdFileUpload } from "@/components/Icons";
import React from "react";
import ButtonAction from "@/components/Buttons/Action";
import ImageUploader from "@/components/Upload/Image/component";
import Input from "@/components/FormControl/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  imageUploadSchema,
  ImageUploadSchemaType,
} from "@/schemas/uploadImage";
import useFetch from "@/hooks/useFetch/hook";
import { toaster } from "@/components/ui/toaster";
import { UploadImageModalComponentProps } from "./interface";

export default function UploadImageModal({
  onSuccess,
}: UploadImageModalComponentProps) {
  const [request, isLoading] = useFetch();
  const [open, setOpen] = React.useState(false);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(imageUploadSchema),
  });

  const handleUploadImage = async (data: ImageUploadSchemaType) => {
    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("descricao", data.descricao || "");
    formData.append("arquivo", data.arquivo);
    if (data.arquivo_capa) {
      formData.append("arquivo_capa", data.arquivo_capa);
    }

    formData.append("eh_premium", "true");
    formData.append("privado", "false");
    formData.append("lancado", "true");

    await request("/api/media/", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        toaster.create({
          title: "Sucesso",
          description: "Imagem enviada com sucesso!",
          type: "success",
        });
        setOpen(false);
        onSuccess?.();
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
    <Dialog.Root open={open} placement="center" modal>
      <Dialog.Trigger asChild>
        <ButtonAction
          h={"50px"}
          variant={"plain"}
          fontSize={"18px"}
          borderRadius={"full"}
          bg={"#FF0080"}
          color={"white"}
          _hover={{
            bg: "#C30061",
          }}
          rightIcon={<MdFileUpload />}
          onClick={() => setOpen(true)}
        >
          Enviar Foto
        </ButtonAction>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(15px)" />

        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            color="black"
            borderRadius="12px"
            maxW="480px"
            py={4}
          >
            <Dialog.Body>
              <Stack
                gap={5}
                as={"form"}
                onSubmit={handleSubmit(handleUploadImage)}
              >
                <Text fontSize="22px" fontWeight="bold" textAlign="center">
                  Criar conteúdo
                </Text>

                <Stack gap={1}>
                  <Input
                    required
                    label="Título"
                    placeholder="Digite o título"
                    error={errors.titulo}
                    {...register("titulo")}
                    _placeholder={{ fontSize: "14px" }}
                  />
                </Stack>

                <Stack gap={1}>
                  <Text fontSize="14px">Descrição</Text>
                  <Textarea
                    bg={"#F0F0F0"}
                    placeholder="Digite a descrição"
                    resize="none"
                    rows={4}
                    {...register("descricao")}
                  />
                </Stack>

                <ImageUploader
                  onChange={(file) => file && setValue("arquivo", file)}
                />

                <Stack gap={3} mt={4}>
                  <ButtonAction
                    bg="#FF0080"
                    color="white"
                    fontWeight={800}
                    _hover={{ bg: "#C30061" }}
                    onClick={handleSubmit(handleUploadImage)}
                    loading={isLoading}
                    rightIcon={<MdFileUpload />}
                  >
                    Criar
                  </ButtonAction>
                </Stack>
              </Stack>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton onClick={() => setOpen(false)} size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
