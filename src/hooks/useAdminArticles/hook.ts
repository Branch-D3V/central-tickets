"use client";

import useFetch from "@/hooks/useFetch/hook";
import { Article, SaveArticlePayload } from "@/interfaces/Article";

export function useAdminArticles() {
  const [requestCreate, isLoadingCreate] = useFetch<Article>();
  const [requestUpdate, isLoadingUpdate] = useFetch<Article>();
  const [requestDelete, isLoadingDelete] = useFetch<null>();

  const createArticle = (payload: SaveArticlePayload) =>
    requestCreate("/api/admin/articles", { method: "POST", body: payload });

  const updateArticle = (
    id: number | string,
    payload: SaveArticlePayload
  ) =>
    requestUpdate(`/api/admin/articles/${id}`, {
      method: "PUT",
      body: payload,
    });

  const deleteArticle = (id: number | string) =>
    requestDelete(`/api/admin/articles/${id}`, { method: "DELETE" });

  return {
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingDelete,
    createArticle,
    updateArticle,
    deleteArticle,
  };
}

export default useAdminArticles;
