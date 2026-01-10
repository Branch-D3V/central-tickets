"use client";

import { Avatar, Box, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { SidebarComponentProps } from "./interface";
import { RxCross2 } from "@/components/Icons";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultNavigation } from "@/data/defaultNavigation";

function SidebarComponent({ isOpen, onToggle }: SidebarComponentProps) {
  const pathname = usePathname();

  const currentPath = (endpoint: string) => {
    if (pathname.startsWith(`${endpoint}`)) {
      return true;
    }
    return false;
  };

  return (
    <Box
      position="relative"
      borderRadius={"20px"}
      boxShadow={"4px 4px 0px 0px #000000"}
      justifyContent={"space-between"}
      ml={1}
    >
      <IconButton
        aria-label="Toggle menu"
        onClick={onToggle}
        position="absolute"
        w={"28px"}
        h={"30px"}
        top={"40px"}
        left={isOpen ? "230px" : "75px"}
        color={"black"}
        bg={"white"}
        border={"solid 1px"}
        transition="0.6s"
        borderColor={"corBordas"}
        zIndex={10}
        size="xs"
        rounded="xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow={"4px 4px 0px 0px #000000"}
      >
        <RxCross2
          style={{
            transform: !isOpen ? "rotate(0deg)" : "rotate(180deg)",
            transition: "0.3s",
          }}
        />
      </IconButton>
      <Sidebar
        collapsed={!isOpen}
        rootStyles={{
          ".ps-sidebar-container": {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            borderRadius: "20px",
            transition: "0.3s",
          },
        }}
        style={{
          width: isOpen ? "256px" : "90px",
          height: "100%",
          borderWidth: "4px",
          borderColor: "#000000",
          borderRadius: "20px",
          transition: "0.6s",
        }}
      >
        <HStack
          cursor={"pointer"}
          transition="0.3s"
          p={isOpen ? "21px" : "17px"}
          h={"89px"}
        >
          <Stack
            h={"40px"}
            w={"40px"}
            borderRadius={"12px"}
            border={"solid 2px"}
            borderColor={"corBordas"}
            boxShadow={"5px 5px 0px 0px #000000"}
            bg={
              "linear-gradient(180deg,rgba(255, 0, 112, 1) 0%, rgba(192, 0, 88, 1) 100%)"
            }
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image
              style={{ margin: "20px" }}
              alt="logo"
              height={25}
              width={25}
              src="/assets/webp/rocket.webp"
            />
          </Stack>
          {isOpen && (
            <Text fontWeight={400} fontStyle="normal">
              Marchapay.io
            </Text>
          )}
        </HStack>
        <Box
          height="1px"
          bg="#98A8B34D"
          borderRadius="full"
          mb={5}
          w={"full"}
        />
        <Stack
          h={"full"}
          gap={4}
          color={"rgba(201, 209, 217, 1)"}
          justifyContent={"space-between"}
        >
          <Menu
            style={{ paddingLeft: "12px", paddingRight: "12px" }}
            menuItemStyles={{
              button: ({ active }) => ({
                marginBottom: "8px",
                borderRadius: "4px",
                padding: "10px",
                transition: "0.2s",
                color: "rgba(12, 8, 19, 1)",
                ...(active && {
                  backgroundColor: "#FF0070",
                  color: "white",
                  borderRadius: "12px",
                  border: "solid 2px",
                  borderColor: "#000000",
                  boxShadow: "5px 5px 0px 0px #000000",
                }),
                height: "48px !important",
              }),
            }}
          >
            {defaultNavigation.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  active={currentPath(item.value)}
                  component={<Link href={item.value}></Link>}
                >
                  {item.label}
                </MenuItem>
              );
            })}
          </Menu>
        </Stack>

        <Stack mt="auto" w={"full"} p={"10px"}>
          <Box height="1px" bg="#98A8B34D" borderRadius="full" w={"full"} />
          <HStack justifyContent={"center"} gap="2" w={"full"}>
            <Avatar.Root
              bg={
                "linear-gradient(180deg,rgba(255, 0, 112, 1) 0%, rgba(255, 246, 0, 1) 100%)"
              }
            >
              <Avatar.Fallback />
              <Avatar.Image
                src="https://bit.ly/broken-link"
                bg={
                  "linear-gradient(180deg,rgba(255, 0, 112, 1) 0%, rgba(255, 246, 0, 1) 100%)"
                }
              />
            </Avatar.Root>
            {isOpen && (
              <Stack transition={"0.3s"} gap="0">
                <Text fontWeight="medium">João Silva</Text>
                <Text color="#98A8B3">joao@marchapay.io</Text>
              </Stack>
            )}
          </HStack>
        </Stack>
      </Sidebar>
    </Box>
  );
}

export { SidebarComponent };
