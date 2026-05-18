import { NextRequest } from "next/server";
import { apiProxy, readJson } from "@/server/apiProxy";

export async function GET(req: NextRequest) {
  return apiProxy(req, "/tickets", "GET");
}

export async function POST(req: NextRequest) {
  const body = await readJson(req);
  return apiProxy(req, "/tickets", "POST", { body });
}
