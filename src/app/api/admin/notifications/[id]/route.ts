import { NextRequest } from "next/server";
import { apiProxy } from "@/server/apiProxy";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return apiProxy(req, `/admin/notifications/${id}`, "DELETE");
}
