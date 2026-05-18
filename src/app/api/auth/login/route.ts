import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json();

  if (response.ok && payload?.data && payload?.token) {
    return NextResponse.json(
      { data: { ...payload.data, token: payload.token } },
      { status: response.status }
    );
  }

  return NextResponse.json(payload, { status: response.status });
}
