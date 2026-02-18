import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={cn("text-xs text-zinc-300", props.className)} />;
}

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          "h-10 w-full rounded-xl border border-white/10 bg-ink-900 px-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-400/30",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
        className={cn(
          "h-10 w-full rounded-xl border border-white/10 bg-ink-900 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-400/30",
          className
        )}
      />
    );
  }
);

Select.displayName = "Select";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className={cn(
        "min-h-[90px] w-full rounded-xl border border-white/10 bg-ink-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-400/30",
        className
      )}
    />
  );
});

Textarea.displayName = "Textarea";

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <div className="mt-1 text-xs text-rose-300">{children}</div>;
}
