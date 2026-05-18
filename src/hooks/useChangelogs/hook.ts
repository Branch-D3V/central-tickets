"use client";

import useFetch from "@/hooks/useFetch/hook";
import { Changelog } from "@/interfaces/Changelog";

export function useChangelogs() {
  const [requestList, isLoadingList, list, pagination] =
    useFetch<Changelog[]>();

  const listChangelogs = () =>
    requestList("/api/changelogs", { method: "GET" });

  return {
    list,
    pagination,
    isLoadingList,
    listChangelogs,
  };
}

export default useChangelogs;
