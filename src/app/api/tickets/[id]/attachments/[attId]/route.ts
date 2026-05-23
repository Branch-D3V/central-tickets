import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type Params = { params: Promise<{ id: string; attId: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id, attId } = await params;
  const cookiesState = await cookies();
  const token = cookiesState.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Token não encontrado" },
      { status: 401 }
    );
  }

  const upstream = await fetch(`${baseUrl}/tickets/${id}/attachments/${attId}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    return NextResponse.json(
      { message: text || "Falha ao baixar anexo" },
      { status: upstream.status }
    );
  }

  const headers = new Headers();
  const contentType = upstream.headers.get("content-type");
  const contentDisposition = upstream.headers.get("content-disposition");
  const contentLength = upstream.headers.get("content-length");
  if (contentType) headers.set("content-type", contentType);
  if (contentDisposition) headers.set("content-disposition", contentDisposition);
  if (contentLength) headers.set("content-length", contentLength);

  return new NextResponse(upstream.body, {
    status: 200,
    headers,
  });
}
