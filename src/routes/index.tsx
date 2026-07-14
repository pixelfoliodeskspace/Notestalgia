import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { publishedBooksQuery } from "@/lib/books";
import { BookCard } from "@/components/book-card";
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  Clock
} from "lucide-react";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedBooksQuery),
  component: Home,
});

const TITLE = "Notestalgia";

function Hero() {
  const { data: books } = useSuspenseQuery(publishedBooksQuery);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeBook = books && books.length > 0 ? books[activeIndex] : null;

  const handleNext = () => {
    if (!books || books.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % books.length);
  };

  const handlePrev = () => {
    if (!books || books.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  // Inline styles for 3D physical book effect
  const spineStyle = {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    left: '-14px',
    width: '14px',
    transformOrigin: 'right',
    transform: 'rotateY(-90deg)',
    backgroundColor: '#1c1917', // dark stone-900
    boxShadow: 'inset -2px 0 8px rgba(0,0,0,0.5)',
    borderRight: '1px solid rgba(255,255,255,0.08)',
  };

  const bookStyle = {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d' as const,
    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    transform: isHovered 
      ? 'rotateY(-24deg) rotateX(8deg) rotateZ(-1deg)' 
      : 'rotateY(-4deg) rotateX(2deg) rotateZ(0deg)',
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40">
      {/* Dynamic ambient gradients */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute -top-40 -left-20 w-[450px] h-[450px] rounded-full bg-mustard/20 blur-[100px] pointer-events-none"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.2 }}
        className="absolute -bottom-60 -right-20 w-[600px] h-[600px] rounded-full bg-dusty/15 blur-[120px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Premium Brand Text & Content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ink/10 bg-paper/50 backdrop-blur-sm text-[10px] font-display uppercase tracking-widest text-ink/70"
            >
              <Sparkles className="w-3 h-3 text-mustard animate-pulse" />
              <span>— Est. 2026 · Premium Digital Library</span>
            </motion.div>

            <div className="space-y-4">
              <h1 className="font-serif text-[12vw] sm:text-[8vw] lg:text-[6.5rem] leading-[0.95] tracking-[-0.03em] text-ink">
                {TITLE.split("").map((letter, i) => {
                  const isNote = i < 4;
                  return (
                    <motion.span
                      key={i}
                      initial={{ y: "80%", rotate: 4, opacity: 0 }}
                      animate={{ y: "0%", rotate: 0, opacity: 1 }}
                      transition={{
                        delay: i * 0.04,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`inline-block ${isNote ? "text-mustard" : "text-dusty"}`}
                      style={{ transformOrigin: "bottom left" }}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="inline-block text-mustard"
                >
                  .
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="max-w-xl text-base md:text-lg text-ink/75 leading-relaxed font-sans"
              >
                A carefully curated sanctuary of premium notes, guides, and timeless digital classics. Beautifully formatted, enriched with AI summaries, and made to last.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a href="#collection" className="btn-ink text-base group flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
                Browse collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link to="/about" className="btn-ghost text-sm font-medium hover:bg-paper/80 transition-colors">
                Our Story
              </Link>
            </motion.div>

            {/* Mini Trust Stats Panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-ink/10 max-w-lg"
            >
              <div>
                <div className="font-display text-2xl font-bold text-ink">
                  {books ? books.length : 0}
                </div>
                <div className="text-[11px] font-display uppercase tracking-wider text-ink/60 mt-1">
                  Seeded Titles
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-ink">₹99</div>
                <div className="text-[11px] font-display uppercase tracking-wider text-ink/60 mt-1">
                  Starting Price
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-ink">Instant</div>
                <div className="text-[11px] font-display uppercase tracking-wider text-ink/60 mt-1">
                  Digital Access
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium 3D Book Interactive Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {activeBook ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="w-full max-w-[340px] flex flex-col items-center"
              >
                {/* 3D Book Container */}
                <div 
                  className="relative perspective-[1200px] w-[200px] h-[280px] sm:w-[230px] sm:h-[320px] cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div style={bookStyle} className="shadow-lg hover:shadow-2xl">
                    {/* Spine */}
                    <div style={spineStyle} />

                    {/* Book Front Cover Image */}
                    <div className="absolute inset-0 w-full h-full rounded-r-sm overflow-hidden bg-stone-900 border border-ink/5">
                      <img 
                        src={activeBook.cover_image || ""} 
                        alt={activeBook.title} 
                        className="w-full h-full object-cover select-none"
                      />
                      {/* Glare overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Floor Shadow */}
                  <div 
                    className="absolute -bottom-8 left-3 right-3 h-4 bg-ink/10 blur-[8px] rounded-full scale-x-90 transition-all duration-500 pointer-events-none"
                    style={{
                      transform: isHovered ? 'scaleX(1.05) translateY(2px) opacity(0.8)' : 'scaleX(0.95) translateY(0px) opacity(0.5)'
                    }}
                  />
                </div>

                {/* Book Meta Card */}
                <div className="w-full mt-10 text-center space-y-3 bg-paper/60 backdrop-blur-sm p-4 rounded-xl border border-ink/5 shadow-sm">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-[10px] font-display uppercase tracking-widest bg-mustard/20 text-ink px-2 py-0.5 rounded">
                      {activeBook.category}
                    </span>
                    <span className="text-xs text-ink/50 font-serif">· Featured Title</span>
                  </div>

                  <h3 className="font-serif text-xl text-ink font-semibold leading-tight line-clamp-1">
                    {activeBook.title}
                  </h3>

                  <p className="text-xs text-ink/60 line-clamp-2 px-4 h-8 font-serif italic">
                    "{activeBook.tagline || activeBook.description}"
                  </p>

                  <div className="flex items-center justify-between px-4 pt-2">
                    <span className="font-display text-base font-bold text-ink">
                      ₹{Number(activeBook.current_price).toFixed(0)}
                    </span>
                    
                    <Link
                      to="/book/$slug"
                      params={{ slug: activeBook.slug }}
                      className="text-xs font-display text-ink hover:text-mustard inline-flex items-center gap-1 transition-colors"
                    >
                      Explore details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Switcher Controls */}
                {books.length > 1 && (
                  <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full border border-ink/10 bg-cream/80 backdrop-blur hover:bg-ink hover:text-cream flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
                      title="Previous book"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="font-display text-xs text-ink/60">
                      {activeIndex + 1} of {books.length}
                    </span>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full border border-ink/10 bg-cream/80 backdrop-blur hover:bg-ink hover:text-cream flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
                      title="Next book"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              // Premium Fallback if no books are seeded
              <div className="w-full max-w-[260px] h-[340px] rounded-lg border-2 border-dashed border-ink/20 flex flex-col items-center justify-center p-6 text-center paper-bg shadow-inner">
                <BookOpen className="w-10 h-10 text-ink/30 mb-3" />
                <div className="font-display text-sm font-semibold text-ink/80">No Books Seeded Yet</div>
                <p className="text-xs text-ink/50 mt-1">Sign in to the Admin Panel to seed your collection.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5 text-mustard" />,
      title: "Rich AI Notes",
      desc: "Every title includes complete AI summaries, key character blueprints, thematic exploration, and analysis."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-dusty" />,
      title: "Curated Classics",
      desc: "Carefully selected children's books and historical treasures, compiled in beautiful digital formats."
    },
    {
      icon: <Clock className="w-5 h-5 text-faded" />,
      title: "Clean Typography",
      desc: "Meticulously designed editorial interfaces built for optimal reading comfort on any desktop or mobile screen."
    }
  ];

  return (
    <section className="bg-paper/40 py-16 border-y border-ink/5">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-4 p-5 rounded-xl bg-cream/55 border border-ink/5 hover:border-ink/10 transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-paper h-fit border border-ink/5">
                {f.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-semibold text-ink">{f.title}</h4>
                <p className="text-xs text-ink/75 leading-relaxed font-sans">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionPreview() {
  const { data: books } = useSuspenseQuery(publishedBooksQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Extract unique categories dynamically
  const categories = ["all", ...Array.from(new Set(books.map((b) => b.category).filter(Boolean)))];

  // Filter books based on active category tab
  const filteredBooks = selectedCategory === "all" 
    ? books 
    : books.filter((b) => b.category === selectedCategory);

  return (
    <section id="collection" className="relative mx-auto max-w-7xl px-6 md:px-10 py-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-[10px] font-display tracking-[0.3em] uppercase text-ink/60 mb-2">
            The Catalog
          </div>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight">
            Small library.<br />Big attention to detail.
          </h2>
        </div>
        <Link to="/collection" className="link-underline text-xs font-display self-start md:self-end text-ink/80 hover:text-ink">
          View full archive →
        </Link>
      </div>

      {/* Category Filter Tabs */}
      {books.length > 0 && categories.length > 2 && (
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-ink/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-display uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-ink text-cream font-medium shadow-sm"
                  : "bg-paper/60 text-ink/70 hover:bg-paper hover:text-ink border border-ink/5"
              }`}
            >
              {cat === "all" ? "All Volumes" : cat}
            </button>
          ))}
        </div>
      )}

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <EmptyState />
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          >
            {filteredBooks.slice(0, 8).map((b, i) => (
              <BookCard key={b.id} book={b} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border border-dashed border-ink/15 rounded-xl py-20 text-center bg-paper/50"
    >
      <BookOpen className="w-8 h-8 text-ink/30 mx-auto mb-3" />
      <div className="font-serif text-2xl text-ink font-semibold mb-2">Shelves being stocked.</div>
      <p className="text-xs text-ink/60 max-w-sm mx-auto font-sans">
        The matching titles in this category are being formatted and will appear here shortly. Sign in as admin to manage.
      </p>
    </motion.div>
  );
}

function Home() {
  return (
    <div className="space-y-6">
      <Hero />
      <FeaturesSection />
      <Suspense fallback={
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 text-center text-xs font-display text-ink/50 tracking-wider">
          Loading library collection...
        </div>
      }>
        <CollectionPreview />
      </Suspense>
    </div>
  );
}
