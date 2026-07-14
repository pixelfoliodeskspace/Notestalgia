import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { publishedBooksQuery } from "@/lib/books";
import { BookCard } from "@/components/book-card";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedBooksQuery),
  component: Home,
});

const TITLE = "Notestalgia";

function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 md:pt-40 md:pb-48">
      {/* floating retro shapes */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute -top-20 -left-16 w-[380px] h-[380px] rounded-full bg-mustard/25 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        className="absolute -bottom-40 -right-24 w-[520px] h-[520px] rounded-full bg-dusty/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xs font-display tracking-[0.3em] uppercase text-ink/60 mb-8"
        >
          — Est. 2026 · A premium digital library
        </motion.div>

        <h1 className="font-display text-[16vw] md:text-[10vw] lg:text-[9rem] leading-[0.9] tracking-[-0.04em] text-ink">
          {TITLE.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", rotate: 6, opacity: 0 }}
              animate={{ y: "0%", rotate: 0, opacity: 1 }}
              transition={{
                delay: 0.15 + i * 0.05,
                duration: 0.9,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="inline-block"
              style={{ transformOrigin: "bottom left" }}
            >
              {letter}
            </motion.span>
          ))}
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="inline-block text-mustard"
          >
            .
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-10 md:mt-14 max-w-xl text-lg md:text-xl text-ink/75 leading-relaxed font-serif italic"
        >
          Premium AI notes, guides &amp; digital resources — quietly curated,
          beautifully written, and made to last.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a href="#collection" className="btn-ink text-base">
            Browse collection
            <span aria-hidden>→</span>
          </a>
          <Link to="/about" className="btn-ghost text-sm">About Notestalgia</Link>
        </motion.div>
      </div>
    </section>
  );
}

function CollectionPreview() {
  const { data: books } = useSuspenseQuery(publishedBooksQuery);

  return (
    <section id="collection" className="relative mx-auto max-w-7xl px-6 md:px-10 pb-24">
      <div className="rule-hair mb-14" />
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="text-xs font-display tracking-[0.3em] uppercase text-ink/60 mb-3">
            The Collection
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Small library.<br />Big attention to detail.
          </h2>
        </div>
        <Link to="/collection" className="link-underline text-sm font-display self-start md:self-end">
          View all →
        </Link>
      </div>

      {books.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {books.slice(0, 8).map((b, i) => (
            <BookCard key={b.id} book={b} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="border border-dashed border-border rounded-lg py-24 text-center paper-bg"
    >
      <div className="font-display text-3xl mb-3">Shelves being stocked.</div>
      <p className="text-muted-foreground max-w-md mx-auto">
        The first titles will appear here soon. Sign in as admin to add your first book.
      </p>
    </motion.div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="mx-auto max-w-7xl px-6 md:px-10 pb-24">Loading…</div>}>
        <CollectionPreview />
      </Suspense>
    </>
  );
}
