"use client";

import {
  Badge,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import useNotifications from "@/hooks/useNotifications/hook";
import React from "react";
import {
  IoAlertCircleOutline,
  MdCheckCircle,
  MdOutlineEmail,
  MdWorkspacePremium,
} from "@/components/Icons";
import ButtonAction from "@/components/Buttons/Action";
import { toaster } from "@/components/ui/toaster";
import dayjs from "dayjs";
import { Notification, NotificationType } from "@/interfaces/Notification";

const TYPE_META: Record<
  NotificationType,
  {
    label: string;
    colorPalette: string;
    icon: React.ElementType;
    color: string;
  }
> = {
  administrative: {
    label: "Administrativo",
    colorPalette: "blue",
    icon: MdOutlineEmail,
    color: "#3B82F6",
  },
  financial: {
    label: "Financeiro",
    colorPalette: "green",
    icon: MdWorkspacePremium,
    color: "#22A273",
  },
  maintenance: {
    label: "Manutenção",
    colorPalette: "orange",
    icon: IoAlertCircleOutline,
    color: "#B68B2C",
  },
  update: {
    label: "Atualização",
    colorPalette: "purple",
    icon: MdCheckCircle,
    color: "#9634E6",
  },
};

export default function NotificationsComponent() {
  const {
    list,
    listNotifications,
    markAsRead,
    markAllAsRead,
    isLoadingList,
    isLoadingReadAll,
  } = useNotifications();

  const load = React.useCallback(() => {
    listNotifications().catch(({ message }) => {
      toaster.create({
        description: message,
        type: "error",
        closable: true,
      });
    });
  }, [listNotifications]);

  React.useEffect(() => {
    load();
  }, []);

  const handleReadOne = async (id: number) => {
    await markAsRead(id)
      .then(load)
      .catch(({ message }) => {
        toaster.create({
          description: message,
          type: "error",
          closable: true,
        });
      });
  };

  const handleReadAll = async () => {
    await markAllAsRead()
      .then(() => {
        toaster.create({
          description: "Todas marcadas como lidas",
          type: "success",
        });
        load();
      })
      .catch(({ message }) => {
        toaster.create({
          description: message,
          type: "error",
          closable: true,
        });
      });
  };

  const hasUnread = list?.some((n) => !n.read_at);

  return (
    <Stack gap={6} w="full">
      <HStack justify="space-between" wrap="wrap" gap={3}>
        <HStack>
          <MdOutlineEmail size={26} color="#3B82F6" />
          <Text fontSize="22px" fontWeight={700}>
            Notificações
          </Text>
        </HStack>
        <ButtonAction
          variant="outline"
          borderRadius="full"
          borderColor="#3B82F6"
          color="#3B82F6"
          disabled={!hasUnread || isLoadingReadAll}
          loading={isLoadingReadAll}
          onClick={handleReadAll}
        >
          Marcar todas como lidas
        </ButtonAction>
      </HStack>

      {isLoadingList && (
        <Stack align="center" py={10}>
          <Spinner size="lg" color="#3B82F6" />
        </Stack>
      )}

      {!isLoadingList && list && list.length === 0 && (
        <Stack
          align="center"
          justify="center"
          border="1px dashed #D9D9D9"
          borderRadius="20px"
          py={16}
          color="#847F83"
        >
          <Text fontWeight={600}>Nada por aqui.</Text>
          <Text fontSize="14px">Você não tem notificações no momento.</Text>
        </Stack>
      )}

      {!isLoadingList && list && list.length > 0 && (
        <Stack gap={3}>
          {list.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onMarkRead={() => handleReadOne(n.id)}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}

function NotificationCard({
  notification,
  onMarkRead,
}: {
  notification: Notification;
  onMarkRead: () => void;
}) {
  const meta = TYPE_META[notification.type] ?? TYPE_META.administrative;
  const unread = !notification.read_at;

  return (
    <HStack
      align="flex-start"
      p={{ base: 4, md: 5 }}
      border="1px solid"
      borderColor={unread ? "#3B82F6" : "#D9D9D9"}
      bg={unread ? "#EFF6FF" : "white"}
      borderRadius="15px"
      gap={4}
    >
      <Icon
        as={meta.icon}
        boxSize={10}
        p={2}
        borderRadius="10px"
        bg="white"
        color={meta.color}
      />
      <Stack flex={1} gap={1}>
        <HStack justify="space-between" wrap="wrap">
          <HStack>
            <Text fontWeight={600} fontSize="16px">
              {notification.title}
            </Text>
            <Badge colorPalette={meta.colorPalette}>{meta.label}</Badge>
          </HStack>
          <Text fontSize="12px" color="#847F83">
            {dayjs(notification.created_at).format("DD/MM/YYYY HH:mm")}
          </Text>
        </HStack>
        <Text color="#555050">{notification.body}</Text>
      </Stack>
      {unread && (
        <IconButton
          aria-label="Marcar como lida"
          variant="plain"
          color="#3B82F6"
          onClick={onMarkRead}
        >
          <MdCheckCircle />
        </IconButton>
      )}
    </HStack>
  );
}
