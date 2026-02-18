import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getAllAircraft, getAvailableEmployees, fixAircraft } from "@/api/resources";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { Input, Label } from "@/components/ui/Field";
import { Badge } from "@/components/ui/Badge";
import type { Aircraft } from "@/types/aircraft";
import type { Employee } from "@/types/employees";

function aircraftTone(status?: string) {
  switch (status) {
    case "AVAILABLE":
      return "ok";
    case "DEPLOYED":
      return "info";
    case "MAINTENANCE":
      return "warn";
    default:
      return "neutral";
  }
}

export default function ResourcesPage() {
  const [airport, setAirport] = useState("JFK");
  const [recentRepairs, setRecentRepairs] = useState<string[]>([]);

  const allAircraftQ = useQuery({
    queryKey: ["resources", "aircraft", "all"],
    queryFn: getAllAircraft
  });

  const employeesQ = useQuery({
    queryKey: ["resources", "employees", airport],
    queryFn: () => getAvailableEmployees(airport),
    enabled: airport.length === 3
  });

  const fixMut = useMutation({
    mutationFn: (payload: { aircraft_id: string }) => fixAircraft(payload),
    onSuccess: (_data, variables) => {
      toast.success("Aircraft marked repaired 🛠️");
      setRecentRepairs((prev) => [variables.aircraft_id, ...prev.filter((id) => id !== variables.aircraft_id)].slice(0, 5));
      allAircraftQ.refetch();
    }
  });

  const aircraftRows = (allAircraftQ.data ?? []).filter(
    (aircraft) => (aircraft.aircraft_location ?? "").toUpperCase() === airport
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xl font-semibold">Resources at Airport</div>
        <div className="mt-1 text-sm text-zinc-400">
          Check airport resources by IATA code and repair aircraft currently in maintenance.
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge tone="info">Recent repairs: {recentRepairs.length}</Badge>
          {recentRepairs[0] && <Badge tone="neutral">Last repaired: {recentRepairs[0]}</Badge>}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-semibold">Airport scope</div>
              <div className="text-xs text-zinc-500">GET /aircraft/available/{`{airport_code}`} • /employee/available/{`{airport_code}`}</div>
            </div>
            <div className="flex items-end gap-2">
              <div>
                <Label>IATA Code</Label>
                <Input
                  value={airport}
                  onChange={(e) => setAirport(e.target.value.toUpperCase().slice(0, 3))}
                  placeholder="JFK"
                />
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  allAircraftQ.refetch();
                  employeesQ.refetch();
                }}
                disabled={allAircraftQ.isFetching || employeesQ.isFetching}
              >
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Aircraft (all statuses)</div>
                  <div className="text-xs text-zinc-500">By airport: {airport}</div>
                </div>
                <Badge tone={allAircraftQ.isError ? "bad" : allAircraftQ.isFetching ? "info" : "neutral"}>
                  {allAircraftQ.isFetching ? "Loading…" : allAircraftQ.isError ? "Error" : `${aircraftRows.length} found`}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable<Aircraft>
                rows={aircraftRows}
                keyFn={(a) => a.aircraft_id}
                emptyTitle={allAircraftQ.isLoading ? "Loading…" : "No aircraft found"}
                emptyDescription={allAircraftQ.isLoading ? "Fetching aircraft…" : "Try another airport code."}
                columns={[
                  {
                    header: "Aircraft ID",
                    cell: (a) => <div className="font-mono text-xs">{a.aircraft_id}</div>
                  },
                  {
                    header: "Model",
                    cell: (a) => <div className="text-sm">{[a.manufacturer, a.aircraft_model].filter(Boolean).join(" ") || "—"}</div>
                  },
                  {
                    header: "Status",
                    cell: (a) => <Badge tone={aircraftTone(a.aircraft_status) as any}>{a.aircraft_status ?? "—"}</Badge>
                  },
                  {
                    header: "Actions",
                    cell: (a) => (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => fixMut.mutate({ aircraft_id: a.aircraft_id })}
                        disabled={fixMut.isPending || a.aircraft_status !== "MAINTENANCE"}
                      >
                        {a.aircraft_status === "MAINTENANCE" ? "Inspect" : "N/A"}
                      </Button>
                    )
                  }
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Available employees</div>
                  <div className="text-xs text-zinc-500">By airport: {airport}</div>
                </div>
                <Badge tone={employeesQ.isError ? "bad" : employeesQ.isFetching ? "info" : "neutral"}>
                  {employeesQ.isFetching ? "Loading…" : employeesQ.isError ? "Error" : `${employeesQ.data?.length ?? 0} found`}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable<Employee>
                rows={employeesQ.data ?? []}
                keyFn={(e) => e.employee_id}
                emptyTitle={employeesQ.isLoading ? "Loading…" : "No employees available"}
                emptyDescription={employeesQ.isLoading ? "Fetching employees…" : "Try another airport code."}
                columns={[
                  { header: "Employee ID", cell: (e) => <div className="font-mono text-xs">{e.employee_id}</div> },
                  {
                    header: "Name",
                    cell: (e) => <div className="text-sm">{[e.first_name, e.last_name].filter(Boolean).join(" ") || "—"}</div>
                  },
                  {
                    header: "Position",
                    cell: (e) => <div className="text-sm text-zinc-300">{(e.position as any) ?? "—"}</div>
                  },
                  {
                    header: "Status",
                    cell: (e) => <Badge tone={(e.employee_status === "AVAILABLE" ? "ok" : "info") as any}>{(e.employee_status as any) ?? "—"}</Badge>
                  }
                ]}
              />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
