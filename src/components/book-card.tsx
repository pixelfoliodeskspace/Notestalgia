import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { Book } from "@/lib/books";
import { Star, Heart, ShoppingBag, Check } from "lucide-react";
import { useCartWishlist } from "@/hooks/use-cart-wishlist";

export function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  const { isInCart, addToCart, removeFromCart, isInWishlist, toggleWishlist } = useCartWishlist();
  
  const discount =
    book.original_price && book.original_price > book.current_price
      ? Math.round(((book.original_price - book.current_price) / book.original_price) * 100)
      : null;

  const inCart = isInCart(book.id);
  const inWishlist = isInWishlist(book.id);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      removeFromCart(book.id);
    } else {
      addToCart(book.id);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(book.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Link to="/book/$slug" params={{ slug: book.slug }} className="group block text-left">
        {/* Cover Image Container (aspect-3/4 rounded-xl) */}
        <div className="aspect-[3/4] overflow-hidden relative rounded-2xl border-2 border-border/85 bg-muted/30 shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:rotate-1.5 group-hover:shadow-soft">
          {book.cover_image ? (
            <img
              src={book.cover_image}
              alt={book.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-muted-foreground/35 bg-muted/40">
              {book.title.slice(0, 1)}
            </div>
          )}
          
          {/* Discount Badge */}
          {discount && (
            <span className="absolute top-2.5 left-2.5 bg-foreground text-background text-[9px] font-sans tracking-wide uppercase px-2 py-0.5 rounded font-semibold select-none z-10">
              -{discount}%
            </span>
          )}

          {/* Interactive Floating Wishlist Heart Toggle */}
          <button
            onClick={handleWishlistClick}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-background/85 hover:bg-background border border-border/40 shadow-sm backdrop-blur transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Heart 
              className={`w-3.5 h-3.5 transition-colors ${
                inWishlist 
                  ? "fill-red-500 text-red-500" 
                  : "text-foreground/70 group-hover:text-foreground"
              }`} 
            />
          </button>

          {/* Interactive Floating Add-To-Cart Toggle */}
          <button
            onClick={handleCartClick}
            aria-label={inCart ? "Remove from cart" : "Add to cart"}
            className={`absolute bottom-2.5 right-2.5 z-10 p-2 rounded-full border shadow-sm backdrop-blur transition-all duration-200 cursor-pointer active:scale-95 ${
              inCart
                ? "bg-foreground text-background border-foreground"
                : "bg-background/85 hover:bg-background border-border/40 text-foreground/70"
            }`}
          >
            {inCart ? (
              <Check className="w-3.5 h-3.5 stroke-[3px]" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5" />
            )}
          </button>
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
