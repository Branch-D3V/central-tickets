"use client";

import useFetch from "@/hooks/useFetch/hook";
import { ImportUsersBody } from "@/interfaces/ImportUser";

export function useAdminUsers() {
  const [requestImport, isLoadingImport] = useFetch<{ imported: number }>();

  const importUsers = (payload: ImportUsersBody) =>
    requestImport("/api/admin/users/import", {
      method: "POST",
      body: payload as unknown as Record<string, unknown>,
    });

  return { isLoadingImport, importUsers };
}

export default useAdminUsers;
