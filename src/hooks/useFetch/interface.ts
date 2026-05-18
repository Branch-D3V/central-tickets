export interface Options {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: HeadersInit;
  body?: object | FormData;
  params?: object;
}

export interface FetchResponse<T> {
  data: T;
  message: string | null;
}
