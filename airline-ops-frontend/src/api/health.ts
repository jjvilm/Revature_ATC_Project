import { z } from "zod";
import { request } from "@/api/client";

const StatusSchema = z.object({
  Status: z.string()
});

export function getStatus() {
  return request({ method: "GET", path: "/status", schema: StatusSchema });
}
