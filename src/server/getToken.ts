"use client";

import { parseCookies } from "nookies";

export function getTokenClient() {
  const { token } = parseCookies();
  return token || null;
}
