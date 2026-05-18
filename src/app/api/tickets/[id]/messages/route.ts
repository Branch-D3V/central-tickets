import { NextRequest } from "next/server";
import { apiProxy, readJson } from "@/server/apiProxy";

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await readJson(req);
  return apiProxy(req, `/tickets/${id}/messages`, "POST", { body });
}
