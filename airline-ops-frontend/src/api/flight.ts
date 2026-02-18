import { request } from "@/api/client";
import {
  FlightCrewListSchema,
  FlightIdSchema,
  FlightListSchema,
  FlightReadSchema,
  ScheduleFlightSchema,
  DelayFlightSchema,
  ReplaceAircraftSchema
} from "@/types/flight";

export function getAllFlights() {
  return request({ method: "GET", path: "/flight/all", schema: FlightListSchema });
}

export function scheduleFlight(payload: unknown) {
  const body = ScheduleFlightSchema.parse(payload);
  return request({ method: "POST", path: "/flight/schedule/", body, schema: FlightReadSchema });
}

export function scheduleFlightCrew(payload: unknown) {
  const body = FlightCrewListSchema.input.parse(payload);
  return request({ method: "POST", path: "/flight/crew", body, schema: FlightCrewListSchema.output });
}

export function delayFlight(payload: unknown) {
  const body = DelayFlightSchema.parse(payload);
  return request({ method: "PATCH", path: "/flight/delay/", body, schema: FlightReadSchema });
}

export function launchFlight(payload: unknown) {
  const body = FlightIdSchema.parse(payload);
  return request({ method: "PATCH", path: "/flight/launch/", body, schema: FlightReadSchema });
}

export function landFlight(payload: unknown) {
  const body = FlightIdSchema.parse(payload);
  return request({ method: "PATCH", path: "/flight/land/", body });
}

export function cancelFlight(payload: unknown) {
  const body = FlightIdSchema.parse(payload);
  return request({ method: "PATCH", path: "/flight/cancel", body, schema: FlightReadSchema });
}

export function replaceAircraft(payload: unknown) {
  const body = ReplaceAircraftSchema.parse(payload);
  return request({ method: "PATCH", path: "/flight/replace/", body, schema: FlightReadSchema });
}
