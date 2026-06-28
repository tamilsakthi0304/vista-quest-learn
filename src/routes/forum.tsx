import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/lms/AppShell";
import { ShieldCheck, MessageSquare, ArrowUp, Sparkles } from "lucide-react";

export const Route = createFileRoute("/forum")({
  head: () => ({ meta: [{ title: "Forum · Neuron LMS" }] }),
  component: Forum,
});

const threads = [
  {
    title: "Intuition behind backpropagation chain rule",
    author: "Marcus Tate",
    course: "ML Foundations",
    replies: 24,
    votes: 87,
    tag: "question",
    ai: "Top answer verified by AI moderator · 3 references cited",
  },
  {
    title: "Why does superposition collapse on measurement?",
    author: "Lara Petrov",
    course: "Quantum 101",
    replies: 41,
    votes: 132,
    tag: "discussion",
    ai: "Active AI tutor in thread",
  },
  {
    title: "Study group for Systems Design — Thursdays?",
    author: "Diego Luna",
    course: "Systems Design",
    replies: 12,
    votes: 38,
    tag: "meetup",
  },
  {
    title: "Stuck on eigenvector derivation — visual proof?",
    author: "Aisha Khan",
    course: "Linear Algebra",
    replies: 8,
    votes: 22,
    tag: "question",
    ai: "AI suggested AR module · 14 min",
  },
  {
    title: "Resources for behavioral economics field studies?",
    author: "Sofia Mendez",
    course: "Behavioral Econ",
    replies: 6,
    votes: 17,
    tag: "resources",
  },
];

const tagStyles: Record<string, string> = {
  question: "bg-primary/15 text-primary border-primary/30",
  discussion: "bg-violet/15 text-violet border-violet/30",
  meetup: "bg-sky/15 text-sky border-sky/30",
  resources: "bg-coral/15 text-coral border-coral/30",
};

function Forum() {
  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-end sm:flex sm:justify-between">
          <div className="min-w-0">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary">/ peer forum</div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
              Think out loud, together.
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              AI-moderated to keep conversations focused and civil.
            </p>
          </div>
          <button className="shrink-0 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow-[var(--glow-lime)] hover:opacity-90">
            New thread
          </button>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-medium">AI moderation is on</div>
            <div className="text-muted-foreground text-xs mt-1">
              Toxicity, plagiarism and off-topic posts are auto-flagged. Top answers are
              fact-checked and tagged.
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {threads.map((t) => (
            <article
              key={t.title}
              className="rounded-2xl border border-border bg-card/60 p-5 hover:border-primary/40 transition"
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <button className="grid h-9 w-9 place-items-center rounded-lg bg-surface hover:bg-primary hover:text-primary-foreground transition-colors border border-border">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <div className="font-mono text-sm font-bold">{t.votes}</div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border ${tagStyles[t.tag]}`}
                    >
                      {t.tag}
                    </span>
                    <span className="text-xs text-muted-foreground">{t.course}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg leading-tight mt-2">
                    {t.title}
                  </h3>
                  <div className="text-xs text-muted-foreground mt-1">by {t.author}</div>
                  {t.ai && (
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                      <Sparkles className="h-3 w-3" /> {t.ai}
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> {t.replies} replies
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
