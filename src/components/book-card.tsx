import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { Book } from "@/lib/books";

export function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  const discount =
    book.original_price && book.original_price > book.current_price
      ? Math.round(((book.original_price - book.current_price) / book.original_price) * 100)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Link
        to="/book/$slug"
        params={{ slug: book.slug }}
        className="group block"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-white/5 border border-border">
          {book.cover_image ? (
            <img
              src={book.cover_image}
              alt={book.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-display text-3xl text-foreground/25">
              {book.title.slice(0, 1)}
            </div>
          )}
          {discount && (
            <div className="absolute top-3 left-3 bg-mustard text-foreground text-[10px] font-display tracking-widest uppercase px-2 py-1 rounded-full">
              −{discount}%
            </div>
          )}
          <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="text-xs font-display uppercase tracking-widest text-cream bg-ink/85 backdrop-blur px-3 py-2 rounded-full inline-flex">
              View →
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {book.category && <div className="tag-pill mb-2">{book.category}</div>}
            <h3 className="font-display text-lg leading-tight truncate">{book.title}</h3>
            {book.tagline && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{book.tagline}</p>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="font-display text-base">
              ₹{Number(book.current_price).toFixed(0)}
            </div>
            {book.original_price && book.original_price > book.current_price && (
              <div className="text-xs text-muted-foreground line-through">
                ₹{Number(book.original_price).toFixed(0)}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
