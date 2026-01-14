import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
