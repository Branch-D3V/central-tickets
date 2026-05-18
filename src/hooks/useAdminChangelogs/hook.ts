"use client";

import useFetch from "@/hooks/useFetch/hook";
import { Changelog, SaveChangelogPayload } from "@/interfaces/Changelog";

export function useAdminChangelogs() {
  const [requestCreate, isLoadingCreate] = useFetch<Changelog>();
  const [requestUpdate, isLoadingUpdate] = useFetch<Changelog>();
  const [requestDelete, isLoadingDelete] = useFetch<null>();

  const createChangelog = (payload: SaveChangelogPayload) =>
    requestCreate("/api/admin/changelogs", {
      method: "POST",
      body: payload,
    });

  const updateChangelog = (
    id: number | string,
    payload: SaveChangelogPayload
  ) =>
    requestUpdate(`/api/admin/changelogs/${id}`, {
      method: "PUT",
      body: payload,
    });

  const deleteChangelog = (id: number | string) =>
    requestDelete(`/api/admin/changelogs/${id}`, { method: "DELETE" });

  return {
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingDelete,
    createChangelog,
    updateChangelog,
    deleteChangelog,
  };
}

export default useAdminChangelogs;
