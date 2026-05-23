import { NextRequest } from "next/server";
import { apiProxy } from "@/server/apiProxy";

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const formData = await req.formData();
  return apiProxy(req, `/tickets/${id}/attachments`, "POST", {
    rawBody: formData,
  });
}
