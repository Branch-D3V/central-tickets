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
import VideoUploader from "@/components/Upload/Video/component";
import Input from "@/components/FormControl/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  videoUploadSchema,
  VideoUploadSchemaType,
} from "@/schemas/uploadVideo";
import useFetch from "@/hooks/useFetch/hook";
import { UploadVideoModalComponentProps } from "./interface";

export default function UploadVideoModal({
  onSuccess,
}: UploadVideoModalComponentProps) {
  const [open, setOpen] = React.useState(false);
  const [request, isLoading] = useFetch();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(videoUploadSchema),
  });

  const handleUpload = async (data: VideoUploadSchemaType) => {
    const formData = new FormData();

    formData.append("titulo", data.titulo);
    formData.append("descricao", data.descricao || "");
    formData.append("arquivo", data.arquivo);
    formData.append("arquivo_capa", data.arquivo_capa || "");

    formData.append("eh_premium", "true");
    formData.append("privado", "false");
    formData.append("lancado", "true");
    formData.append("tipo", "VIDEO");

    const response = await request("/api/media/video", {
      method: "POST",
      body: formData,
    });

    if (response) {
      setOpen(false);
      onSuccess?.();
    }
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
          Enviar Vídeo
        </ButtonAction>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(15px)" />

        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            color="black"
            borderRadius="12px"
            maxW="520px"
            py={4}
          >
            <Dialog.Body>
              <Stack gap={5} as="form" onSubmit={handleSubmit(handleUpload)}>
                <Text fontSize="22px" fontWeight="bold" textAlign="center">
                  Criar vídeo
                </Text>

                <Input
                  label="Título"
                  placeholder="Digite o título"
                  _placeholder={{ fontSize: "14px" }}
                  required
                  error={errors.titulo}
                  {...register("titulo")}
                />

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

                <VideoUploader
                  onChange={(file) =>
                    file && setValue("arquivo", file, { shouldValidate: true })
                  }
                />

                <Stack gap={1}>
                  <Text fontWeight="bold" mt={2}>
                    Miniatura
                  </Text>

                  <ImageUploader
                    onChange={(file) =>
                      file &&
                      setValue("arquivo_capa", file, { shouldValidate: true })
                    }
                  />
                </Stack>

                <ButtonAction
                  bg="#FF0080"
                  color="white"
                  rightIcon={<MdFileUpload />}
                  loading={isLoading}
                  type="submit"
                >
                  Criar
                </ButtonAction>
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
