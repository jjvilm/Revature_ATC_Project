import { cn } from "@/lib/cn";
import { EmptyState } from "@/components/ui/EmptyState";

export type Column<T> = {
  header: string;
  className?: string;
  cell: (row: T) => React.ReactNode;
};

export function DataTable<T>({
  rows,
  columns,
  keyFn,
  emptyTitle = "No results",
  emptyDescription
}: {
  rows: T[];
  columns: Column<T>[];
  keyFn: (row: T) => string;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  if (!rows.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-xs uppercase tracking-wide text-zinc-400">
          <tr>
            {columns.map((c) => (
              <th key={c.header} className={cn("px-4 py-3 font-medium", c.className)}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8">
          {rows.map((r) => (
            <tr key={keyFn(r)} className="hover:bg-white/4">
              {columns.map((c, i) => (
                <td key={i} className={cn("px-4 py-3 align-top text-zinc-200", c.className)}>
                  {c.cell(r)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
