import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
  const cookiesState = await cookies();
  const token = cookiesState.get("token")?.value;

  const params = request.url.split("?")[1];
  const res = await fetch(`${baseUrl}/midia/` + (params ? `?${params}` : ""), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${token}`,
    },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: NextRequest) {
  const cookiesState = await cookies();
  const token = cookiesState.get("token")?.value;

  const formData = await req.formData();

  const response = await fetch(`${baseUrl}/midia/`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      Accept: "application/json",
    },
    body: formData,
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
