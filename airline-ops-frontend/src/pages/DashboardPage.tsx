import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { fmtDateTime } from "@/lib/date";
import { readJson } from "@/lib/storage";
import { getAllFlights } from "@/api/flight";
import { listRoutes } from "@/api/routes";
import { listAirports } from "@/api/airports";
import { getAllAircraft } from "@/api/resources";
import type { FlightRead } from "@/types/flight";
import type { Airport } from "@/types/airport";

const RECENT_FLIGHTS_KEY = "ao.recentFlights.v1";

type GeoAirport = Airport & { lat: number; lon: number };
type FlightSegment = {
  flight: FlightRead;
  routeId: string;
  origin: GeoAirport;
  destination: GeoAirport;
  overlapIndex: number;
  overlapTotal: number;
};

const USA_CENTER: LatLngExpression = [39.5, -98.35];

function formatFlightName(flightId?: string) {
  if (!flightId) {
    return "—";
  }
  return `FL-${flightId.slice(0, 8).toUpperCase()}`;
}

function formatAircraftName(manufacturer?: string, aircraftModel?: string) {
  const make = (manufacturer ?? "").trim();
  const model = (aircraftModel ?? "").trim();
  if (make && model) {
    return `${make} ${model}`;
  }
  if (make) {
    return make;
  }
  if (model) {
    return model;
  }
  return "Unknown aircraft";
}

function statusTone(status?: string) {
  switch (status) {
    case "ARRIVED":
      return "ok";
    case "IN-FLIGHT":
    case "SCHEDULED":
      return "info";
    case "DELAYED":
      return "warn";
    case "CANCELLED":
      return "bad";
    default:
      return "neutral";
  }
}

function flightPathStrokeClass(status?: string) {
  switch (status) {
    case "ARRIVED":
      return "stroke-emerald-400/80";
    case "IN-FLIGHT":
      return "stroke-sky-400/90";
    case "SCHEDULED":
      return "stroke-zinc-300/80";
    case "DELAYED":
      return "stroke-amber-400/90";
    case "CANCELLED":
      return "stroke-rose-400/90";
    default:
      return "stroke-zinc-500/70";
  }
}

function flightPathColor(status?: string) {
  switch (status) {
    case "ARRIVED":
      return "#34d399";
    case "IN-FLIGHT":
      return "#38bdf8";
    case "SCHEDULED":
      return "#e4e4e7";
    case "DELAYED":
      return "#f59e0b";
    case "CANCELLED":
      return "#fb7185";
    default:
      return "#71717a";
  }
}

function buildCurvedPath(segment: FlightSegment): LatLngExpression[] {
  const startLat = segment.origin.lat;
  const startLon = segment.origin.lon;
  const endLat = segment.destination.lat;
  const endLon = segment.destination.lon;

  const midLat = (startLat + endLat) / 2;
  const midLon = (startLon + endLon) / 2;

  const dx = endLon - startLon;
  const dy = endLat - startLat;
  const length = Math.max(Math.sqrt(dx * dx + dy * dy), 0.0001);

  const normalX = -dy / length;
  const normalY = dx / length;

  const spreadIndex = segment.overlapIndex - (segment.overlapTotal - 1) / 2;
  const curvature = Math.max(0.8, length * 0.25) * 0.15;
  const offset = spreadIndex * curvature;

  const controlLon = midLon + normalX * offset;
  const controlLat = midLat + normalY * offset;

  const points: LatLngExpression[] = [];
  const steps = 20;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const omt = 1 - t;
    const lon = omt * omt * startLon + 2 * omt * t * controlLon + t * t * endLon;
    const lat = omt * omt * startLat + 2 * omt * t * controlLat + t * t * endLat;
    points.push([lat, lon]);
  }

  return points;
}

