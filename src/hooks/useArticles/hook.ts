"use client";

import useFetch from "@/hooks/useFetch/hook";
import { Article } from "@/interfaces/Article";

export interface ListArticlesParams {
  category?: string;
  search?: string;
  page?: number;
  per_page?: number;
}

export function useArticles() {
  const [requestList, isLoadingList, list, pagination] = useFetch<Article[]>();
  const [requestDetail, isLoadingDetail, detail] = useFetch<Article>();

  const listArticles = (params?: ListArticlesParams) =>
    requestList("/api/articles", { method: "GET", params });

  const getArticle = (id: number | string) =>
    requestDetail(`/api/articles/${id}`, { method: "GET" });

  return {
    list,
    detail,
    pagination,
    isLoadingList,
    isLoadingDetail,
    listArticles,
    getArticle,
  };
}

export default useArticles;
