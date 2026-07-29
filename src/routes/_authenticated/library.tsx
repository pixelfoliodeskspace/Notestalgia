import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "motion/react";
import { BookOpen, Download, ExternalLink, Library } from "lucide-react";

export const Route = createFileRoute("/_authenticated/library")({
  head: () => ({
    meta: [
      { title: "My Library — Notestalgia" },
      { name: "description", content: "Your collection of purchased books and study guides." },
    ],
  }),
  component: LibraryPage,
});

type LibraryItem = {
  id: string;
  created_at: string;
  book: {
    id: string;
    title: string;
    slug: string;
    tagline: string | null;
    cover_image: string | null;
    category: string | null;
    superprofile_url: string;
  };
  download?: {
    download_url: string;
  } | null;
};

function LibraryPage() {
  const { user } = Route.useRouteContext();

  const { data: libraryItems, isLoading } = useQuery({
    queryKey: ["user-library", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      // 1. Fetch library books
      const { data: libData, error: libError } = await supabase
        .from("user_library")
        .select(`
          id,
          created_at,
          book:books (
            id,
            title,
            slug,
            tagline,
            cover_image,
            category,
            superprofile_url
          )
        `)
        .eq("user_id", user!.id);

      if (libError) throw libError;
      if (!libData) return [];

      const items = libData as any[];

      // 2. Fetch secure download links for the owned books
      const bookIds = items.map((item) => item.book?.id).filter(Boolean);
      
      if (bookIds.length === 0) return items;

      const { data: dlData, error: dlError } = await supabase
        .from("book_downloads")
        .select("book_id, download_url")
        .in("book_id", bookIds);

      if (dlError) {
        console.error("Error loading download links:", dlError);
        return items;
      }

      // Map download links back to items
      return items.map((item) => {
        const dl = dlData?.find((d) => d.book_id === item.book?.id);
        return {
          ...item,
          download: dl ? { download_url: dl.download_url } : null,
        };
      }) as LibraryItem[];
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 pt-16 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl"
      >
        <div className="text-xs font-display tracking-[0.3em] uppercase text-foreground/60 mb-4 flex items-center gap-2">
          <Library className="w-4 h-4 text-primary" />
          <span>My Shelf</span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
          My Library.
        </h1>
        <p className="mt-6 text-lg text-foreground/70 font-serif italic max-w-xl">
          Your personal repository of purchased AI studies, hand-written notes, and interactive resources.
        </p>
      </motion.div>

      <div className="rule-hair my-14" />

      {isLoading ? (
        <div className="py-24 text-center text-muted-foreground font-display">
          Opening your study cabinet...
        </div>
      ) : !libraryItems || libraryItems.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-white/5 border border-border/40 grid place-items-center text-foreground/40">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-foreground">Your shelf is empty</h3>
            <p className="text-sm text-muted-foreground">
              Once you purchase a title, it will automatically appear here on your digital dashboard.
            </p>
          </div>
          <div className="pt-2">
            <Link to="/collection" className="btn-ink px-6 py-3">
              Explore Collection
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {libraryItems.map((item, index) => {
            const { book, download } = item;
            if (!book) return null;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Cover image wrap */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white/5 border border-border/40 shadow-sm transition-all duration-500 group-hover:scale-[1.02] group-hover:border-primary/30 group-hover:shadow-[0_20px_40px_-15px_rgba(59,17,62,0.3)]">
                    {book.cover_image ? (
                      <img
                        src={book.cover_image}
                        alt={book.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-display text-7xl text-foreground/15">
                        {book.title.slice(0, 1)}
                      </div>
                    )}
                    {book.category && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="tag-pill bg-background/80 backdrop-blur-sm text-[9px]">
                          {book.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text details */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      <Link to="/book/$slug" params={{ slug: book.slug }}>
                        {book.title}
                      </Link>
                    </h3>
                    {book.tagline && (
                      <p className="text-xs text-muted-foreground line-clamp-2 font-serif italic">
                        {book.tagline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 space-y-2">
                  {download?.download_url ? (
                    <a
                      href={download.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center justify-center gap-2 w-full text-center text-xs py-2.5 rounded-xl cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  ) : (
                    <a
                      href={book.superprofile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost flex items-center justify-center gap-2 w-full text-center text-xs py-2.5 rounded-xl cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Access on Superprofile</span>
                    </a>
                  )}
                  <Link
                    to="/book/$slug"
                    params={{ slug: book.slug }}
                    className="block text-center text-[10px] text-muted-foreground hover:text-foreground font-display tracking-widest uppercase transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
