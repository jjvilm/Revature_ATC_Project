import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950">
      <div className="mx-auto flex max-w-[1440px]">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <TopNav />
          <main className="p-5 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
