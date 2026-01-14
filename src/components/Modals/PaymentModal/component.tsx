"use client";

import {
  Dialog,
  Portal,
  Stack,
  Text,
  CloseButton,
  RadioGroup,
  HStack,
  DataList,
  Progress,
} from "@chakra-ui/react";
import React from "react";
import ButtonAction from "@/components/Buttons/Action";
import Input from "@/components/FormControl/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetch from "@/hooks/useFetch/hook";
import { toaster } from "@/components/ui/toaster";
import { PaymentModalComponentProps } from "./interface";
import { paymentSchema, PaymentSchemaType } from "@/schemas/paymentSchema";

import { getTokenClient } from "@/server/getToken";
import QRCode from "react-qr-code";
import ButtonCopy from "@/components/Buttons/Copy";
import { formatMoney } from "@/functions/format";
import { PaymentResponse } from "@/interfaces/Payments/Response";
import { useUser } from "@/contexts/UserContext";
import { redirect } from "next/navigation";

export default function PaymentModal({
  onSuccess,
  open,
  setOpen,
  plan,
}: PaymentModalComponentProps) {
  const [request, isLoading, data] = useFetch<PaymentResponse>();
  const [progress, setProgress] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(4 * 60);

  const { handleValidateToken, isAuthenticated, isLoadingPages } = useUser();

  const paymentMethods = [
    { label: "PIX", value: "pix" },
    { label: "Cartão", value: "credit_card" },
    { label: "Boleto", value: "boleto" },
  ];

  const token = getTokenClient();

  const {
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(paymentSchema),
    shouldUnregister: true,
    defaultValues: {
      plano_id: plan.id,
    },
  });

  const paymentMethod = watch("paymentMethod");

  const formatTime = (seconds: number) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handlePayment = async (data: PaymentSchemaType) => {
    data.currency = "BRL";
    console.log(data);
    let formData = {};
    if (paymentMethod === "boleto") {
      data.boleto.expiresInDays = 3;
      formData = { ...data };
    }
    if (paymentMethod === "pix") {
      data.pix.expiresInDays = 1;
      formData = { ...data };
    }
    if (paymentMethod === "credit_card") {
      const card = {
        number: data.card.number,
        holderName: data.card.holderName,
        expMonth: data.card.expirationMonth,
        expYear: data.card.expirationYear,
        cvv: data.card.cvv,
      };
      await window.Marchabb.setPublicKey(process.env.NEXT_PUBLIC_KEY!);
      const tokenCard = await window.Marchabb.encrypt(card);
      formData = { ...data, card: { ...data.card, hash: tokenCard } };
    }
    await request("/api/payment/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token || "",
      },
    })
      .then(() => {
        toaster.create({
          title: "Sucesso",
          description:
            paymentMethod === "credit_card"
              ? "Pagamento realizado com sucesso!"
              : paymentMethod === "pix"
              ? "Código gerado com sucesso!"
              : "Boleto gerado com sucesso!",
          type: "success",
        });
        // setOpen(false);
        onSuccess?.();
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
    setValue("plano_id", plan.id);
  }, [plan]);

  React.useEffect(() => {
    if (paymentMethod !== "pix" || !data?.pix?.qrcode) {
      setProgress(0);
      setTimeLeft(240);
      return;
    }

    setProgress(0);
    setTimeLeft(240);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setProgress(100);
          return 0;
        }

        const newTime = prev - 1;
        const percentage = ((240 - newTime) / 240) * 100;

        setProgress(Math.round(percentage));
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paymentMethod, data?.pix?.qrcode]);

  React.useEffect(() => {
    if (isLoadingPages && !isAuthenticated && !isLoadingPages) {
      redirect("/login");
    }
  }, [isAuthenticated, isLoadingPages]);

  console.log(isAuthenticated);
  console.log(watch());

  return (
    <Dialog.Root open={open} placement="center" modal>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(12px)" />

        <Dialog.Positioner>
          <Dialog.Content bg="white" borderRadius="12px" maxW="520px">
            <Dialog.Body>
              <Stack
                py={4}
                gap={5}
                as="form"
                onSubmit={handleSubmit(handlePayment)}
              >
                <Text fontSize="22px" fontWeight="bold" textAlign="center">
                  Pagamento
                </Text>

                <Stack>
                  <Text fontSize={"18px"}>Informações do pedido:</Text>
                  <DataList.Root orientation="vertical" gap={2}>
                    <HStack>
                      <DataList.Item bg={"gray.200"} w={"full"} p={2}>
                        <DataList.ItemLabel>Nome:</DataList.ItemLabel>
                        <DataList.ItemValue>{plan.titulo}</DataList.ItemValue>
                      </DataList.Item>{" "}
                      <DataList.Item bg={"gray.200"} w={"full"} p={2}>
                        <DataList.ItemLabel>Preço:</DataList.ItemLabel>
                        <DataList.ItemValue>
                          {formatMoney(plan.preco)}
                        </DataList.ItemValue>
                      </DataList.Item>
                    </HStack>
                    <DataList.Item bg={"gray.200"} w={"full"} p={2}>
                      <DataList.ItemLabel>Descrição:</DataList.ItemLabel>
                      <DataList.ItemValue>{plan.descricao}</DataList.ItemValue>
                    </DataList.Item>{" "}
                  </DataList.Root>
                  <Text fontSize={"18px"}>Informações do pedido:</Text>
                </Stack>

                <RadioGroup.Root
                  value={paymentMethod}
                  onValueChange={(e) =>
                    setValue(
                      "paymentMethod",
                      e.value as "pix" | "credit_card" | "boleto",
                      {
                        shouldValidate: true,
                      }
                    )
                  }
                >
                  <HStack gap="6">
                    {paymentMethods.map((item) => (
                      <RadioGroup.Item key={item.value} value={item.value}>
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText fontWeight="medium">
                          {item.label}
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </HStack>
                </RadioGroup.Root>

                {paymentMethod === "credit_card" && (
                  <Stack>
                    <HStack>
                      <Input
                        placeholder="Número do cartão"
                        {...register("card.number")}
                        error={errors.card?.number}
                      />
                      <Input
                        placeholder="CVV"
                        {...register("card.cvv")}
                        error={errors.card?.cvv}
                      />
                    </HStack>
                    <Input
                      placeholder="Nome"
                      {...register("card.holderName")}
                      error={errors.card?.holderName}
                    />
                    <HStack>
                      <Input
                        placeholder="MM"
                        maxLength={2}
                        type="number"
                        {...register("card.expirationMonth")}
                        error={errors.card?.expirationMonth}
                      />{" "}
                      /
                      <Input
                        maxLength={4}
                        type="number"
                        placeholder="YYYY"
                        {...register("card.expirationYear")}
                        error={errors.card?.expirationYear}
                      />
                    </HStack>
                  </Stack>
                )}

                {paymentMethod === "pix" && data && data?.pix?.qrcode && (
                  <Stack
                    p={2}
                    borderRadius={"md"}
                    w={"full"}
                    alignItems={"center"}
                  >
                    <Text>Realize o pagamento</Text>
                    <Stack
                      p={2}
                      border={"2px solid #FF0080"}
                      borderRadius={"md"}
                      alignItems={"center"}
                    >
                      <QRCode size={200} value={String(data?.pix?.qrcode)} />
                      <Text fontSize={"12px"} color={"#FF0080"}>
                        Escaneie o QR Code para pagar!
                      </Text>
                    </Stack>
                    <ButtonCopy
                      textCopy={data?.pix?.qrcode ?? "pix-code"}
                      disabled={!data?.pix?.qrcode}
                      color={"#FF0080"}
                      border={"1px solid #FF0080"}
                      variant={"outline"}
                      w={"full"}
                      size={"lg"}
                    >
                      Pix Copia e Cola
                    </ButtonCopy>
                    <Input disabled defaultValue={data?.pix?.qrcode} />
                    <Stack w="full" gap={1}>
                      <HStack justify="space-between">
                        <Text fontSize="sm" fontWeight="medium">
                          Tempo para pagamento
                        </Text>

                        <Text fontSize="sm" fontWeight="bold" color={"#FF0080"}>
                          {formatTime(timeLeft)}
                        </Text>
                      </HStack>

                      <Progress.Root
                        value={progress}
                        w="full"
                        colorPalette="pink"
                      >
                        <Progress.Track>
                          <Progress.Range />
                        </Progress.Track>
                      </Progress.Root>
                    </Stack>
                    {timeLeft < 200 && (
                      <ButtonAction
                        loading={isLoading}
                        bg="#gray.500"
                        color="white"
                        onClick={() => handleValidateToken()}
                      >
                        Já pagou? Confirmar pagamento
                      </ButtonAction>
                    )}
                  </Stack>
                )}

                <ButtonAction
                  loading={isLoading}
                  bg="#FF0080"
                  color="white"
                  type="submit"
                >
                  {paymentMethod === "credit_card"
                    ? "Pagar com cartão"
                    : paymentMethod === "pix"
                    ? "Gerar código PIX"
                    : "Gerar boleto"}
                </ButtonAction>
              </Stack>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton onClick={() => setOpen(false)} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
