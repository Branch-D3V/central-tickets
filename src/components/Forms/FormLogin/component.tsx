"use client";

import { HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { FormLoginProps } from "./interface";
import {
  MdOutlineEmail,
  IoMdLogIn,
  IoMdPersonAdd,
  HiOutlineTicket,
} from "@/components/Icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/FormControl/Input";
import InputPassword from "@/components/FormControl/InputPassword";
import { loginSchema, LoginSchemaType } from "@/schemas/loginSchema";
import ButtonAction from "@/components/Buttons/Action";
import { redirect } from "next/navigation";
import { LinkComponent } from "@/components/Link";
import React from "react";
import { useUser } from "@/contexts/UserContext";

export default function FormLogin({}: FormLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { isAuthenticated, login, isLoadingLogin } = useUser();

  const handleSubmitForm = async (data: LoginSchemaType) => {
    await login(data);
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      redirect("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <Stack
      maxW={"500px"}
      w={"full"}
      bg="white"
      borderRadius="20px"
      p={{ base: 6, md: 10 }}
      gap={6}
      zIndex={10}
      align={"center"}
      justify={"space-evenly"}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
      as={"form"}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <HStack align={"center"} justify={"center"}>
        <Icon
          bg={"#3B82F6"}
          as={HiOutlineTicket}
          boxSize={12}
          p={2.5}
          borderRadius={"15px"}
          color={"#FFFFFF"}
        />
        <Stack gap={0}>
          <Text fontSize="2xl" fontWeight={700} lineHeight={1}>
            Central Tickets
          </Text>
          <Text color={"#3B82F6"} fontWeight={600} fontSize="14px">
            Acesse sua conta
          </Text>
        </Stack>
      </HStack>
      <Stack w={"full"} gap={3}>
        <Input
          error={errors.email}
          placeholder="E-mail"
          icon={MdOutlineEmail}
          {...register("email")}
        />
        <InputPassword
          error={errors.password}
          placeholder="Senha"
          {...register("password")}
        />
        <LinkComponent
          fontSize={"14px"}
          alignSelf={"end"}
          color={"#3B82F6"}
          href={"#"}
          label="Esqueceu a senha?"
        />
      </Stack>
      <Stack w={"full"} gap={3}>
        <ButtonAction
          borderRadius={"full"}
          w={"full"}
          type="submit"
          variant={"plain"}
          color={"white"}
          fontSize={"16px"}
          bg={"#3B82F6"}
          loading={isLoadingLogin}
          _hover={{
            bg: "#2563EB",
            transform: "translate(0px, -2px)",
          }}
          rightIcon={<IoMdLogIn />}
        >
          Entrar
        </ButtonAction>
        <ButtonAction
          borderRadius={"full"}
          w={"full"}
          variant={"outline"}
          fontSize={"16px"}
          borderColor={"#3B82F6"}
          color={"#3B82F6"}
          _hover={{
            borderColor: "#2563EB",
            transform: "translate(0px, -2px)",
          }}
          rightIcon={<IoMdPersonAdd />}
        >
          Criar uma conta
        </ButtonAction>
      </Stack>
    </Stack>
  );
}
