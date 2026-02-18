import { z } from "zod";
import { DateTimeString, UUIDish } from "@/types/common";

export const FlightStatusSchema = z.enum(["SCHEDULED", "IN-FLIGHT", "ARRIVED", "DELAYED", "CANCELLED"]);

export const FlightReadSchema = z
  .object({
    flight_id: UUIDish,
    route_id: UUIDish.optional(),
    flight_status: z.union([FlightStatusSchema, z.string()]).optional(),
    aircraft_id: UUIDish.optional(),
    arrival_time: z.union([DateTimeString, z.string()]).optional(),
    departure_time: z.union([DateTimeString, z.string()]).optional()
  })
  .passthrough();

export type FlightRead = z.infer<typeof FlightReadSchema>;

export const FlightListSchema = z.array(FlightReadSchema);

export const ScheduleFlightSchema = z.object({
  route_id: UUIDish,
  aircraft_id: UUIDish,
  arrival_time: DateTimeString,
  departure_time: DateTimeString
});

export const FlightIdSchema = z.object({
  flight_id: UUIDish
});

export const DelayFlightSchema = z.object({
  flight_id: UUIDish,
  extra_minutes: z.number().int().positive()
});

export const ReplaceAircraftSchema = z.object({
  flight_id: UUIDish,
  aircraft_id: UUIDish
});

export const FlightCrewScheduleRequestSchema = z.object({
  flight_id: UUIDish,
  employee_ids: z.array(UUIDish).min(1)
});

export const FlightCrewReadSchema = z
  .object({
    flight_id: UUIDish,
    employee_id: UUIDish
  })
  .passthrough();

export const FlightCrewListSchema = {
  input: FlightCrewScheduleRequestSchema,
  output: z.array(FlightCrewReadSchema)
};
