import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type ProxyMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ProxyOptions {
  forwardQuery?: boolean;
  body?: unknown;
  rawBody?: BodyInit | null;
  contentType?: string | null;
}

export async function apiProxy(
  req: NextRequest,
  path: string,
  method: ProxyMethod,
  options: ProxyOptions = {}
) {
  const cookiesState = await cookies();
  const token = cookiesState.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Token não encontrado" },
      { status: 401 }
    );
  }

  const query =
    options.forwardQuery !== false ? req.nextUrl.search ?? "" : "";

  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  let body: BodyInit | null = null;

  if (method !== "GET" && method !== "DELETE") {
    if (options.rawBody !== undefined) {
      body = options.rawBody;
      if (options.contentType) headers["Content-Type"] = options.contentType;
    } else if (options.body !== undefined) {
      body = JSON.stringify(options.body);
      headers["Content-Type"] = options.contentType ?? "application/json";
    }
  }

  const res = await fetch(`${baseUrl}${path}${query}`, {
    method,
    headers,
    body,
    cache: "no-store",
  });

  const text = await res.text();
  const payload = text ? safeJson(text) : null;

  return NextResponse.json(payload, { status: res.status });
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

export async function readJson<T = unknown>(req: NextRequest): Promise<T> {
  return (await req.json()) as T;
}
