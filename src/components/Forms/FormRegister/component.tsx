"use client";

import { HStack, Stack, Text } from "@chakra-ui/react";
import { FormRegisterProps } from "./interface";
import {
  MdOutlineEmail,
  IoMdLogIn,
  IoMdPersonAdd,
  LuUserRound,
  HiOutlineIdentification,
} from "@/components/Icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/FormControl/Input";
import InputPassword from "@/components/FormControl/InputPassword";
import ButtonAction from "@/components/Buttons/Action";
import Image from "next/image";
import { registerSchema, RegisterSchemaType } from "@/schemas/registerSchema";
import { keyframes } from "@emotion/react";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import React from "react";
import useFetch from "@/hooks/useFetch/hook";
import { toaster } from "@/components/ui/toaster";
import { User } from "@/interfaces/User/User";

export default function FormRegister({}: FormRegisterProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { isAuthenticated } = useUser();
  const [request, isLoading, data] = useFetch<User>();

  const router = useRouter();

  const fadeUp = keyframes`
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    `;

  const handleSubmitForm = async (data: RegisterSchemaType) => {
    await request("/api/auth/register", {
      method: "POST",
      body: data,
    })
      .then(() => {
        toaster.create({
          description: "Cadastro realizado com sucesso!",
          type: "success",
          closable: true,
        });
        router.push("/login");
      })
      .catch((error) => {
        if (error?.data && typeof error.data === "object") {
          Object.entries(error.data).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              setError(field as keyof RegisterSchemaType, {
                type: "server",
                message: messages[0],
              });
            }
          });
        }

        if (error?.message) {
          toaster.create({
            description: error.message,
            type: "error",
            closable: true,
          });
        }
      });
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

  return (
    <Stack
      maxW={"500px"}
      w={"full"}
      h={"full"}
      minH={"360px"}
      bg="white"
      borderRadius="10px"
      p={{ base: 4, md: 8 }}
      zIndex={10}
      align={"center"}
      justify={"space-evenly"}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
      as={"form"}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Stack gap={2} mb={4}>
        <HStack align={"center"} justify={"center"}>
          <Image
            width={22}
            height={22}
            src="/assets/webp/xxx.webp"
            alt="plug"
            style={{ transform: "rotate(30deg)" }}
          />
          <Text fontSize="2xl" fontWeight="bold" textAlign={"center"}>
            Faça seu Cadastro
          </Text>
          <Image
            width={22}
            height={22}
            src="/assets/webp/heart.webp"
            alt="plug"
            style={{ transform: "rotate(-30deg)" }}
          />
        </HStack>
        <Text
          textAlign={"center"}
          color="gray.500"
          fontSize={{ base: "md", md: "lg" }}
          maxW="720px"
          animation={`${fadeUp} 1s ease-out forwards`}
        >
          E tenha acesso a conteúdos exclusivos <br /> e muito mais!
        </Text>
      </Stack>
      <Stack w={"full"} mb={4}>
        <Input
          error={errors.nome}
          placeholder="Nome"
          icon={LuUserRound}
          {...register("nome")}
        />{" "}
        <Stack>
          <Input
            error={errors.email}
            placeholder="E-mail"
            icon={MdOutlineEmail}
            {...register("email")}
          />{" "}
          <Input
            error={errors.cpf}
            placeholder="CPF"
            icon={HiOutlineIdentification}
            {...register("cpf")}
          />
        </Stack>
        <Stack direction={{ base: "column", md: "row" }}>
          <InputPassword
            error={errors.senha}
            placeholder="Senha"
            {...register("senha")}
          />
          <InputPassword
            error={errors.senha_comp}
            placeholder="Repetir Senha"
            {...register("senha_comp")}
          />
        </Stack>
      </Stack>
      <Stack w={"full"}>
        <ButtonAction
          borderRadius={"full"}
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
          rightIcon={<IoMdPersonAdd />}
        >
          Cadastrar-se
        </ButtonAction>
        <ButtonAction
          borderRadius={"full"}
          w={"full"}
          onClick={() => router.push("/login")}
          variant={"plain"}
          fontSize={"16px"}
          borderColor={"#FF0080"}
          color={"#FF0080"}
          _hover={{
            borderColor: "#C30061",
            transform: "translate(0px, -2px)",
          }}
          rightIcon={<IoMdLogIn />}
        >
          Já possui uma conta?
        </ButtonAction>
      </Stack>
    </Stack>
  );
}
