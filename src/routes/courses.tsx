import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/lms/AppShell";
import { Search, Filter, Star, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "Courses · Neuron LMS" }] }),
  component: Courses,
});

const all = [
  { t: "Machine Learning Foundations", c: "AI", h: 24, r: 4.9, s: 12480, lvl: "Intermediate", new: false },
  { t: "Quantum Computing 101", c: "Physics", h: 18, r: 4.8, s: 5210, lvl: "Advanced", new: true },
  { t: "Linear Algebra · Visual", c: "Math", h: 12, r: 4.9, s: 22100, lvl: "Beginner", new: false },
  { t: "Systems Design Interview", c: "CS", h: 30, r: 4.7, s: 18420, lvl: "Advanced", new: false },
  { t: "Spanish for Builders", c: "Lang", h: 40, r: 4.6, s: 9080, lvl: "Beginner", new: true },
  { t: "Cellular Biology · AR", c: "Bio", h: 16, r: 4.9, s: 4310, lvl: "Intermediate", new: true },
  { t: "Behavioral Economics", c: "Econ", h: 20, r: 4.7, s: 7720, lvl: "Beginner", new: false },
  { t: "Modern Cryptography", c: "Security", h: 28, r: 4.8, s: 6190, lvl: "Advanced", new: false },
  { t: "Generative Music with AI", c: "Arts", h: 14, r: 4.8, s: 3920, lvl: "Beginner", new: true },
];

const cats = ["All", "AI", "Math", "Physics", "CS", "Bio", "Lang", "Econ", "Arts", "Security"];

function Courses() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary">/ catalog</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
            1,820 adaptive courses.
          </h1>
          <p className="text-muted-foreground mt-1">Every course rewrites itself around how you learn.</p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:flex">
          <div className="flex min-w-0 items-center gap-2 rounded-xl bg-surface px-4 py-2.5 border border-border flex-1">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              placeholder="Search 1,820 courses…"
              className="bg-transparent outline-none w-full text-sm placeholder:text-muted-foreground"
            />
          </div>
          <button className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm hover:bg-accent">
            <Filter className="h-4 w-4" /> <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {cats.map((c, i) => (
            <button
              key={c}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium border transition-colors ${
                i === 0
                  ? "bg-primary text-primary-foreground border-primary shadow-[var(--glow-lime)]"
                  : "border-border bg-surface hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {all.map((c, i) => (
            <article
              key={c.t}
              className="group rounded-2xl border border-border bg-card/60 overflow-hidden hover:border-primary/40 transition-all hover:-translate-y-0.5"
            >
              <div
                className="aspect-[16/9] relative"
                style={{
                  background: [
                    "linear-gradient(135deg, oklch(0.65 0.22 290), oklch(0.78 0.14 220))",
                    "linear-gradient(135deg, oklch(0.88 0.21 130), oklch(0.78 0.14 220))",
                    "linear-gradient(135deg, oklch(0.72 0.2 25), oklch(0.65 0.22 290))",
                    "linear-gradient(135deg, oklch(0.78 0.14 220), oklch(0.88 0.21 130))",
                  ][i % 4],
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(1_0_0/0.15),transparent_60%)]" />
                <div className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-[0.18em] bg-background/70 backdrop-blur rounded-full px-2 py-0.5 text-foreground">
                  {c.c}
                </div>
                {c.new && (
                  <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-[0.18em] bg-primary text-primary-foreground rounded-full px-2 py-0.5 font-semibold">
                    new
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold leading-tight">{c.t}</h3>
                <div className="text-xs text-muted-foreground mt-1">{c.lvl}</div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" /> {c.r}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {c.h}h
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {c.s.toLocaleString()}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
