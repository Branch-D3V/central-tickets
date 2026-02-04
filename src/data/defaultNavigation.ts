"use client";

import { NavigationItem } from "@/interfaces/GeneralNavigations";
import { TiTicket, FaPlus, RxDashboard } from "@/components/Icons";

const defaultNavigation: Array<NavigationItem> = [
  {
    value: "/dashboard",
    label: "Dashboard",
    icon: RxDashboard,
  },
  {
    value: "/tickets",
    label: "Meus Tickets",
    icon: TiTicket,
  },
  {
    value: "/novo-ticket",
    label: "Novo Ticket",
    icon: FaPlus,
  },
];

export { defaultNavigation };
