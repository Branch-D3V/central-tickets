import { NextRequest } from "next/server";
import { apiProxy } from "@/server/apiProxy";

export async function GET(req: NextRequest) {
  return apiProxy(req, "/articles", "GET");
}
