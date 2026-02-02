"use client";

import {
  Button,
  CloseButton,
  Drawer,
  HStack,
  Icon,
  IconButton,
  Portal,
  Stack,
  Text,
  useToken,
} from "@chakra-ui/react";
import { SidebarComponentProps } from "./interface";
import {
  HiOutlineTicket,
  MdOutlineMenu,
  PiPowerBold,
} from "@/components/Icons";
import { defaultNavigation } from "@/data/defaultNavigation";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import React from "react";

export function SidebarComponent({}: SidebarComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useUser();

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
      zIndex="overlay"
      transition="background-color 0.2s ease"
      m={8}
    >
      <Drawer.Root placement={"start"} open={open}>
        <Drawer.Trigger asChild>
          <IconButton
            bg="white"
            _dark={{
              bg: "#000000",
              boxShadow: "0 4px 15px rgba(255,255,255,0.05)",
            }}
            boxShadow="0 4px 10px rgba(0,0,0,0.1)"
            onClick={() => setOpen(true)}
            color={"#3B82F6"}
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
            <Drawer.Content bg={"#EFF6FF"}>
              <Drawer.Header>
                <Stack direction={"row"} align={"center"}>
                  <Icon
                    bg={"#3B82F6"}
                    as={HiOutlineTicket}
                    boxSize={12}
                    p={2.5}
                    borderRadius={"15px"}
                    color={"#FFFFFF"}
                  />
                  <Stack gap={0}>
                    <Drawer.Title fontWeight={700}>
                      Olá, {user.nome ? user.nome?.split(" ")[0] : "Operador"}!
                    </Drawer.Title>
                    <Text color={"#3B82F6"} fontWeight={600}>
                      Central de Tickets
                    </Text>
                  </Stack>
                </Stack>
              </Drawer.Header>
              <Drawer.Body>
                <Stack>
                  {defaultNavigation.map((item, index) => (
                    <Button
                      as={"a"}
                      border={
                        pathname === item.value ? "2px solid #3B82F6" : "none"
                      }
                      bg={pathname === item.value ? "#DBEAFE" : "none"}
                      borderRadius={"8px"}
                      key={index}
                      h={"40px"}
                      fontSize={"20px"}
                      variant={"plain"}
                      _hover={{ bg: "#DBEAFE" }}
                      justifyContent={"flex-start"}
                    >
                      <Icon
                        as={HiOutlineTicket}
                        boxSize={5}
                        mr={1}
                        color={pathname === item.value ? "#3B82F6" : "none"}
                      />

                      {item.label}
                    </Button>
                  ))}
                </Stack>
              </Drawer.Body>
              <Drawer.Footer borderTop="1px solid" borderColor="#FF0080" mt={4}>
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
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" onClick={() => setOpen(false)} />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Stack>
  );
}
