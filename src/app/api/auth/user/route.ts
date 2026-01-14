import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization");

  if (!token) {
    return NextResponse.json(
      { message: "Token não encontrado" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const userId = body.userId;

  if (!userId) {
    return NextResponse.json({ message: "ID não encontrado" }, { status: 401 });
  }
  const response = await fetch(`${baseUrl}/usuario/${userId}/trocar-senha/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function PUT(req: Request) {
  const token = req.headers.get("authorization");

  const body = await req.json();
  const userId = body.userId;

  const res = await fetch(`${baseUrl}/usuario/${userId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
