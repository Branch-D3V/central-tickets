"use client";

import { NavigationItem } from "@/interfaces/GeneralNavigations";
import {
  TiTicket,
  FaPlus,
  RxDashboard,
  MdOutlineEmail,
} from "@/components/Icons";

const defaultNavigation: Array<NavigationItem> = [
  {
    value: "/dashboard",
    label: "Dashboard",
    icon: RxDashboard,
  },
  {
    value: "/tickets",
    label: "Tickets",
    icon: TiTicket,
  },
  {
    value: "/novo-ticket",
    label: "Novo Ticket",
    icon: FaPlus,
  },
  {
    value: "/notifications",
    label: "Notificações",
    icon: MdOutlineEmail,
  },
];

export { defaultNavigation };
