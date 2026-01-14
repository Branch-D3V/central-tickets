"use client";

import { Input, Stack, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { MdFileUpload, MdCheckCircle } from "@/components/Icons";

interface VideoUploaderProps {
  onChange: (file: File | null) => void;
}

export default function VideoUploader({ onChange }: VideoUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);

  const handleFile = (newFile?: File) => {
    if (!newFile) return;
    setFile(newFile);
    onChange(newFile);
  };

  const fileSizeMB = file ? (file.size / 1024 / 1024).toFixed(2) : null;

  return (
    <Stack
      border="2px dashed"
      borderColor={file ? "#38A169" : "gray.300"}
      borderRadius="12px"
      p={6}
      textAlign="center"
      cursor="pointer"
      align="center"
      transition="all 0.2s"
      _hover={{ borderColor: "#FF0080" }}
      onClick={() => inputRef.current?.click()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {file ? (
        <>
          <Icon as={MdCheckCircle} color="green.400" boxSize={8} />
          <Text fontWeight="bold" color="green.600">
            Vídeo selecionado
          </Text>

          <Text fontSize="sm" lineClamp={1} maxW="100%">
            {file.name}
          </Text>

          <Text fontSize="xs" opacity={0.7}>
            {fileSizeMB} MB — clique para trocar
          </Text>
        </>
      ) : (
        <>
          <MdFileUpload size={32} />
          <Text fontWeight="bold">Arraste o vídeo ou clique</Text>
          <Text fontSize="sm" opacity={0.7}>
            MP4, WEBM ou OGG (até 100MB)
          </Text>
        </>
      )}

      <Input
        ref={inputRef}
        type="file"
        accept="video/*"
        hidden
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </Stack>
  );
}
