import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export function JsonPanel({ title, data }: { title: string; data: unknown }) {
  return (
    <Card>
      <CardHeader>
        <div className="text-sm font-semibold">{title}</div>
      </CardHeader>
      <CardContent>
        <pre className="max-h-[420px] overflow-auto rounded-xl border border-white/10 bg-ink-900 p-3 text-xs text-zinc-200">
          {JSON.stringify(data, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}
