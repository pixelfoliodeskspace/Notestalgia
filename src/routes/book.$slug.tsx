import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { bookBySlugQuery } from "@/lib/books";

export const Route = createFileRoute("/book/$slug")({
  loader: async ({ context, params }) => {
    const book = await context.queryClient.ensureQueryData(bookBySlugQuery(params.slug));
    if (!book || !book.published) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — Notestalgia" }, { name: "robots", content: "noindex" }],
      };
    }
    const b = loaderData.book;
    return {
      meta: [
        { title: `${b.title} — Notestalgia` },
        {
          name: "description",
          content:
            b.tagline ?? b.description?.slice(0, 155) ?? "Premium AI notes and digital resources.",
        },
        { property: "og:title", content: `${b.title} — Notestalgia` },
        { property: "og:description", content: b.tagline ?? "" },
        ...(b.cover_image ? [{ property: "og:image" as const, content: b.cover_image }] : []),
      ],
    };
  },
  component: BookPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <div className="font-display text-6xl">Not shelved.</div>
      <p className="mt-4 text-muted-foreground">This title isn't in the library.</p>
      <div className="mt-8">
        <Link to="/collection" className="btn-ink">
          Back to collection
        </Link>
      </div>
    </div>
  ),
});

function BookPage() {
  const { slug } = Route.useParams();
  const { data: book } = useSuspenseQuery(bookBySlugQuery(slug));
  if (!book) return null;

  const discount =
    book.original_price && book.original_price > book.current_price
      ? Math.round(((book.original_price - book.current_price) / book.original_price) * 100)
      : null;

  return (
    <article className="mx-auto max-w-7xl px-6 md:px-10 pt-12 pb-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <Link
          to="/collection"
          className="text-xs font-display tracking-[0.2em] uppercase text-foreground/60 link-underline"
        >
          ← Back to collection
        </Link>
      </motion.div>

      <div className="grid gap-14 md:gap-20 md:grid-cols-[1.1fr_1fr] items-start">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative"
        >
          <div className="relative aspect-[3/4] w-full max-w-[560px] rounded-md overflow-hidden bg-white/5 border border-border shadow-[var(--shadow-lift)]">
            {book.cover_image ? (
              <img
                src={book.cover_image}
                alt={book.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-display text-9xl text-foreground/25">
                {book.title.slice(0, 1)}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="md:pt-8"
        >
          {book.category && <div className="tag-pill mb-6">{book.category}</div>}
          <h1 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight">
            {book.title}
          </h1>
          {book.tagline && (
            <p className="mt-5 text-xl font-serif italic text-foreground/70">{book.tagline}</p>
          )}

          <div className="rule-hair my-10" />

          <div className="flex items-baseline gap-4">
            <div className="font-display text-4xl">₹{Number(book.current_price).toFixed(0)}</div>
            {book.original_price && book.original_price > book.current_price && (
              <>
                <div className="text-lg text-muted-foreground line-through">
                  ₹{Number(book.original_price).toFixed(0)}
                </div>
                {discount && (
                  <div className="text-xs font-display tracking-widest uppercase text-foreground/80">
                    Save {discount}%
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-8">
            <a
              href={book.superprofile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink text-base"
            >
              Proceed to purchase
              <span aria-hidden>→</span>
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              Secure checkout via SuperProfile. Instant delivery.
            </p>
          </div>

          {book.description && (
            <div className="mt-12">
              <h2 className="text-xs font-display tracking-[0.3em] uppercase text-foreground/60 mb-4">
                About this title
              </h2>
              <p className="text-base leading-relaxed text-foreground/85 whitespace-pre-line">
                {book.description}
              </p>
            </div>
          )}

          <div className="mt-12 grid grid-cols-2 gap-6">
            <Meta label="Pages" value={book.pages ? `${book.pages}` : null} />
            <Meta label="Level" value={book.level} />
            <Meta label="Language" value={book.language} />
            <Meta
              label="Updated"
              value={
                book.updated_date
                  ? new Date(book.updated_date).toLocaleDateString(undefined, {
                      month: "short",
                      year: "numeric",
                    })
                  : null
              }
            />
          </div>
        </motion.div>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-[10px] font-display tracking-[0.3em] uppercase text-foreground/50">
        {label}
      </div>
      <div className="mt-1 font-display text-lg">{value}</div>
    </div>
  );
}
