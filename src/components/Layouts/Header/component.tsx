"use client";

import { ColorModeButton } from "@/components/ui/color-mode";
import {
  Box,
  CloseButton,
  Container,
  Drawer,
  Heading,
  HStack,
  IconButton,
  Link,
  Portal,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HeaderComponentProps } from "./interface";
import { IoMdLogIn, IoMdPersonAdd, MdOutlineMenu } from "@/components/Icons";
import NextLink from "next/link";
import { defaultNavigation } from "@/data/defaultNavigation";
import ButtonAction from "@/components/Buttons/Action";
import { useRouter } from "next/navigation";

export function HeaderComponent({}: HeaderComponentProps) {
  const isBreaking = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();

  return (
    <Stack
      as="header"
      position="fixed"
      top="0"
      left="0"
      w="full"
      h="80px"
      zIndex="overlay"
      bg="white"
      _dark={{
        bg: "#000000",
        boxShadow: "0 4px 15px rgba(255,255,255,0.05)",
      }}
      boxShadow="0 4px 10px rgba(0,0,0,0.1)"
      transition="background-color 0.2s ease"
    >
      <Container maxW="8xl" h="full">
        <HStack w="full" h="full" justifyContent="space-between">
          {!isBreaking ? (
            <Heading size="md">Logo</Heading>
          ) : (
            <Drawer.Root placement={"start"}>
              <Drawer.Trigger asChild>
                <IconButton aria-label="menu" variant="plain" size={"2xl"}>
                  <MdOutlineMenu />
                </IconButton>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>Olá, seja bem vindo!</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Text>Perfil</Text>
                    </Drawer.Footer>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )}

          {!isBreaking && (
            <HStack w={"full"} justifyContent="center" gap={8} maxW={"500px"}>
              {defaultNavigation.map((item, index) => (
                <Link
                  as={NextLink}
                  key={index}
                  transition="0.3s"
                  alignContent={"center"}
                  h={"80px"}
                  _hover={{
                    borderBottom: "5px solid #FF0080",
                  }}
                  href={item.value}
                  textDecoration={"none"}
                >
                  {item.label}
                </Link>
              ))}
            </HStack>
          )}

          <HStack gap={0}>
            <ButtonAction
              onClick={() => router.push("/login")}
              variant={"plain"}
              h={"80px"}
              color={"white"}
              fontSize={"16px"}
              borderRadius={"0px"}
              rightIcon={<IoMdLogIn />}
              bg={"#FF0080"}
              _hover={{
                bg: "#C30061",
              }}
            >
              Login
            </ButtonAction>
            <ButtonAction
              onClick={() => router.push("/cadastro")}
              variant={"plain"}
              fontSize={"16px"}
              h={"80px"}
              borderRadius={"0px"}
              color={"#FF0080"}
              _hover={{
                borderX: "1px solid #FF0080",
              }}
              rightIcon={<IoMdPersonAdd />}
            >
              Registrar-se
            </ButtonAction>
          </HStack>
        </HStack>
      </Container>
    </Stack>
  );
}
