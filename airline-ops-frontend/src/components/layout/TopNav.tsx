import { useQuery } from "@tanstack/react-query";
import { getStatus } from "@/api/health";
import { Badge } from "@/components/ui/Badge";
import { Plane } from "lucide-react";

export function TopNav() {
  const statusQ = useQuery({
    queryKey: ["health", "status"],
    queryFn: getStatus
  });

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/75 backdrop-blur">
      <div className="flex items-center justify-between px-5 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="md:hidden rounded-2xl border border-white/10 bg-white/5 p-2">
            <Plane className="h-4 w-4 text-sky-300" />
          </div>
          <div>
            <div className="text-sm font-semibold">Airline Operations</div>
            <div className="text-xs text-zinc-500">Dashboard for dispatch and routing</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {statusQ.isLoading && <Badge tone="info">Checking API…</Badge>}
          {statusQ.isError && <Badge tone="bad">API offline</Badge>}
          {statusQ.data && <Badge tone="ok">{statusQ.data.Status}</Badge>}
        </div>
      </div>
    </header>
  );
}
