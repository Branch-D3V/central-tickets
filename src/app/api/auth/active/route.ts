import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const cookiesState = await cookies();
  const token = cookiesState.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Token não encontrado" },
      { status: 401 }
    );
  }

  const res = await fetch(`${baseUrl}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const payload = await res.json();

  if (res.ok && payload?.data) {
    return NextResponse.json(
      {
        data: { ...payload.data, token },
        message: "Token ativo",
      },
      { status: res.status }
    );
  }

  return NextResponse.json(payload, { status: res.status });
}
