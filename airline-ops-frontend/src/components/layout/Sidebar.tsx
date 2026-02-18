import { NavLink } from "react-router-dom";
import { cn } from "@/lib/cn";
import { Gauge, PlaneTakeoff, Route as RouteIcon, Building2, BarChart3 } from "lucide-react";

const items = [
  { to: "/", label: "Dashboard", icon: Gauge },
  { to: "/flight-ops", label: "Flight Ops", icon: PlaneTakeoff },
  { to: "/routes", label: "Routes", icon: RouteIcon },
  { to: "/resources", label: "Resources", icon: Building2 },
  { to: "/visualizations", label: "Visualizations", icon: BarChart3 }
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-white/10 bg-ink-900 md:block">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 grid place-items-center">
            <span className="text-sm font-semibold text-sky-300">AO</span>
          </div>
          <div>
            <div className="text-sm font-semibold">Airline Ops</div>
            <div className="text-xs text-zinc-400">Operations Console</div>
          </div>
        </div>

        <nav className="mt-6 space-y-1">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-white/6",
                    isActive && "bg-white/10 text-zinc-100 border border-white/10"
                  )
                }
              >
                <Icon className="h-4 w-4 text-sky-300" />
                {it.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
