import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { listRoutes, createRoute, deleteRoute } from "@/api/routes";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { FieldError, Input, Label } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import type { Route } from "@/types/routes";

const CreateSchema = z.object({
  origin_airport_code: z.string().length(3).transform((s) => s.toUpperCase()),
  destination_airport_code: z.string().length(3).transform((s) => s.toUpperCase())
});

const DeleteSchema = z.object({
  route_id: z.string().min(1),
  authorization_code: z.string().min(1)
});

export default function RoutesPage() {
  const qc = useQueryClient();
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const routesQ = useQuery({
    queryKey: ["routes", "all"],
    queryFn: listRoutes
  });

  const createForm = useForm<z.infer<typeof CreateSchema>>({
    resolver: zodResolver(CreateSchema),
    defaultValues: { origin_airport_code: "", destination_airport_code: "" }
  });

  const deleteForm = useForm<z.infer<typeof DeleteSchema>>({
    resolver: zodResolver(DeleteSchema),
    defaultValues: { route_id: "", authorization_code: "" }
  });

  const createMut = useMutation({
    mutationFn: (v: z.infer<typeof CreateSchema>) => createRoute(v),
    onSuccess: () => {
      toast.success("Route created 🧭");
      setOpenCreate(false);
      createForm.reset();
      qc.invalidateQueries({ queryKey: ["routes", "all"] });
    }
  });

  const deleteMut = useMutation({
    mutationFn: (v: z.infer<typeof DeleteSchema>) => deleteRoute(v),
    onSuccess: () => {
      toast.success("Route deleted 🗑️");
      setOpenDelete(false);
      deleteForm.reset();
      qc.invalidateQueries({ queryKey: ["routes", "all"] });
    }
  });

  const rows = useMemo(() => routesQ.data ?? [], [routesQ.data]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-xl font-semibold">Routes</div>
          <div className="mt-1 text-sm text-zinc-400">
            Create, inspect, and delete routes. Deletion requires an authorization code per backend.
          </div>
        </div>
        <Button onClick={() => setOpenCreate(true)}>Create route</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">All routes</div>
              <div className="text-xs text-zinc-500">GET /route/all</div>
            </div>
            <Button
              variant="secondary"
              onClick={() => routesQ.refetch()}
              disabled={routesQ.isFetching}
            >
              {routesQ.isFetching ? "Refreshing…" : "Refresh"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            rows={rows}
            keyFn={(r) => r.route_id}
            emptyTitle={routesQ.isLoading ? "Loading…" : "No routes found"}
            emptyDescription={
              routesQ.isLoading ? "Fetching routes from API." : "Create your first route to start scheduling flights."
            }
            columns={[
              {
                header: "Route ID",
                cell: (r) => (
                  <Link to={`/routes/${r.route_id}`} className="font-mono text-xs text-sky-200 hover:underline">
                    {r.route_id}
                  </Link>
                )
              },
              { header: "Origin", cell: (r) => <div className="text-sm">{r.origin_airport_code}</div> },
              { header: "Destination", cell: (r) => <div className="text-sm">{r.destination_airport_code}</div> },
              {
                header: "Actions",
                cell: (r) => (
                  <div className="flex flex-wrap gap-2">
                    <Link to={`/routes/${r.route_id}`}>
                      <Button size="sm" variant="ghost">View</Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        setSelectedRoute(r);
                        deleteForm.setValue("route_id", r.route_id);
                        setOpenDelete(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                )
              }
            ]}
          />
        </CardContent>
      </Card>

      <Modal
        open={openCreate}
        title="Create route"
        onClose={() => setOpenCreate(false)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpenCreate(false)}>
              Close
            </Button>
            <Button
              onClick={createForm.handleSubmit((v) => createMut.mutate(v))}
              disabled={createMut.isPending}
            >
              {createMut.isPending ? "Creating…" : "Create"}
            </Button>
          </div>
        }
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <Label>Origin airport code (IATA)</Label>
            <Input placeholder="JFK" {...createForm.register("origin_airport_code")} />
            <FieldError>{createForm.formState.errors.origin_airport_code?.message}</FieldError>
          </div>
          <div>
            <Label>Destination airport code (IATA)</Label>
            <Input placeholder="LAX" {...createForm.register("destination_airport_code")} />
            <FieldError>{createForm.formState.errors.destination_airport_code?.message}</FieldError>
          </div>
        </div>
        <div className="mt-3 text-xs text-zinc-500">
          Backend will reject duplicates (409) and missing airports (404) depending on your service/repo logic.
        </div>
      </Modal>

      <Modal
        open={openDelete}
        title="Delete route"
        onClose={() => setOpenDelete(false)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpenDelete(false)}>
              Close
            </Button>
            <Button
              variant="danger"
              onClick={deleteForm.handleSubmit((v) => deleteMut.mutate(v))}
              disabled={deleteMut.isPending}
            >
              {deleteMut.isPending ? "Deleting…" : "Delete route"}
            </Button>
          </div>
        }
      >
        <div className="space-y-3">
          <div className="text-sm">
            Route: <span className="font-mono text-xs text-zinc-200">{selectedRoute?.route_id ?? deleteForm.watch("route_id")}</span>
          </div>
          <div>
            <Label>Authorization code</Label>
            <Input placeholder="Enter authorization code" {...deleteForm.register("authorization_code")} />
            <FieldError>{deleteForm.formState.errors.authorization_code?.message}</FieldError>
          </div>
          <div className="text-xs text-zinc-500">
            The backend enforces an authorization check. If incorrect, you’ll get a 400 permission denied response.
          </div>
        </div>
      </Modal>
    </div>
  );
}
