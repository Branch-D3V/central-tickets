"use client";

import { NavigationItem } from "@/interfaces/GeneralNavigations";

const defaultNavigation: Array<NavigationItem> = [
  {
    value: "/dashboard",
    label: "Dashboard",
  },
  {
    value: "/tickets",
    label: "Meus Tickets",
  },
  {
    value: "/novo-ticket",
    label: "Novo Ticket",
  },
];

export { defaultNavigation };
