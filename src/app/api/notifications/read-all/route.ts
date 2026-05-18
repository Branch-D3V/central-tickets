import { NextRequest } from "next/server";
import { apiProxy } from "@/server/apiProxy";

export async function PATCH(req: NextRequest) {
  return apiProxy(req, "/notifications/read-all", "PATCH", { body: {} });
}
