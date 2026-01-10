"use client";

import { HStack, Stack, Text } from "@chakra-ui/react";
import { FormLoginProps } from "./interface";
import { MdOutlineEmail, IoMdLogIn, IoMdPersonAdd } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/FormControl/Input";
import InputPassword from "@/components/FormControl/InputPassword";
import { loginSchema, LoginSchemaType } from "@/schemas/loginSchema";
import ButtonAction from "@/components/Buttons/Action";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FormLogin({}: FormLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();

  const handleSubmitForm = (data: LoginSchemaType) => {
    console.log(data);
  };

  return (
    <Stack
      maxW={"500px"}
      w={"full"}
      h={"360px"}
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
      <HStack align={"center"} justify={"center"} mb={4}>
        <Image
          width={22}
          height={22}
          src="/assets/webp/xxx.webp"
          alt="plug"
          style={{ transform: "rotate(30deg)" }}
        />
        <Text fontSize="2xl" fontWeight="bold" textAlign={"center"}>
          Faça seu login
        </Text>
        <Image
          width={22}
          height={22}
          src="/assets/webp/heart.webp"
          alt="plug"
          style={{ transform: "rotate(-30deg)" }}
        />
      </HStack>
      <Stack w={"full"}>
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
          _hover={{
            bg: "#C30061",
            transform: "translate(0px, -2px)",
          }}
          rightIcon={<IoMdLogIn />}
        >
          Entrar
        </ButtonAction>
        <ButtonAction
          borderRadius={"full"}
          w={"full"}
          onClick={() => router.push("/cadastro")}
          variant={"plain"}
          fontSize={"16px"}
          borderColor={"#FF0080"}
          color={"#FF0080"}
          _hover={{
            borderColor: "#C30061",
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
