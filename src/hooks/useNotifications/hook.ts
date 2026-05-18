"use client";

import useFetch from "@/hooks/useFetch/hook";
import { Notification } from "@/interfaces/Notification";

export function useNotifications() {
  const [requestList, isLoadingList, list, pagination] =
    useFetch<Notification[]>();
  const [requestRead, isLoadingRead] = useFetch<Notification>();
  const [requestReadAll, isLoadingReadAll] = useFetch<null>();

  const listNotifications = () =>
    requestList("/api/notifications", { method: "GET" });

  const markAsRead = (id: number | string) =>
    requestRead(`/api/notifications/${id}/read`, { method: "PATCH" });

  const markAllAsRead = () =>
    requestReadAll("/api/notifications/read-all", { method: "PATCH" });

  return {
    list,
    pagination,
    isLoadingList,
    isLoadingRead,
    isLoadingReadAll,
    listNotifications,
    markAsRead,
    markAllAsRead,
  };
}

export default useNotifications;
