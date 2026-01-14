"use client";

import { Box, Stack, Text, Input, Icon, IconButton } from "@chakra-ui/react";
import { FiUploadCloud, RxCross2 } from "@/components/Icons";
import Image from "next/image";
import React from "react";
import { ImageUploaderProps } from "./interface";

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState<string | null>(value ?? null);
  const [dragOver, setDragOver] = React.useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
  };

  const removeImage = () => {
    setPreview(null);
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Stack gap={3}>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        display="none"
        onChange={onInputChange}
      />

      {!preview ? (
        <Box
          border="2px dashed"
          borderColor={dragOver ? "#FF0080" : "gray.300"}
          borderRadius="12px"
          p={10}
          textAlign="center"
          cursor="pointer"
          transition="0.2s"
          bg={dragOver ? "pink.50" : "gray.50"}
          _hover={{ borderColor: "#FF0080" }}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          <Stack align="center" gap={3}>
            <Icon as={FiUploadCloud} boxSize="40px" color="#FF0080" />
            <Text fontWeight="bold">Arraste sua imagem aqui</Text>
            <Text fontSize="sm" color="gray.500">
              ou clique para selecionar
            </Text>
          </Stack>
        </Box>
      ) : (
        <Box
          position="relative"
          w="100%"
          h="260px"
          borderRadius="12px"
          overflow="hidden"
          bg="gray.100"
        >
          <IconButton
            aria-label="Remover imagem"
            position="absolute"
            top="10px"
            right="10px"
            zIndex={2}
            size="sm"
            bg="#FF0080"
            color="white"
            _hover={{ bg: "#C30061" }}
            onClick={removeImage}
          >
            <RxCross2 />
          </IconButton>

          <Image
            src={preview}
            alt="Preview"
            fill
            unoptimized
            style={{ objectFit: "contain" }}
          />
        </Box>
      )}
    </Stack>
  );
}
