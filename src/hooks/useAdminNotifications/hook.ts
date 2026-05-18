"use client";

import useFetch from "@/hooks/useFetch/hook";
import {
  CreateNotificationPayload,
  Notification,
} from "@/interfaces/Notification";

export function useAdminNotifications() {
  const [requestCreate, isLoadingCreate] = useFetch<Notification>();
  const [requestDelete, isLoadingDelete] = useFetch<null>();

  const createNotification = (payload: CreateNotificationPayload) =>
    requestCreate("/api/admin/notifications", {
      method: "POST",
      body: payload,
    });

  const deleteNotification = (id: number | string) =>
    requestDelete(`/api/admin/notifications/${id}`, { method: "DELETE" });

  return {
    isLoadingCreate,
    isLoadingDelete,
    createNotification,
    deleteNotification,
  };
}

export default useAdminNotifications;
