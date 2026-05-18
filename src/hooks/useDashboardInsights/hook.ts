"use client";

import useFetch from "@/hooks/useFetch/hook";
import { DashboardInsights } from "@/interfaces/DashboardInsights";

export function useDashboardInsights() {
  const [request, isLoading, data] = useFetch<DashboardInsights>();

  const fetchInsights = () =>
    request("/api/dashboard/insights", { method: "GET" });

  return { fetchInsights, isLoading, data };
}

export default useDashboardInsights;
