"use client";

import { Stack } from "@chakra-ui/react";
import { FormPersonalInfoProps } from "./interface";
import { IoMdLogIn } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/FormControl/Input";
import ButtonAction from "@/components/Buttons/Action";
import React from "react";
import { useUser } from "@/contexts/UserContext";
import {
  updateProfileSchema,
  UpdateProfileSchemaType,
} from "@/schemas/updateProfileSchema";
import useFetch from "@/hooks/useFetch/hook";
import { getTokenClient } from "@/server/getToken";
import { toaster } from "@/components/ui/toaster";

export default function FormPersonalInfo({}: FormPersonalInfoProps) {
  const [request, isLoading] = useFetch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });

  const { isAuthenticated, user, handleValidateToken } = useUser();
  const token = getTokenClient();

  const handleSubmitForm = async (data: UpdateProfileSchemaType) => {
    // const updatedFields: Partial<UpdateProfileSchemaType> = {};
    // (Object.keys(dirtyFields) as Array<keyof UpdateProfileSchemaType>).forEach(
    //   (key) => {
    //     updatedFields[key] = data[key];
    //   }
    // );
    // console.log(updatedFields);

    await request(`/api/auth/user/`, {
      method: "PUT",
      body: { ...data, userId: user.id },
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(() => {
        toaster.create({
          title: "Sucesso",
          description: "Informações atualizadas com sucesso!",
          type: "success",
        });
      })
      .catch(({ message }) => {
        toaster.create({
          description: message,
          type: "error",
          closable: true,
        });
      })
      .finally(() => {
        handleValidateToken();
      });
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      reset({
        nome: user.nome,
        email: user.email,
        cpf: user.cpf,
      });
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
      <Stack w={"full"}>
        <Input placeholder="Nome" {...register("nome")} error={errors.nome} />
        <Input
          placeholder="Email"
          {...register("email")}
          error={errors.email}
        />
        <Input placeholder="CPF" {...register("cpf")} error={errors.cpf} />
      </Stack>
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
        Alterar Informações
      </ButtonAction>
    </Stack>
  );
}
