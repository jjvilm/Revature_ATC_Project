import { request } from "@/api/client";
import { AirportListSchema } from "@/types/airport";

export function listAirports() {
  return request({ method: "GET", path: "/airport/all", schema: AirportListSchema });
}
