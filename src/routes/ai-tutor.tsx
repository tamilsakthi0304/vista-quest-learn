import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/lms/AppShell";
import { Sparkles, Send, Mic, Languages } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { api, ChatMessage } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/ai-tutor")({
  head: () => ({ meta: [{ title: "AI Tutor · Neuron LMS" }] }),
  component: AITutor,
});

function AITutor() {
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getChatHistory()
      .then((data) => {
        setMsgs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading chat history:", err);
        setLoading(false);
      });
  }, []);

  // auto scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function send() {
    if (!input.trim()) return;
    const textToSend = input;
    setInput("");

    // optimistic user update
    setMsgs((m) => [...m, { role: "user", text: textToSend }]);

    api.sendChatMessage(textToSend)
      .then(({ messages, xpAdded }) => {
        setMsgs(messages);
        if (xpAdded > 0) {
          toast.success(`+${xpAdded} XP gained for querying AI tutor!`, {
            icon: "⚡",
          });
        }
      })
      .catch((err) => {
        console.error("Error sending message to AI:", err);
        toast.error("Failed to connect to AI tutor. Try again.");
      });
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100dvh-9rem)]">
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary">/ ai tutor</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
            Your 24/7 study companion.
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Trained on your textbooks, your notes, and what you've already mastered.
          </p>
        </div>

        {loading ? (
          <div className="flex-1 grid place-items-center rounded-2xl border border-border bg-card/40 p-4">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary mx-auto" />
              <p className="text-muted-foreground text-sm font-mono uppercase tracking-wider">Connecting to Neuron AI...</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4 rounded-2xl border border-border bg-card/40 p-4 sm:p-6">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    m.role === "ai"
                      ? "bg-primary text-primary-foreground shadow-[var(--glow-lime)]"
                      : "bg-gradient-to-br from-violet to-sky font-display"
                  }`}
                >
                  {m.role === "ai" ? <Sparkles className="h-4 w-4" /> : "AK"}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "ai"
                      ? "bg-surface border border-border"
                      : "bg-primary/15 border border-primary/30"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}

        <div className="mt-4 rounded-2xl border border-border bg-card/60 p-2 flex items-center gap-2">
          <button
            className="grid h-10 w-10 place-items-center rounded-xl hover:bg-accent text-muted-foreground"
            aria-label="Voice input"
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl hover:bg-accent text-muted-foreground"
            aria-label="Translate"
          >
            <Languages className="h-4 w-4" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything — concepts, problems, or 'quiz me on chapter 4'…"
            className="flex-1 bg-transparent outline-none px-2 text-sm placeholder:text-muted-foreground"
          />
          <button
            onClick={send}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow-[var(--glow-lime)] hover:opacity-90"
          >
            <Send className="h-3.5 w-3.5" /> Send
          </button>
        </div>
      </div>
    </AppShell>
  );
}
export default AITutor;
