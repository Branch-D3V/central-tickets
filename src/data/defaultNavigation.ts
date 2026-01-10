"use client";

import { NavigationItem } from "@/interfaces/GeneralNavigations";

const defaultNavigation: Array<NavigationItem> = [
  {
    value: "/",
    label: "Inicio",
  },
  {
    value: "/fotos",
    label: "Fotos",
  },
  {
    value: "/videos",
    label: "Videos",
  },
  {
    value: "/planos",
    label: "Planos",
  },
  {
    value: "/sobre",
    label: "Sobre mim",
  },
];

export { defaultNavigation };
