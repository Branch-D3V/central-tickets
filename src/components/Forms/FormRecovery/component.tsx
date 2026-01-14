"use client";

import { HStack, Stack, Text } from "@chakra-ui/react";
import { FormRecoveryProps } from "./interface";
import { MdOutlineEmail, MdKeyboardReturn } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/FormControl/Input";
import { recoverySchema, RecoverySchemaType } from "@/schemas/recoverySchema";
import ButtonAction from "@/components/Buttons/Action";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import React from "react";
import { redirect } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import useFetch from "@/hooks/useFetch/hook";

export default function FormRecovery({}: FormRecoveryProps) {
  const [request, isLoading] = useFetch();
  const [send, setSend] = React.useState(false);

  const { isAuthenticated } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(recoverySchema),
  });

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

  const handleSubmitForm = async (data: RecoverySchemaType) => {
    await request("/api/auth/recovery", {
      method: "POST",
      body: data,
    }).then(() => {
      setSend(true);
      reset();
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
        <HStack align={"center"} justify={"center"} mb={4}>
          <Image
            width={22}
            height={22}
            src="/assets/webp/xxx.webp"
            alt="plug"
            style={{ transform: "rotate(30deg)" }}
          />
          <Text fontSize="2xl" fontWeight="bold" textAlign={"center"}>
            Esqueceu sua senha?
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
          Digite o email abaixo.
        </Text>
      </Stack>
      <Stack w={"full"} mb={4}>
        <Input
          error={errors.email}
          placeholder="E-mail"
          icon={MdOutlineEmail}
          {...register("email")}
        />
        {send && (
          <Stack bg={"#dff0d8"} p={4} borderRadius="md">
            <Text
              textAlign={"center"}
              color="#3c763d"
              fontSize={{ base: "md", md: "md" }}
              maxW="720px"
              animation={`${fadeUp} 1s ease-out forwards`}
            >
              Se o e-mail inserido estiver associado a uma conta, você receberá
              um e-mail de redefinição de senha em breve.
            </Text>
          </Stack>
        )}
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
          rightIcon={<MdKeyboardReturn />}
        >
          Enviar e-mail
        </ButtonAction>
      </Stack>
    </Stack>
  );
}
