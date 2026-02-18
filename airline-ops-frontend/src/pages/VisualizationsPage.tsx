import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const DEFAULT_LOCAL_API_URL = "http://localhost:8000";
const BASE_URL =
  ((import.meta.env.VITE_API_BASE_URL as string | undefined) ?? DEFAULT_LOCAL_API_URL).replace(/\/$/, "");

const charts = [
  { key: "busiest-routes", title: "Top 10 Busiest Routes" },
  { key: "departure-hours", title: "Departure Time Distribution" },
  { key: "fleet-status", title: "Fleet Distribution by Status" },
  { key: "route-network", title: "Global Route Network" }
] as const;

export default function VisualizationsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const imageUrls = useMemo(() => {
    const stamp = Date.now() + refreshKey;
    return Object.fromEntries(
      charts.map((chart) => [chart.key, `${BASE_URL}/visualizations/${chart.key}.png?t=${stamp}`])
    ) as Record<(typeof charts)[number]["key"], string>;
  }, [refreshKey]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-xl font-semibold">Visualizations</div>
          <div className="mt-1 text-sm text-zinc-400">
            Backend-generated Pandas + Matplotlib charts exposed as image endpoints.
          </div>
        </div>
        <Button variant="secondary" onClick={() => setRefreshKey((v) => v + 1)}>
          Refresh Charts
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {charts.map((chart) => (
          <Card key={chart.key}>
            <CardHeader>
              <div className="text-sm font-semibold">{chart.title}</div>
              <div className="text-xs text-zinc-500">/visualizations/{chart.key}.png</div>
            </CardHeader>
            <CardContent>
              <img
                src={imageUrls[chart.key]}
                alt={chart.title}
                className="w-full rounded-xl border border-white/10 bg-zinc-950/60"
                loading="lazy"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
