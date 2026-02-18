import { request } from "@/api/client";
import { RouteCreateSchema, RouteDeleteSchema, RouteListSchema, RouteSchema } from "@/types/routes";

export function listRoutes() {
  return request({ method: "GET", path: "/route/all", schema: RouteListSchema });
}

export function getRoute(routeId: string) {
  return request({ method: "GET", path: `/route/${encodeURIComponent(routeId)}`, schema: RouteSchema });
}

export function createRoute(payload: unknown) {
  const body = RouteCreateSchema.parse(payload);
  return request({ method: "POST", path: "/route/", body, schema: RouteSchema });
}

export function deletionProposal(routeId: string) {
  return request({ method: "GET", path: `/route/deletion_proposal/${encodeURIComponent(routeId)}` });
}

export function deleteRoute(payload: unknown) {
  const body = RouteDeleteSchema.parse(payload);
  return request({ method: "DELETE", path: "/route", body });
}
