import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { Book } from "@/lib/books";
import { Star } from "lucide-react";

export function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  const discount =
    book.original_price && book.original_price > book.current_price
      ? Math.round(((book.original_price - book.current_price) / book.original_price) * 100)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft text-left h-full">
        <div className="space-y-3.5">
          {/* Book cover img */}
          <Link 
            to="/book/$slug" 
            params={{ slug: book.slug }} 
            className="aspect-[4/3] block overflow-hidden relative rounded-lg bg-muted border border-border/40"
          >
            {book.cover_image ? (
              <img
                src={book.cover_image}
                alt={book.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-muted-foreground/35">
                {book.title.slice(0, 1)}
              </div>
            )}
            {discount && (
              <span className="absolute top-2 left-2 bg-foreground text-background text-[9px] font-sans tracking-wide uppercase px-2 py-0.5 rounded font-semibold">
                -{discount}%
              </span>
            )}
          </Link>

          {/* Title & info */}
          <div className="space-y-1">
            <span className="text-[9px] font-sans uppercase tracking-widest text-muted-foreground/80 font-bold block">
              {book.category || "General"}
            </span>
            <Link to="/book/$slug" params={{ slug: book.slug }}>
              <h3 className="font-serif text-base font-bold text-foreground leading-tight hover:underline truncate">
                {book.title}
              </h3>
            </Link>
            {book.tagline && (
              <p className="text-xs text-muted-foreground line-clamp-1 font-sans mt-0.5">
                {book.tagline}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border/50">
          {/* Rating indicator */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center text-amber-500 gap-0.5">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-[10px] font-bold text-foreground">4.8</span>
            <span className="text-[10px] text-muted-foreground">(210)</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              {book.original_price && book.original_price > book.current_price && (
                <span className="text-[10px] text-muted-foreground line-through leading-none">
                  ₹{Number(book.original_price).toFixed(0)}
                </span>
              )}
              <span className="font-sans font-bold text-sm text-foreground">
                ₹{Number(book.current_price).toFixed(0)}
              </span>
            </div>

            <Link
              to="/book/$slug"
              params={{ slug: book.slug }}
              className="btn-primary !px-4.5 !py-2 text-[10px] font-semibold cursor-pointer rounded-md"
            >
              Details
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
