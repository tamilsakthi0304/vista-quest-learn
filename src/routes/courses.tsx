import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/lms/AppShell";
import { Search, Filter, Star, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { api, Course } from "@/lib/api";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "Courses · Neuron LMS" }] }),
  component: Courses,
});

const cats = ["All", "AI", "Math", "Physics", "CS", "Bio", "Lang", "Econ", "Arts", "Security"];

function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  useEffect(() => {
    api.getCourses()
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  const filtered = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCat === "All" || c.category.toLowerCase() === activeCat.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary">/ catalog</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
            {courses.length > 0 ? `${courses.length.toLocaleString()} adaptive courses.` : "Adaptive courses."}
          </h1>
          <p className="text-muted-foreground mt-1">Every course rewrites itself around how you learn.</p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:flex">
          <div className="flex min-w-0 items-center gap-2 rounded-xl bg-surface px-4 py-2.5 border border-border flex-1">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses by title or subject…"
              className="bg-transparent outline-none w-full text-sm placeholder:text-muted-foreground"
            />
          </div>
          <button className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm hover:bg-accent">
            <Filter className="h-4 w-4" /> <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium border transition-colors ${
                activeCat === c
                  ? "bg-primary text-primary-foreground border-primary shadow-[var(--glow-lime)]"
                  : "border-border bg-surface hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid place-items-center h-48">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary mx-auto" />
              <p className="text-muted-foreground text-sm font-mono uppercase tracking-wider">Syncing Course Database...</p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c, i) => (
              <article
                key={c.title}
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
                    {c.category}
                  </div>
                  {c.new && (
                    <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-[0.18em] bg-primary text-primary-foreground rounded-full px-2 py-0.5 font-semibold">
                      new
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold leading-tight">{c.title}</h3>
                  <div className="text-xs text-muted-foreground mt-1">{c.level}</div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" /> {c.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {c.hours}h
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {c.students.toLocaleString()}
                    </span>
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
