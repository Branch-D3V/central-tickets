import {NextRequest, NextResponse} from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const referer = req.headers.get("referer") ?? "";
  const origin = referer ? new URL(referer).origin : "";

  const body = await req.json();

  const response = await fetch(`${baseUrl}/auth/login/`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: origin
    }),
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return NextResponse.json(data, {status: response.status});
}
