import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/lms/AppShell";
import { Trophy, Flame, TrendingUp, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard · Neuron LMS" }] }),
  component: Leaderboard,
});

const data = [
  { n: "Jia Wen", xp: 4820, streak: 42, dir: "up", you: false, dept: "AI" },
  { n: "Marcus Tate", xp: 4640, streak: 31, dir: "up", you: false, dept: "CS" },
  { n: "Priya Raman", xp: 4210, streak: 28, dir: "down", you: false, dept: "Math" },
  { n: "Aisha Khan", xp: 3980, streak: 12, dir: "up", you: true, dept: "CS" },
  { n: "Diego Luna", xp: 3720, streak: 19, dir: "up", you: false, dept: "Physics" },
  { n: "Hana Sato", xp: 3590, streak: 8, dir: "down", you: false, dept: "Bio" },
  { n: "Ethan Brooks", xp: 3410, streak: 22, dir: "up", you: false, dept: "AI" },
  { n: "Sofia Mendez", xp: 3220, streak: 15, dir: "up", you: false, dept: "Econ" },
  { n: "Kenji Watanabe", xp: 3050, streak: 9, dir: "down", you: false, dept: "Math" },
  { n: "Lara Petrov", xp: 2890, streak: 14, dir: "up", you: false, dept: "CS" },
];

function Leaderboard() {
  const top3 = data.slice(0, 3);
  const rest = data.slice(3);
  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-10">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary">/ leaderboard</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
            This week's top minds.
          </h1>
        </div>

        {/* podium */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end">
          {[top3[1], top3[0], top3[2]].map((p, idx) => {
            const rank = idx === 1 ? 1 : idx === 0 ? 2 : 3;
            const heights = ["h-32 sm:h-40", "h-44 sm:h-56", "h-24 sm:h-32"];
            return (
              <div key={p.n} className="flex flex-col items-center text-center">
                <div
                  className={`grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full font-display font-bold text-lg mb-3 ${
                    rank === 1
                      ? "bg-gradient-to-br from-primary to-sky text-primary-foreground shadow-[var(--glow-lime)]"
                      : rank === 2
                      ? "bg-gradient-to-br from-sky to-violet text-foreground"
                      : "bg-gradient-to-br from-coral to-violet text-foreground"
                  }`}
                >
                  {p.n
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div className="font-display font-semibold text-sm sm:text-base truncate w-full">{p.n}</div>
                <div className="text-xs text-muted-foreground">{p.xp.toLocaleString()} XP</div>
                <div
                  className={`mt-3 w-full ${heights[idx]} rounded-t-2xl border border-border border-b-0 ${
                    rank === 1
                      ? "bg-gradient-to-b from-primary/30 to-transparent"
                      : "bg-gradient-to-b from-surface to-transparent"
                  } grid place-items-start pt-3`}
                >
                  <div className="font-display text-3xl sm:text-5xl font-bold mx-auto">{rank}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* table */}
        <div className="rounded-2xl border border-border bg-card/60 overflow-hidden">
          <div className="grid grid-cols-[40px_1fr_80px_80px_60px] sm:grid-cols-[60px_1fr_120px_120px_80px] gap-3 px-4 sm:px-6 py-3 border-b border-border text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
            <span>rank</span>
            <span>learner</span>
            <span className="text-right">streak</span>
            <span className="text-right">xp</span>
            <span className="text-right">trend</span>
          </div>
          {rest.map((p, i) => (
            <div
              key={p.n}
              className={`grid grid-cols-[40px_1fr_80px_80px_60px] sm:grid-cols-[60px_1fr_120px_120px_80px] gap-3 px-4 sm:px-6 py-3 items-center border-b border-border/40 last:border-0 ${
                p.you ? "bg-primary/10" : "hover:bg-accent/30"
              }`}
            >
              <span className="font-mono font-bold text-muted-foreground">#{i + 4}</span>
              <div className="min-w-0 flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet to-sky text-xs font-display font-bold">
                  {p.n
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">
                    {p.n} {p.you && <span className="text-[10px] font-mono uppercase text-primary ml-1">you</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{p.dept}</div>
                </div>
              </div>
              <div className="text-right text-sm font-mono inline-flex items-center justify-end gap-1">
                <Flame className="h-3 w-3 text-coral" /> {p.streak}
              </div>
              <div className="text-right text-sm font-mono font-semibold">{p.xp.toLocaleString()}</div>
              <div className={`text-right ${p.dir === "up" ? "text-primary" : "text-coral"}`}>
                {p.dir === "up" ? (
                  <TrendingUp className="h-4 w-4 inline" />
                ) : (
                  <TrendingDown className="h-4 w-4 inline" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs font-mono text-muted-foreground text-center">
          <Trophy className="h-3 w-3 inline mr-1 text-primary" />
          weekly reset · sunday 23:59 UTC
        </div>
      </div>
    </AppShell>
  );
}
