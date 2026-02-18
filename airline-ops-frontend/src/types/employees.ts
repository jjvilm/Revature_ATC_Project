import { z } from "zod";
import { UUIDish } from "@/types/common";

export const EmployeePositionSchema = z.enum([
  "CAPTAIN",
  "COPILOT",
  "FLIGHT_MANAGER",
  "FLIGHT_ATTENDANT"
]);

export const InFlightStatusSchema = z.enum(["AVAILABLE", "SCHEDULED"]);

export const EmployeeSchema = z
  .object({
    employee_id: UUIDish,
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    position: z.union([EmployeePositionSchema, z.string()]).optional(),
    employee_status: z.union([InFlightStatusSchema, z.string()]).optional(),
    supervisor: z.string().optional(),
    employee_location: z.string().optional()
  })
  .passthrough();

export const EmployeeListSchema = z.array(EmployeeSchema);
export type Employee = z.infer<typeof EmployeeSchema>;
