"use client";

import { useUser } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  const { isAuthenticated, isLoadingValidateToken } = useUser();

  React.useEffect(() => {
    if (isLoadingValidateToken) return;
    redirect(isAuthenticated ? "/dashboard" : "/login");
  }, [isAuthenticated, isLoadingValidateToken]);

  return null;
}
