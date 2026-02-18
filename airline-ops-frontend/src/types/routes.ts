import { z } from "zod";
import { UUIDish } from "@/types/common";

export const RouteSchema = z
  .object({
    route_id: UUIDish,
    origin_airport_code: z.string().min(3).max(3),
    destination_airport_code: z.string().min(3).max(3)
  })
  .passthrough();

export const RouteListSchema = z.array(RouteSchema);

export const RouteCreateSchema = z.object({
  origin_airport_code: z.string().min(3).max(3),
  destination_airport_code: z.string().min(3).max(3)
});

export const RouteDeleteSchema = z.object({
  route_id: UUIDish,
  authorization_code: z.string().min(1)
});

export type Route = z.infer<typeof RouteSchema>;
