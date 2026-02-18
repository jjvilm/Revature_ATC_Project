import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};

export function Button({ className, variant = "primary", size = "md", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-400/30 disabled:opacity-50 disabled:pointer-events-none";
  const sizes = size === "sm" ? "h-9 px-3 text-sm" : "h-10 px-4 text-sm";
  const variants: Record<string, string> = {
    primary: "bg-sky-500/90 hover:bg-sky-500 text-zinc-950",
    secondary: "bg-white/10 hover:bg-white/14 border border-white/10",
    ghost: "hover:bg-white/8",
    danger: "bg-rose-500/90 hover:bg-rose-500 text-zinc-950"
  };
  return <button className={cn(base, sizes, variants[variant], className)} {...props} />;
}
