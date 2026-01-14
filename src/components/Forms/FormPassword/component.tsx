"use client";

import { SimpleGrid, Stack } from "@chakra-ui/react";
import { FormPasswordProps } from "./interface";
import { IoMdLogIn } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonAction from "@/components/Buttons/Action";
import React from "react";
import { useUser } from "@/contexts/UserContext";
import {
  updatePasswordSchema,
  UpdatePasswordSchemaType,
} from "@/schemas/updatePasswordSchema";
import useFetch from "@/hooks/useFetch/hook";
import InputPassword from "@/components/FormControl/InputPassword";
import { getTokenClient } from "@/server/getToken";
import { toaster } from "@/components/ui/toaster";

export default function FormPassword({}: FormPasswordProps) {
  const [request, isLoading] = useFetch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });

  const { isAuthenticated, user } = useUser();

  const token = getTokenClient();

  const handleSubmitForm = async (data: UpdatePasswordSchemaType) => {
    await request(`/api/auth/user/`, {
      method: "POST",
      body: { ...data, userId: user.id },
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(({ message }) => {
        toaster.create({
          description: message,
          type: "success",
          closable: true,
        });
        reset();
      })
      .catch(({ message }) => {
        toaster.create({
          description: message,
          type: "error",
          closable: true,
        });
      });
  };

  React.useEffect(() => {
    if (!isAuthenticated) {
    }
  }, [isAuthenticated, user]);

  return (
    <Stack
      w={"full"}
      zIndex={10}
      gap={4}
      align={"center"}
      justify={"space-evenly"}
      as={"form"}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={2} w={"full"}>
        <InputPassword
          placeholder="Senha Atual"
          {...register("senha_antiga")}
          error={errors.senha_antiga}
        />
        <InputPassword
          placeholder="Senha Nova"
          {...register("senha_nova")}
          error={errors.senha_nova}
        />
        <InputPassword
          placeholder="Confirmação de Senha"
          {...register("senha_comp")}
          error={errors.senha_comp}
        />
      </SimpleGrid>
      <ButtonAction
        w={"full"}
        type="submit"
        variant={"plain"}
        color={"white"}
        fontSize={"16px"}
        bg={"#FF0080"}
        loading={isLoading}
        _hover={{
          bg: "#C30061",
          transform: "translate(0px, -2px)",
        }}
        rightIcon={<IoMdLogIn />}
      >
        Atualizar senha
      </ButtonAction>
    </Stack>
  );
}
