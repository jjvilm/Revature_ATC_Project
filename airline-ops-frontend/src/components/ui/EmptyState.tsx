import { Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="mb-3 rounded-2xl border border-white/10 bg-ink-900 p-3">
        <Plane className="h-5 w-5 text-sky-300" />
      </div>
      <div className="text-sm font-semibold">{title}</div>
      {description && <div className="mt-1 max-w-md text-xs text-zinc-400">{description}</div>}
      {actionLabel && onAction && (
        <Button className="mt-4" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
