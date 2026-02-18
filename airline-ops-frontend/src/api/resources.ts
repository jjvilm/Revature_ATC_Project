import { request } from "@/api/client";
import { AircraftListSchema } from "@/types/aircraft";
import { EmployeeListSchema } from "@/types/employees";

export function getAllAircraft() {
  return request({
    method: "GET",
    path: "/aircraft/all",
    schema: AircraftListSchema
  });
}

export function getAvailableAircraft(airportCode: string) {
  return request({
    method: "GET",
    path: `/aircraft/available/${encodeURIComponent(airportCode)}`,
    schema: AircraftListSchema
  });
}

export function getAvailableEmployees(airportCode: string) {
  return request({
    method: "GET",
    path: `/employee/available/${encodeURIComponent(airportCode)}`,
    schema: EmployeeListSchema
  });
}

export function fixAircraft(payload: { aircraft_id: string }) {
  return request({
    method: "PATCH",
    path: "/aircraft/fix/",
    body: payload
  });
}
