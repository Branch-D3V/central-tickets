export interface Options {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: Record<string, unknown> | FormData;
  params?: Record<string, unknown>;
}

export interface FetchResponse<T> {
  data: T;
  message: string | null;
  // Colocar a tipagem da paginação quando consultar a API
}
