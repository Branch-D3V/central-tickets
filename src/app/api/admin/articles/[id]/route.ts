import { NextRequest } from "next/server";
import { apiProxy, readJson } from "@/server/apiProxy";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await readJson(req);
  return apiProxy(req, `/admin/articles/${id}`, "PUT", { body });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return apiProxy(req, `/admin/articles/${id}`, "DELETE");
}
