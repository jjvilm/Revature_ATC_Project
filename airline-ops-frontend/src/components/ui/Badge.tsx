import { cn } from "@/lib/cn";

type Props = {
  tone?: "ok" | "warn" | "bad" | "info" | "neutral";
  children: React.ReactNode;
};

export function Badge({ tone = "neutral", children }: Props) {
  const map: Record<string, string> = {
    ok: "bg-emerald-500/15 text-emerald-200 border-emerald-500/20",
    warn: "bg-amber-500/15 text-amber-200 border-amber-500/20",
    bad: "bg-rose-500/15 text-rose-200 border-rose-500/20",
    info: "bg-sky-500/15 text-sky-200 border-sky-500/20",
    neutral: "bg-white/10 text-zinc-200 border-white/10"
  };
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs", map[tone])}>
      {children}
    </span>
  );
}
