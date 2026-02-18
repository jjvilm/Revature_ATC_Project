import { z } from "zod";
import { UUIDish } from "@/types/common";

export const AircraftStatusSchema = z.enum(["AVAILABLE", "DEPLOYED", "MAINTENANCE"]).catch("AVAILABLE");

export const AircraftSchema = z
  .object({
    aircraft_id: UUIDish,
    manufacturer: z.string().optional(),
    aircraft_model: z.string().optional(),
    current_distance: z.number().optional(),
    maintenance_interval: z.number().optional(),
    aircraft_status: z.string().optional(),
    aircraft_location: z.string().optional()
  })
  .passthrough();

export const AircraftListSchema = z.array(AircraftSchema);
export type Aircraft = z.infer<typeof AircraftSchema>;
