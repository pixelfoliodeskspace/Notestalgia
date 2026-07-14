import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { publishedBooksQuery } from "@/lib/books";
import { BookCard } from "@/components/book-card";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "The Collection — Notestalgia" },
      {
        name: "description",
        content:
          "Browse the full Notestalgia catalog of premium AI notes, guides, and digital resources.",
      },
      { property: "og:title", content: "The Collection — Notestalgia" },
      {
        property: "og:description",
        content: "Premium AI notes, guides and digital resources.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedBooksQuery),
  component: CollectionPage,
});

function CollectionPage() {
  const { data: books } = useSuspenseQuery(publishedBooksQuery);
  const [filter, setFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => b.category && set.add(b.category));
    return ["all", ...Array.from(set)];
  }, [books]);

  const filtered = filter === "all" ? books : books.filter((b) => b.category === filter);

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 pt-16 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl"
      >
        <div className="text-xs font-display tracking-[0.3em] uppercase text-ink/60 mb-4">
          Catalog
        </div>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
          The Collection.
        </h1>
        <p className="mt-6 text-lg text-ink/70 font-serif italic max-w-xl">
          Every title in the library. Read, chosen, and shelved with care.
        </p>
      </motion.div>

      {categories.length > 1 && (
        <div className="mt-14 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`tag-pill transition-all ${
                filter === c ? "bg-ink text-cream border-ink" : "hover:border-ink/50"
              }`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      )}

      <div className="rule-hair my-14" />

      {filtered.length === 0 ? (
        <div className="py-24 text-center text-muted-foreground font-display">
          No titles found in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {filtered.map((b, i) => (
            <BookCard key={b.id} book={b} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
