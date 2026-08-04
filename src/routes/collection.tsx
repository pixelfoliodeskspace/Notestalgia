import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useMemo } from "react";
import { publishedBooksQuery } from "@/lib/books";
import { BookCard } from "@/components/book-card";
import { z } from "zod";
import { Search } from "lucide-react";

const collectionSearchSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
});

export const Route = createFileRoute("/collection")({
  validateSearch: collectionSearchSchema,
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
  const { search = "", category = "all" } = Route.useSearch();
  const navigate = Route.useNavigate();

  const categories = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => b.category && set.add(b.category));
    return ["all", ...Array.from(set)];
  }, [books]);

  // Combine query filters dynamically
  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchCategory =
        category === "all" || 
        !b.category ||
        b.category.toLowerCase() === category.toLowerCase();
        
      const matchSearch =
        !search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        (b.category && b.category.toLowerCase().includes(search.toLowerCase())) ||
        (b.tagline && b.tagline.toLowerCase().includes(search.toLowerCase()));
        
      return matchCategory && matchSearch;
    });
  }, [books, search, category]);

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 pt-16 pb-24 text-left">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl"
      >
        <div className="text-xs font-display tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Catalog
        </div>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight font-bold text-foreground">
          The Collection.
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground font-serif italic max-w-xl">
          Every title in the library. Read, chosen, and shelved with care.
        </p>
      </motion.div>

      {/* Real-time search bar & category filters */}
      <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Category Pills list */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const isActive = (category === "all" ? "all" : category.toLowerCase()) === c.toLowerCase();
              return (
                <button
                  key={c}
                  onClick={() => {
                    navigate({
                      search: (prev) => ({ ...prev, category: c }),
                    });
                  }}
                  className={`tag-pill transition-all cursor-pointer py-1.5 px-4 rounded-full border text-xs font-semibold uppercase tracking-wider ${
                    isActive 
                      ? "bg-ink text-cream border-ink" 
                      : "bg-muted/40 hover:bg-muted/70 text-muted-foreground border-border/80"
                  }`}
                >
                  {c === "all" ? "All" : c}
                </button>
              );
            })}
          </div>
        )}

        {/* Real-time search input */}
        <div className="relative w-full max-w-xs shrink-0">
          <input
            type="text"
            placeholder="Search collection..."
            value={search}
            onChange={(e) => {
              const val = e.target.value;
              navigate({
                search: (prev) => ({ ...prev, search: val || undefined }),
              });
            }}
            className="w-full bg-muted/40 pl-8.5 pr-4 py-2 border border-border rounded-md font-sans text-xs focus:outline-none focus:border-foreground/50 text-foreground transition-all"
          />
          <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-3.5" />
        </div>
      </div>

      <div className="rule-hair my-10" />

      {filtered.length === 0 ? (
        <div className="py-24 text-center text-muted-foreground font-sans text-sm italic">
          No titles found in this category matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
          {filtered.map((b, i) => (
            <BookCard key={b.id} book={b} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
