import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  MessagesSquare,
  Sparkles,
  Calendar,
  Award,
  Settings,
} from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/forum", label: "Forum", icon: MessagesSquare },
  { to: "/ai-tutor", label: "AI Tutor", icon: Sparkles },
  { to: "/schedule", label: "Schedule", icon: Calendar },
  { to: "/certificates", label: "Certificates", icon: Award },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-surface/40 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground font-display font-bold shadow-[var(--glow-lime)]">
          N
        </div>
        <div>
          <div className="font-display font-bold tracking-tight">Neuron</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Learning OS
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-primary text-primary-foreground font-medium shadow-[var(--glow-lime)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent/50 transition-colors">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet to-sky font-display font-semibold text-sm">
            AK
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium truncate">Aisha Khan</div>
            <div className="text-xs text-muted-foreground">CS · Year 3</div>
          </div>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
}
