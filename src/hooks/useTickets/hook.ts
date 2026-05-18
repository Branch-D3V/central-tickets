"use client";

import useFetch from "@/hooks/useFetch/hook";
import {
  CreateTicketPayload,
  SendTicketMessagePayload,
  Ticket,
  TicketMessage,
  UpdateTicketPayload,
} from "@/interfaces/Ticket";

export interface ListTicketsParams {
  status?: string;
  priority?: string;
  type?: string;
  page?: number;
  per_page?: number;
  search?: string;
}

export function useTickets() {
  const [requestList, isLoadingList, list, pagination] = useFetch<Ticket[]>();
  const [requestCreate, isLoadingCreate] = useFetch<Ticket>();
  const [requestDetail, isLoadingDetail, detail] = useFetch<Ticket>();
  const [requestUpdate, isLoadingUpdate] = useFetch<Ticket>();
  const [requestSendMessage, isLoadingSendMessage] = useFetch<TicketMessage>();

  const listTickets = (params?: ListTicketsParams) =>
    requestList("/api/tickets", { method: "GET", params });

  const createTicket = (payload: CreateTicketPayload) =>
    requestCreate("/api/tickets", { method: "POST", body: payload });

  const getTicket = (id: number | string) =>
    requestDetail(`/api/tickets/${id}`, { method: "GET" });

  const updateTicket = (id: number | string, payload: UpdateTicketPayload) =>
    requestUpdate(`/api/tickets/${id}`, { method: "PUT", body: payload });

  const sendMessage = (
    id: number | string,
    payload: SendTicketMessagePayload
  ) =>
    requestSendMessage(`/api/tickets/${id}/messages`, {
      method: "POST",
      body: payload,
    });

  return {
    list,
    detail,
    pagination,
    isLoadingList,
    isLoadingDetail,
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingSendMessage,
    listTickets,
    createTicket,
    getTicket,
    updateTicket,
    sendMessage,
  };
}

export default useTickets;
