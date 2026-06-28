import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/lms/AppShell";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { api, ScheduleBlock } from "@/lib/api";

export const Route = createFileRoute("/schedule")({
  head: () => ({ meta: [{ title: "Schedule · Neuron LMS" }] }),
  component: Schedule,
});

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function Schedule() {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getScheduleBlocks()
      .then((data) => {
        setBlocks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading schedule blocks:", err);
        setLoading(false);
      });
  }, []);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary">/ smart schedule</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
            This week, optimized for you.
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Neuron AI placed your study blocks where your focus is historically highest.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-medium">3 AI-placed study blocks this week</div>
            <div className="text-muted-foreground text-xs mt-1">
              Tap to accept, drag to move, or ask the tutor to re-plan around your energy patterns.
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid place-items-center h-[50vh] rounded-2xl border border-border bg-card/40">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary mx-auto" />
              <p className="text-muted-foreground text-sm font-mono uppercase tracking-wider">Syncing Planner Events...</p>
            </div>
          </div>
        ) : (
          /* week grid */
          <div className="rounded-2xl border border-border bg-card/40 overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border">
                <div />
                {days.map((d) => (
                  <div key={d} className="px-3 py-3 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground border-l border-border">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-[60px_repeat(7,1fr)] relative">
                {/* hour labels */}
                <div>
                  {hours.map((h) => (
                    <div key={h} className="h-14 px-2 py-1 text-[10px] font-mono text-muted-foreground border-b border-border/40">
                      {h}:00
                    </div>
                  ))}
                </div>
                {/* day columns */}
                {days.map((_, di) => (
                  <div key={di} className="relative border-l border-border">
                    {hours.map((h) => (
                      <div key={h} className="h-14 border-b border-border/40" />
                    ))}
                    {blocks
                      .filter((b) => b.day === di)
                      .map((b, i) => {
                        const top = (b.start - hours[0]) * 56;
                        const height = b.len * 56 - 4;
                        return (
                          <div
                            key={i}
                            className={`absolute left-1 right-1 rounded-lg px-2 py-1.5 text-xs ${b.tone} shadow-lg`}
                            style={{ top, height }}
                          >
                            <div className="font-semibold truncate flex items-center gap-1">
                              {b.ai && <Sparkles className="h-3 w-3" />}
                              {b.t}
                            </div>
                            <div className="text-[10px] opacity-80 font-mono">
                              {b.start}:00 – {b.start + b.len}:00
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
export default Schedule;