export default function DashboardPage() {
  const recent = readJson<FlightRead[]>(RECENT_FLIGHTS_KEY, []);
  const flightsQ = useQuery({ queryKey: ["flights", "all"], queryFn: getAllFlights });
  const routesQ = useQuery({ queryKey: ["routes", "all"], queryFn: listRoutes });
  const airportsQ = useQuery({ queryKey: ["airports", "all"], queryFn: listAirports });
  const aircraftQ = useQuery({ queryKey: ["aircraft", "all"], queryFn: getAllAircraft });

  const kpis = useMemo(() => {
    const total = recent.length;
    const byStatus = recent.reduce<Record<string, number>>((acc, f) => {
      const s = f.flight_status ?? "UNKNOWN";
      acc[s] = (acc[s] ?? 0) + 1;
      return acc;
    }, {});
    return { total, byStatus };
  }, [recent]);

  const topStatuses = Object.entries(kpis.byStatus).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const routeLabelById = useMemo(() => {
    const routes = routesQ.data ?? [];
    return new Map(
      routes.map((route) => [route.route_id, `${route.origin_airport_code} → ${route.destination_airport_code}`])
    );
  }, [routesQ.data]);

  const aircraftLabelById = useMemo(() => {
    const aircraftList = aircraftQ.data ?? [];
    return new Map(
      aircraftList.map((aircraft) => [
        aircraft.aircraft_id,
        formatAircraftName(aircraft.manufacturer, aircraft.aircraft_model)
      ])
    );
  }, [aircraftQ.data]);

  const mapData = useMemo(() => {
    const flights = flightsQ.data ?? [];
    const routes = routesQ.data ?? [];
    const airports = airportsQ.data ?? [];

    const airportByCode = new Map(
      airports
        .map((airport) => {
          const lat = Number(airport.latitude);
          const lon = Number(airport.longitude);
          if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
            return null;
          }
          return [airport.airport_code, { ...airport, lat, lon }] as const;
        })
        .filter((entry): entry is readonly [string, GeoAirport] => entry != null)
    );

    const routeById = new Map(routes.map((route) => [route.route_id, route]));

    const rawSegments = flights
      .map((flight) => {
        if (!flight.route_id) {
          return null;
        }
        const route = routeById.get(flight.route_id);
        if (!route) {
          return null;
        }

        const origin = airportByCode.get(route.origin_airport_code);
        const destination = airportByCode.get(route.destination_airport_code);
        if (!origin || !destination) {
          return null;
        }

        return {
          flight,
          routeId: route.route_id,
          origin,
          destination
        };
      })
      .filter((item): item is NonNullable<typeof item> => item != null);

    const grouped = new Map<string, typeof rawSegments>();
    for (const segment of rawSegments) {
      const key = [segment.origin.airport_code, segment.destination.airport_code].sort().join("::");
      const bucket = grouped.get(key) ?? [];
      bucket.push(segment);
      grouped.set(key, bucket);
    }

    const segments: FlightSegment[] = [];
    for (const bucket of grouped.values()) {
      bucket.forEach((segment, index) => {
        segments.push({
          ...segment,
          overlapIndex: index,
          overlapTotal: bucket.length
        });
      });
    }

    const airportsGeo = Array.from(airportByCode.values());

    return { segments, airportsGeo };
  }, [airportsQ.data, flightsQ.data, routesQ.data]);

  const mapBounds = useMemo(() => {
    if (!mapData.airportsGeo.length) {
      return null;
    }

    const minLat = Math.min(...mapData.airportsGeo.map((airport) => airport.lat));
    const maxLat = Math.max(...mapData.airportsGeo.map((airport) => airport.lat));
    const minLon = Math.min(...mapData.airportsGeo.map((airport) => airport.lon));
    const maxLon = Math.max(...mapData.airportsGeo.map((airport) => airport.lon));

    return [
      [minLat - 1.2, minLon - 1.8],
      [maxLat + 1.2, maxLon + 1.8]
    ] as [[number, number], [number, number]];
  }, [mapData.airportsGeo]);

  const mapLoading = flightsQ.isLoading || routesQ.isLoading || airportsQ.isLoading;
  const mapError = flightsQ.isError || routesQ.isError || airportsQ.isError;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold">Dashboard</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="text-xs text-zinc-400">Flights touched (client-side)</div>
            <div className="mt-1 text-lg font-semibold">{kpis.total}</div>
          </CardHeader>
          <CardContent className="text-xs text-zinc-500">
            Reflects flight actions captured locally in this browser.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="text-xs text-zinc-400">Status distribution</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {topStatuses.length ? (
                topStatuses.map(([s, n]) => (
                  <Badge key={s} tone={statusTone(s) as any}>
                    {s}: {n}
                  </Badge>
                ))
              ) : (
                <Badge tone="neutral">No data yet</Badge>
              )}
            </div>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">Flights map (all flights)</div>
              <div className="text-xs text-zinc-500">Drawn from /flight/all, /route/all, and /airport/all</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone="info">Flights: {mapData.segments.length}</Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge tone="neutral">SCHEDULED</Badge>
            <Badge tone="info">IN-FLIGHT</Badge>
            <Badge tone="ok">ARRIVED</Badge>
            <Badge tone="warn">DELAYED</Badge>
            <Badge tone="bad">CANCELLED</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {mapLoading && <div className="text-xs text-zinc-400">Loading map data…</div>}
          {mapError && <div className="text-xs text-rose-300">Unable to load map data from API endpoints.</div>}
          {!mapLoading && !mapError && !mapData.airportsGeo.length && (
            <div className="text-xs text-zinc-400">No airport coordinates available.</div>
          )}
          {!mapLoading && !mapError && !!mapData.airportsGeo.length && (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
              <MapContainer
                className="h-[420px] w-full"
                center={USA_CENTER}
                zoom={4}
                bounds={mapBounds ?? undefined}
                scrollWheelZoom
                preferCanvas
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {mapData.segments.map((segment) => (
                  <Polyline
                    key={segment.flight.flight_id}
                    positions={buildCurvedPath(segment)}
                    className={`flight-path ${flightPathStrokeClass(segment.flight.flight_status)}`}
                    pathOptions={{
                      color: flightPathColor(segment.flight.flight_status),
                      weight: 3,
                      opacity: 0.85,
                      lineCap: "round",
                      dashArray: segment.flight.flight_status === "DELAYED" ? "8 8" : undefined
                    }}
                  >
                    <Tooltip sticky opacity={1} className="flight-tooltip">
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-white">
                          {formatFlightName(segment.flight.flight_id)} · {segment.flight.flight_status ?? "UNKNOWN"}
                        </div>
                        <div className="text-xs text-zinc-100">
                          {segment.origin.airport_code} → {segment.destination.airport_code}
                        </div>
                        <div className="font-mono text-[11px] text-zinc-200">Flight ID: {segment.flight.flight_id}</div>
                        <div className="font-mono text-[11px] text-zinc-200">Route ID: {segment.routeId}</div>
                      </div>
                    </Tooltip>
                  </Polyline>
                ))}

                {mapData.airportsGeo.map((airport) => (
                  <CircleMarker
                    key={airport.airport_code}
                    center={[airport.lat, airport.lon]}
                    radius={6}
                    pathOptions={{ color: "#0f172a", fillColor: "#f4f4f5", fillOpacity: 0.95, weight: 1.5 }}
                  >
                    <Tooltip direction="top" offset={[0, -6]}>
                      {airport.airport_code} · {airport.airport_city}
                    </Tooltip>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Recent flights (local)</div>
              <div className="text-xs text-zinc-500">Captured from schedule/delay/launch/land/cancel/replace responses</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            rows={recent.slice(0, 10)}
            keyFn={(r) => r.flight_id}
            emptyTitle="No recent flights"
            emptyDescription="Once you schedule or update a flight, it will appear here."
            columns={[
              {
                header: "Flight",
                cell: (r) => (
                  <div>
                    <div className="text-xs font-semibold text-zinc-100">{formatFlightName(r.flight_id)}</div>
                    <div className="font-mono text-xs text-zinc-400">{r.flight_id}</div>
                  </div>
                )
              },
              {
                header: "Status",
                cell: (r) => <Badge tone={statusTone(r.flight_status) as any}>{r.flight_status ?? "UNKNOWN"}</Badge>
              },
              {
                header: "Route",
                cell: (r) => {
                  const routeLabel = r.route_id ? routeLabelById.get(r.route_id) : undefined;
                  return (
                    <div>
                      <div className="text-xs font-semibold text-zinc-100">{routeLabel ?? "Unknown route"}</div>
                      <div className="font-mono text-xs text-zinc-400">{r.route_id ?? "—"}</div>
                    </div>
                  );
                }
              },
              {
                header: "Aircraft",
                cell: (r) => {
                  const aircraftLabel = r.aircraft_id ? aircraftLabelById.get(r.aircraft_id) : undefined;
                  return (
                    <div>
                      <div className="text-xs font-semibold text-zinc-100">{aircraftLabel ?? "Unknown aircraft"}</div>
                      <div className="font-mono text-xs text-zinc-400">{r.aircraft_id ?? "—"}</div>
                    </div>
                  );
                }
              },
              {
                header: "Departure",
                cell: (r) => <div className="text-xs">{fmtDateTime(r.departure_time)}</div>
              },
              {
                header: "Arrival",
                cell: (r) => <div className="text-xs">{fmtDateTime(r.arrival_time)}</div>
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
