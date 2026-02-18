import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Modal({
  open,
  title,
  children,
  onClose,
  footer
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-ink-850 shadow-glow">
        <div className="flex items-center justify-between border-b border-white/8 p-4">
          <div className="text-sm font-semibold">{title}</div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">{children}</div>
        {footer && <div className={cn("border-t border-white/8 p-4")}>{footer}</div>}
      </div>
    </div>
  );
}
