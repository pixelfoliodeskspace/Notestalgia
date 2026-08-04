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
      <Link to="/book/$slug" params={{ slug: book.slug }} className="group block text-left">
        {/* Cover Image Container (aspect-3/4 rounded-xl) */}
        <div className="aspect-[3/4] overflow-hidden relative rounded-xl border border-border/40 bg-muted/30">
          {book.cover_image ? (
            <img
              src={book.cover_image}
              alt={book.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-muted-foreground/35 bg-muted/40">
              {book.title.slice(0, 1)}
            </div>
          )}
          {discount && (
            <span className="absolute top-2.5 left-2.5 bg-foreground text-background text-[9px] font-sans tracking-wide uppercase px-2 py-0.5 rounded font-semibold">
              -{discount}%
            </span>
          )}
        </div>

        {/* Text Metadata Stack */}
        <div className="mt-3.5 space-y-1">
          <h3 className="font-serif text-sm font-bold text-foreground leading-tight group-hover:underline truncate">
            {book.title}
          </h3>
          <p className="text-[11px] text-muted-foreground font-sans">
            by {book.author || "Notestalgia Editorial"}
          </p>
          
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
              <span className="font-bold text-foreground">4.8</span>
              <span className="text-muted-foreground font-sans text-[10px]">(320)</span>
            </div>
            
            <div className="text-right">
              <span className="font-sans font-bold text-xs md:text-sm text-foreground">
                ₹{Number(book.current_price).toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
