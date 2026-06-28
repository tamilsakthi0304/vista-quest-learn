import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { Bell, Search, Flame } from "lucide-react";

export function AppShell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 py-3 sm:flex sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="lg:hidden grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm">
                N
              </div>
              <div className="hidden sm:flex items-center gap-2 rounded-lg bg-surface px-3 py-1.5 border border-border/60 w-full max-w-sm">
                <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <input
                  placeholder="Search courses, peers, concepts…"
                  className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
                />
                <kbd className="hidden md:inline text-[10px] font-mono text-muted-foreground border border-border rounded px-1">
                  ⌘K
                </kbd>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 rounded-full bg-coral/15 text-coral px-2.5 py-1 text-xs font-medium border border-coral/20">
                <Flame className="h-3.5 w-3.5" />
                <span>12 day streak</span>
              </div>
              <button className="relative grid h-9 w-9 place-items-center rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
