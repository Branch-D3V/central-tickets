"use client";

import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Drawer,
  Heading,
  HStack,
  IconButton,
  Menu,
  Portal,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HeaderComponentProps } from "./interface";
import {
  FaUser,
  IoMdLogIn,
  IoMdPersonAdd,
  MdOutlineMenu,
  PiPowerBold,
  SiGoogleanalytics,
} from "@/components/Icons";
import { defaultNavigation } from "@/data/defaultNavigation";
import ButtonAction from "@/components/Buttons/Action";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import React from "react";

export function HeaderComponent({}: HeaderComponentProps) {
  const isBreaking = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, user, logout } = useUser();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
      <Stack maxW="full" h="full" pl={{ md: 6 }}>
        <HStack w="full" h="full" justifyContent="space-between">
          {!isBreaking ? (
            <Heading size="md">Andressa Urach</Heading>
          ) : (
            <Drawer.Root placement={"start"} open={open}>
              <Drawer.Trigger asChild>
                <IconButton
                  onClick={() => setOpen(true)}
                  aria-label="menu"
                  variant="plain"
                  size={"2xl"}
                >
                  <MdOutlineMenu />
                </IconButton>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>
                        Olá,{" "}
                        {isAuthenticated
                          ? user.nome?.split(" ")[0]
                          : " seja bem vindo"}
                        !
                      </Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <Stack>
                        {defaultNavigation.map((item, index) => (
                          <Button
                            as={"a"}
                            borderBottom={
                              pathname === item.value
                                ? "5px solid #FF0080"
                                : "none"
                            }
                            key={index}
                            h={"40px"}
                            fontSize={"20px"}
                            fontStyle={"italic"}
                            _hover={{
                              borderBottom: "5px solid #FF0080",
                            }}
                          >
                            {item.label}
                          </Button>
                        ))}
                      </Stack>
                    </Drawer.Body>
                    <Drawer.Footer
                      borderTop="1px solid"
                      borderColor="#FF0080"
                      mt={4}
                    >
                      {isAuthenticated ? (
                        <HStack
                          w="full"
                          key={user.email}
                          gap="4"
                          justify={"space-between"}
                        >
                          <Stack gap="0">
                            <Text fontWeight="medium">{user.nome}</Text>
                            <Text color="fg.muted" textStyle="sm">
                              {user.email}
                            </Text>
                          </Stack>
                          <IconButton
                            bg={"#FF0080"}
                            color={"white"}
                            variant={"plain"}
                            borderRadius={"full"}
                            onClick={() => logout()}
                          >
                            <PiPowerBold />
                          </IconButton>
                        </HStack>
                      ) : (
                        <Stack w={"full"}>
                          <ButtonAction
                            onClick={() => router.push("/login")}
                            variant={"plain"}
                            fontSize={"16px"}
                            borderRadius={"full"}
                            w="full"
                            bg={"#FF0080"}
                            color={"white"}
                            _hover={{
                              bg: "#C30061",
                              transform: "translate(0px, -2px)",
                            }}
                            rightIcon={<IoMdLogIn />}
                          >
                            Login
                          </ButtonAction>
                          <ButtonAction
                            onClick={() => router.push("/cadastro")}
                            variant={"plain"}
                            fontSize={"16px"}
                            borderRadius={"full"}
                            w="full"
                            bg={"#FF0080"}
                            color={"white"}
                            _hover={{
                              bg: "#C30061",
                              transform: "translate(0px, -2px)",
                            }}
                            rightIcon={<IoMdPersonAdd />}
                          >
                            Registrar-se
                          </ButtonAction>
                        </Stack>
                      )}
                    </Drawer.Footer>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" onClick={() => setOpen(false)} />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          )}

          {!isBreaking && (
            <HStack w={"full"} justifyContent="center" gap={8} maxW={"500px"}>
              {defaultNavigation.map((item, index) => (
                <Button
                  borderBottom={
                    pathname === item.value ? "5px solid #FF0080" : "none"
                  }
                  key={index}
                  h={"80px"}
                  fontSize={"16px"}
                  fontStyle={"italic"}
                  _hover={{
                    borderBottom: "5px solid #FF0080",
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </HStack>
          )}

          {isAuthenticated ? (
            <Menu.Root>
              <Menu.Trigger asChild>
                <HStack
                  key={user.email}
                  gap="4"
                  px={{ base: 2, md: 4 }}
                  cursor={"pointer"}
                >
                  <Avatar.Root size="xl">
                    <Avatar.Fallback name={user.nome} />
                  </Avatar.Root>
                  {!isBreaking && <Text fontWeight="medium">{user.nome}</Text>}
                </HStack>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content zIndex={2000} minW={"200px"} p={2}>
                    <Menu.Item
                      cursor={"pointer"}
                      value="perfil"
                      onSelect={() => router.push("/perfil")}
                    >
                      <Box flex="1">{"Perfil"}</Box>
                      <FaUser />
                    </Menu.Item>
                    {user.tipo_usuario === "administrador" && (
                      <Menu.Item
                        cursor={"pointer"}
                        value="insights"
                        onSelect={() => router.push("/admin/insights")}
                      >
                        <Box flex="1">{"Insights"}</Box>
                        <SiGoogleanalytics />
                      </Menu.Item>
                    )}
                    <Menu.Item
                      cursor={"pointer"}
                      value="logout"
                      onSelect={() => logout()}
                    >
                      <Box flex="1">{"Logout"}</Box>
                      <PiPowerBold />
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          ) : (
            <HStack gap={0}>
              <ButtonAction
                onClick={() => router.push("/login")}
                variant={"plain"}
                h={"80px"}
                fontSize={"16px"}
                borderRadius={"0px"}
                rightIcon={<IoMdLogIn />}
                bg={pathname === "/login" ? "#FF0080" : "none"}
                color={pathname === "/login" ? "white" : "#FF0080"}
                _hover={{
                  bg: "#C30061",
                  color: "white",
                }}
              >
                {!isBreaking ? "Login" : pathname === "/login" ? "Login" : ""}
              </ButtonAction>
              <ButtonAction
                onClick={() => router.push("/cadastro")}
                variant={"plain"}
                fontSize={"16px"}
                h={"80px"}
                borderRadius={"0px"}
                bg={pathname === "/cadastro" ? "#FF0080" : "white"}
                color={pathname === "/cadastro" ? "white" : "#FF0080"}
                _hover={{
                  bg: "#C30061",
                  color: "white",
                }}
                rightIcon={<IoMdPersonAdd />}
              >
                {!isBreaking
                  ? "Registrar-se"
                  : pathname === "/cadastro"
                    ? "Registrar-se"
                    : ""}
              </ButtonAction>
            </HStack>
          )}
        </HStack>
      </Stack>
    </Stack>
  );
}
