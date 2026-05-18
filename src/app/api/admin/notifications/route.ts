import { NextRequest } from "next/server";
import { apiProxy, readJson } from "@/server/apiProxy";

export async function POST(req: NextRequest) {
  const body = await readJson(req);
  return apiProxy(req, "/admin/notifications", "POST", { body });
}
