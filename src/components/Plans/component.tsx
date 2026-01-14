"use client";

import {
  Stack,
  Text,
  IconButton,
  Box,
  Center,
  HStack,
  Separator,
  Spinner,
} from "@chakra-ui/react";
import {
  FaRegImage,
  FiChevronLeft,
  FiChevronRight,
  FiLock,
  MdOndemandVideo,
} from "@/components/Icons";
import ButtonAction from "../Buttons/Action";
import { formatMoney } from "@/functions/format";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import useFetch from "@/hooks/useFetch/hook";
import { Plan } from "@/interfaces/Plan";
import { AlertMessage } from "../Alert/component";
import PaymentModal from "../Modals/PaymentModal";
import { useRouter } from "next/navigation";

const MotionBox = motion(Box);

export default function Plans() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [request, isLoading, data] = useFetch<Array<Plan>>();

  const router = useRouter();

  const { insight, isAuthenticated, user } = useUser();

  const plan = data ? data[activeIndex] : null;

  const next = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % (data?.length || 1));
  };

  const prev = () => {
    setDirection(-1);
    setActiveIndex((prev) =>
      prev === 0 ? (data ? data.length - 1 : 0) : prev - 1
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  React.useEffect(() => {
    request("/api/plans", {
      method: "GET",
    });
  }, []);

  return (
    <Stack
      maxW="500px"
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
      {isLoading ? (
        <Center flexDirection={"column"} gap={8}>
          <Text fontSize="20px">Buscando Planos</Text>
          <Spinner size="xl" alignSelf="center" color={"#FF0080"} />
        </Center>
      ) : data && data?.length > 0 ? (
        <Stack gap={8} w="full" align="center" justify="center">
          {activeIndex !== 0 && (
            <IconButton
              aria-label="Plano anterior"
              onClick={prev}
              position="absolute"
              left="20px"
              top="50%"
              transform="translateY(-50%)"
              variant="ghost"
              fontSize="30px"
            >
              <FiChevronLeft />
            </IconButton>
          )}
          {(data?.length > 1 || activeIndex < data?.length - 1) && (
            <IconButton
              aria-label="Próximo plano"
              onClick={next}
              position="absolute"
              right="20px"
              top="50%"
              transform="translateY(-50%)"
              variant="ghost"
              fontSize="30px"
            >
              <FiChevronRight />
            </IconButton>
          )}

          <Text fontSize="25px" fontWeight={400}>
            Assine agora!
          </Text>

          <AnimatePresence mode="wait" custom={direction}>
            <MotionBox
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
              w="full"
            >
              <Stack align="center" gap={1}>
                <Text fontSize="14px" color="gray.500">
                  {plan?.titulo || ""}
                </Text>

                <Text fontSize="55px" lineHeight={1}>
                  {formatMoney(plan?.preco || 0, 0)}
                </Text>

                <Text fontSize="14px" color="gray.600" textAlign="center">
                  {plan?.descricao || ""}
                </Text>
              </Stack>

              <Center w="full" mt={6}>
                <ButtonAction
                  onClick={() =>
                    isAuthenticated ? setOpen(true) : router.push("/login")
                  }
                  disabled={isAuthenticated && user.status_acesso === true}
                  borderRadius="full"
                  variant="plain"
                  color="white"
                  bg="#FF0080"
                  _hover={{
                    bg: "#C30061",
                    transform: "translateY(-2px)",
                  }}
                >
                  {isAuthenticated && user.status_acesso === true
                    ? "Assinado"
                    : `Assinar ${plan?.titulo || ""}`}
                </ButtonAction>
              </Center>
            </MotionBox>
          </AnimatePresence>

          <Stack direction="row" gap={4}>
            {data?.map((_, i) => (
              <Box
                key={i}
                w="8px"
                h="8px"
                borderRadius="full"
                bg={i === activeIndex ? "#FF0080" : "gray.300"}
              />
            ))}
          </Stack>
        </Stack>
      ) : (
        <Stack>
          <AlertMessage
            color={"black"}
            bg={"transparent"}
            status="info"
            title="Indisponível"
            message="Nenhum plano disponível."
          />
        </Stack>
      )}

      <HStack w={"full"} align={"center"} justify={"center"}>
        <FiLock />
        <Text fontSize={"12px"} fontWeight={700} textAlign={"center"}>
          Todas as transações são 100% <br /> seguras e confidenciais.
        </Text>
      </HStack>
      <Stack w={"full"} align={"center"} gap={6}>
        <Text fontSize={"18px"}>Você está a apenas um passo de:</Text>
        <HStack gap="4" w={"full"} justify={"center"}>
          <Stack w={"175px"} align={"center"} gap={4}>
            <FaRegImage color={"#FF0080"} size={"35px"} />
            <Stack align={"center"} gap={0}>
              <Text fontSize={"20px"} lineHeight={1}>
                {insight.fotos || 0}
              </Text>
              <Text fontSize={"12px"}>Fotos</Text>
            </Stack>
          </Stack>
          <Separator
            orientation="vertical"
            height={"100px"}
            borderColor={"#FF0080"}
          />
          <Stack w={"175px"} align={"center"} gap={4}>
            <MdOndemandVideo color={"#FF0080"} size={"35px"} />
            <Stack align={"center"} gap={0}>
              <Text fontSize={"20px"} lineHeight={1}>
                {insight.videos || 0}
              </Text>
              <Text fontSize={"12px"}>Vídeos</Text>
            </Stack>
          </Stack>
        </HStack>
      </Stack>
      {plan && <PaymentModal open={open} setOpen={setOpen} plan={plan} />}
    </Stack>
  );
}
