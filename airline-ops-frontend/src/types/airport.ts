import { z } from "zod";

export const AirportSchema = z
  .object({
    airport_code: z.string(),
    airport_name: z.string(),
    airport_country: z.string(),
    airport_city: z.string(),
    airport_address: z.string(),
    longitude: z.string(),
    latitude: z.string()
  })
  .passthrough();

export const AirportListSchema = z.array(AirportSchema);

export type Airport = z.infer<typeof AirportSchema>;
