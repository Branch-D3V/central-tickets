import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const cookiesState = await cookies();
  const token = cookiesState.get("token")?.value;

  const res = await fetch(`${baseUrl}/auth/ativo?auth_token=${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
