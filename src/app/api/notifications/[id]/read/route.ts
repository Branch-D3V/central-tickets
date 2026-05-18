import { NextRequest } from "next/server";
import { apiProxy } from "@/server/apiProxy";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return apiProxy(req, `/notifications/${id}/read`, "PATCH", { body: {} });
}
