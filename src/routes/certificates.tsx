import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/lms/AppShell";
import { Award, Download, Share2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { api, Certificate } from "@/lib/api";

export const Route = createFileRoute("/certificates")({
  head: () => ({ meta: [{ title: "Certificates · Neuron LMS" }] }),
  component: Certificates,
});

function Certificates() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCertificates()
      .then((data) => {
        setCerts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching certificates:", err);
        setLoading(false);
      });
  }, []);

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary">/ credentials</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
            Your verifiable achievements.
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Every certificate is a W3C verifiable credential, anchored on-chain. One QR scan proves it.
          </p>
        </div>

        {loading ? (
          <div className="grid place-items-center h-48">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary mx-auto" />
              <p className="text-muted-foreground text-sm font-mono uppercase tracking-wider">Retrieving Blockchain Credentials...</p>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {certs.map((c) => (
              <article
                key={c.title}
                className="group relative rounded-2xl border border-border bg-card/60 overflow-hidden hover:border-primary/40 transition"
              >
                {/* decorative band */}
                <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,oklch(0.88_0.21_130/0.25),transparent_70%),radial-gradient(ellipse_at_30%_60%,oklch(0.65_0.22_290/0.2),transparent_70%)]" />

                <div className="relative p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--glow-lime)]">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">grade</div>
                      <div className="font-display text-2xl font-bold text-primary">{c.grade}</div>
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight mt-6">
                    {c.title}
                  </h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    Issued by {c.issuer} · {c.date}
                  </div>

                  <div className="mt-6 grid grid-cols-[1fr_auto] gap-4 items-end">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        on-chain hash
                      </div>
                      <div className="font-mono text-xs mt-1 break-all">{c.hash}</div>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.15em] text-primary">
                        <ShieldCheck className="h-3 w-3" /> verified · tamper-proof
                      </div>
                    </div>
                    {/* fake QR */}
                    <div className="grid grid-cols-7 grid-rows-7 gap-0.5 h-20 w-20 rounded-lg bg-background p-1.5 border border-border">
                      {Array.from({ length: 49 }).map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-[1px] ${
                            // deterministic pattern
                            (i * 7919) % 3 === 0 ? "bg-foreground" : "bg-background"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <button className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-xs font-medium hover:opacity-90">
                      <Download className="h-3 w-3" /> PDF
                    </button>
                    <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-4 py-1.5 text-xs font-medium hover:bg-background">
                      <Share2 className="h-3 w-3" /> Share
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
export default Certificates;
