"use client";

import { Stack, Text, Separator, DataList, SimpleGrid } from "@chakra-ui/react";
import InputPassword from "../FormControl/InputPassword";
import ButtonAction from "../Buttons/Action";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "@/schemas/changePasswordSchema";

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const handleChangePassword = (data: ChangePasswordSchemaType) => {
    console.log(data);
  };

  return (
    <Stack
      maxW={800}
      w="full"
      bg="white"
      borderRadius="10px"
      p={{ base: 6, md: 8 }}
      gap={8}
      align="center"
      justify="space-evenly"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 6px -1px"
      position="relative"
    >
      <Text fontSize={"25px"} fontWeight={300} alignSelf={"flex-start"}>
        Perfil do usuário
      </Text>
      <Stack w={"full"} gap={6}>
        <Text fontSize={"18px"}>Informações pessoais</Text>
        <DataList.Root orientation="horizontal">
          <DataList.Item>
            <DataList.ItemLabel>Nome</DataList.ItemLabel>
            <DataList.ItemValue>João da Silva</DataList.ItemValue>
          </DataList.Item>
          <Separator />
          <DataList.Item>
            <DataList.ItemLabel>Email</DataList.ItemLabel>
            <DataList.ItemValue>joao.silva@example.com</DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
      </Stack>
      <Separator w={"full"} borderColor="#FF0080" />
      <Stack
        w={"full"}
        gap={6}
        as={"form"}
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <Text fontSize={"18px"}>Alterar Senha</Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={2}>
          <InputPassword
            {...register("senha_atual")}
            error={errors.senha_atual}
            _placeholder={{
              fontSize: "14px",
            }}
            placeholder="Senha atual"
          />
          <InputPassword
            {...register("senha")}
            error={errors.senha}
            _placeholder={{
              fontSize: "14px",
            }}
            placeholder="Nova senha"
          />
          <InputPassword
            {...register("senha_comp")}
            error={errors.senha_comp}
            _placeholder={{
              fontSize: "14px",
            }}
            placeholder="Confirmar nova senha"
          />
        </SimpleGrid>
        <ButtonAction
          type="submit"
          variant={"plain"}
          color={"white"}
          fontSize={"16px"}
          bg={"#FF0080"}
          _hover={{
            bg: "#C30061",
            transform: "translate(0px, -2px)",
          }}
        >
          Salvar alterações
        </ButtonAction>
      </Stack>
    </Stack>
  );
}
