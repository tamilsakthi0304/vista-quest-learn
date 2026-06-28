import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/lms/AppShell";
import {
  Flame,
  Trophy,
  Target,
  Clock,
  Sparkles,
  ArrowUpRight,
  PlayCircle,
  CheckCircle2,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · Neuron LMS" },
      { name: "description", content: "Your adaptive learning dashboard with streaks, badges, AI recommendations and live progress." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* greeting */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary">
              Sunday · week 12
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
              Welcome back, Aisha.
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              You're <span className="text-foreground font-medium">2 lessons</span> away from your weekly goal.
            </p>
          </div>
          <div className="shrink-0 hidden sm:flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-4 py-2.5">
            <Zap className="h-4 w-4 text-primary" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">XP today</div>
              <div className="font-display font-bold">+340</div>
            </div>
          </div>
        </div>

        {/* stat row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard icon={Flame} tone="coral" label="Streak" value="12 days" hint="best: 28" />
          <StatCard icon={Trophy} tone="lime" label="Class rank" value="#4" hint="of 184" />
          <StatCard icon={Target} tone="violet" label="Mastery" value="71%" hint="+6 this week" />
          <StatCard icon={Clock} tone="sky" label="Focus time" value="8h 24m" hint="this week" />
        </div>

        {/* main grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* continue learning */}
          <section className="lg:col-span-2 space-y-4">
            <SectionHeader title="Continue learning" right="3 active paths" />
            <div className="space-y-3">
              {courses.map((c) => (
                <CourseRow key={c.title} {...c} />
              ))}
            </div>

            {/* AI recommendation */}
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-violet/10 p-5 mt-6">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[var(--glow-lime)]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary">
                    Neuron AI · adaptive suggestion
                  </div>
                  <h3 className="font-display font-semibold text-lg mt-1">
                    You learn visually 22% faster — switch to the AR module for Eigenvectors
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on the last 6 quizzes, diagram-based explanations boost your retention.
                    Estimated 14 minutes to mastery.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-xs font-medium hover:opacity-90">
                      Launch AR lab
                    </button>
                    <button className="rounded-full border border-border bg-background/40 px-4 py-1.5 text-xs font-medium hover:bg-background">
                      Show me other paths
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* right column */}
          <section className="space-y-6">
            {/* badges */}
            <div className="rounded-2xl border border-border bg-card/60 p-5">
              <SectionHeader title="Badges" right="12 / 40" small />
              <div className="grid grid-cols-4 gap-3 mt-4">
                {badges.map((b, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl grid place-items-center text-xl ${
                      b.earned
                        ? "bg-gradient-to-br from-primary to-sky text-primary-foreground shadow-[var(--glow-lime)]"
                        : "bg-muted/40 text-muted-foreground/40 border border-dashed border-border"
                    }`}
                    title={b.label}
                  >
                    {b.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* leaderboard */}
            <div className="rounded-2xl border border-border bg-card/60 p-5">
              <SectionHeader title="Class leaderboard" right="this week" small />
              <ul className="mt-4 space-y-2">
                {leaderboard.map((p, i) => (
                  <li
                    key={p.name}
                    className={`flex items-center gap-3 rounded-lg p-2 ${
                      p.you ? "bg-primary/10 border border-primary/30" : ""
                    }`}
                  >
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-xs font-bold ${
                        i === 0
                          ? "bg-primary text-primary-foreground"
                          : i < 3
                          ? "bg-sky/30 text-sky"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.xp} XP</div>
                    </div>
                    {p.you && <span className="text-[10px] font-mono uppercase text-primary">you</span>}
                  </li>
                ))}
              </ul>
            </div>

            {/* upcoming */}
            <div className="rounded-2xl border border-border bg-card/60 p-5">
              <SectionHeader title="Up next" small />
              <ul className="mt-4 space-y-3">
                {upcoming.map((u) => (
                  <li key={u.label} className="flex items-start gap-3">
                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${u.dot}`} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{u.label}</div>
                      <div className="text-xs text-muted-foreground">{u.when}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function SectionHeader({ title, right, small }: { title: string; right?: string; small?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-2">
      <h2
        className={`font-display font-semibold tracking-tight ${
          small ? "text-base" : "text-xl"
        }`}
      >
        {title}
      </h2>
      {right && <span className="text-xs font-mono text-muted-foreground uppercase tracking-[0.15em]">{right}</span>}
    </div>
  );
}

function StatCard({
  icon: Icon,
  tone,
  label,
  value,
  hint,
}: {
  icon: typeof Flame;
  tone: "coral" | "lime" | "violet" | "sky";
  label: string;
  value: string;
  hint: string;
}) {
  const tones: Record<string, string> = {
    coral: "bg-coral/15 text-coral",
    lime: "bg-primary/15 text-primary",
    violet: "bg-violet/15 text-violet",
    sky: "bg-sky/15 text-sky",
  };
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className={`grid h-9 w-9 place-items-center rounded-lg ${tones[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-4">{value}</div>
      <div className="flex items-center justify-between mt-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-[10px] font-mono text-muted-foreground/70">{hint}</div>
      </div>
    </div>
  );
}

type Course = {
  title: string;
  meta: string;
  pct: number;
  next: string;
  status: "active" | "review" | "new";
};
const courses: Course[] = [
  {
    title: "Machine Learning Foundations",
    meta: "Dr. M. Okafor · 12 modules",
    pct: 78,
    next: "Gradient descent — interactive notebook",
    status: "active",
  },
  {
    title: "Quantum Computing 101",
    meta: "Prof. L. Hartwell · 8 modules",
    pct: 42,
    next: "Superposition & qubits — AR lab",
    status: "active",
  },
  {
    title: "Linear Algebra · Visual",
    meta: "Dr. K. Reyes · 10 modules",
    pct: 100,
    next: "Final certificate ready to mint",
    status: "review",
  },
];

function CourseRow({ title, meta, pct, next, status }: Course) {
  return (
    <div className="group rounded-2xl border border-border bg-card/60 p-4 sm:p-5 hover:border-primary/40 transition-colors">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-start sm:flex sm:items-center sm:gap-4">
        <button
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label={`Resume ${title}`}
        >
          {status === "review" ? <CheckCircle2 className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
        </button>
        <div className="min-w-0 flex-1 col-start-1 row-start-2 sm:row-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-semibold truncate">{title}</h3>
            {status === "review" && (
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] bg-sky/20 text-sky px-2 py-0.5 rounded-full">
                cert ready
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5 truncate">{meta}</div>
          <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-sky"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground truncate">
            <span className="font-mono text-primary">▸ </span>
            {next}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-mono text-sm font-bold">{pct}%</div>
          <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">complete</div>
        </div>
      </div>
    </div>
  );
}

const badges = [
  { icon: "🔥", label: "Streak 7", earned: true },
  { icon: "🧠", label: "Mind", earned: true },
  { icon: "⚡", label: "Speed", earned: true },
  { icon: "🎯", label: "Sharp", earned: true },
  { icon: "🏆", label: "Top 10", earned: true },
  { icon: "📚", label: "Reader", earned: true },
  { icon: "🌐", label: "Polyglot", earned: false },
  { icon: "🚀", label: "Launch", earned: false },
];

const leaderboard = [
  { name: "Jia Wen", xp: "4,820", you: false },
  { name: "Marcus T.", xp: "4,640", you: false },
  { name: "Priya R.", xp: "4,210", you: false },
  { name: "Aisha Khan", xp: "3,980", you: true },
  { name: "Diego L.", xp: "3,720", you: false },
];

const upcoming = [
  { label: "ML quiz · gradient descent", when: "Tomorrow · 10:00 AM", dot: "bg-coral" },
  { label: "Group project sync", when: "Tue · 2:30 PM", dot: "bg-primary" },
  { label: "AR lab — Eigenvectors", when: "Wed · self-paced", dot: "bg-violet" },
];
