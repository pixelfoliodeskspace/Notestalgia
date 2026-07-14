import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Notestalgia" },
      {
        name: "description",
        content: "Notestalgia is a quiet library of premium AI notes and guides — editorial, retro, made for learners.",
      },
      { property: "og:title", content: "About — Notestalgia" },
      { property: "og:description", content: "A quiet library, made for learners." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-xs font-display tracking-[0.3em] uppercase text-foreground/60 mb-6">
          About
        </div>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
          A quiet library, made for learners.
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mt-14 space-y-6 text-lg leading-relaxed text-foreground/85"
      >
        <p className="font-serif italic text-2xl leading-snug text-foreground">
          "The best notes feel less like a product and more like a paper you kept for years."
        </p>
        <p>
          Notestalgia is a small, carefully assembled catalog of premium AI notes,
          guides, and digital resources. Each title is written to be useful for a
          long time — no filler, no trend chasing, no noise.
        </p>
        <p>
          The library is retro-inspired on purpose. We believe learning material
          deserves the same craft as a good book: an honest cover, considered
          typography, and the space to actually think.
        </p>
        <p>
          When you choose a title, checkout happens on our partner SuperProfile.
          You'll receive your files instantly there.
        </p>
      </motion.div>

      <div className="mt-16">
        <Link to="/collection" className="btn-ink">Browse the collection</Link>
      </div>
    </div>
  );
}
