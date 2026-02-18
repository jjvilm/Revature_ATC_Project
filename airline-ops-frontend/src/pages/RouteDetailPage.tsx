import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getRoute, deletionProposal } from "@/api/routes";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { JsonPanel } from "@/components/ui/JsonPanel";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function RouteDetailPage() {
  const { routeId } = useParams<{ routeId: string }>();

  const routeQ = useQuery({
    queryKey: ["routes", "get", routeId],
    queryFn: () => getRoute(routeId!),
    enabled: !!routeId
  });

  const proposalQ = useQuery({
    queryKey: ["routes", "deletionProposal", routeId],
    queryFn: () => deletionProposal(routeId!),
    enabled: !!routeId
  });

  const route = routeQ.data;

  const tone = useMemo(() => {
    if (proposalQ.isError) return "warn";
    if (proposalQ.isLoading) return "info";
    return "neutral";
  }, [proposalQ.isError, proposalQ.isLoading]);

  if (!routeId) {
    return <EmptyState title="Missing route id" description="Open a route from the routes list." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-xl font-semibold">Route detail</div>
          <div className="mt-1 text-sm text-zinc-400 font-mono">{routeId}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => routeQ.refetch()} disabled={routeQ.isFetching}>
            {routeQ.isFetching ? "Refreshing…" : "Refresh"}
          </Button>
          <Button variant="secondary" onClick={() => proposalQ.refetch()} disabled={proposalQ.isFetching}>
            {proposalQ.isFetching ? "Refreshing…" : "Refresh proposal"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Route</div>
              <div className="text-xs text-zinc-500">GET /route/{`{route_id}`}</div>
            </div>
            <Badge tone={tone as any}>
              Proposal: {proposalQ.isLoading ? "Loading" : proposalQ.isError ? "Error" : "Ready"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {routeQ.isLoading && <div className="text-sm text-zinc-400">Loading route…</div>}
          {routeQ.isError && (
            <EmptyState
              title="Failed to load route"
              description="Check backend and route ID."
              actionLabel="Retry"
              onAction={() => routeQ.refetch()}
            />
          )}
          {route && (
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <div className="text-xs text-zinc-500">Origin</div>
                <div className="mt-1 text-sm font-semibold">{route.origin_airport_code}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">Destination</div>
                <div className="mt-1 text-sm font-semibold">{route.destination_airport_code}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">Route ID</div>
                <div className="mt-1 font-mono text-xs">{route.route_id}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <JsonPanel title="Deletion proposal (raw)" data={proposalQ.data ?? (proposalQ.isError ? { error: true } : null)} />
    </div>
  );
}
