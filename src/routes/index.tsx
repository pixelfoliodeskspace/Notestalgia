import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState, useEffect } from "react";
import { publishedBooksQuery } from "@/lib/books";
import { BookCard } from "@/components/book-card";
import { 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Search,
  Compass
} from "lucide-react";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedBooksQuery),
  component: Home,
});

const TITLE = "Notestalgia";

// Background falling leaves component
function FallingLeaves() {
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    // Generate random leaves
    const newLeaves = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage width
      delay: Math.random() * 10,  // seconds delay
      duration: 10 + Math.random() * 15, // seconds speed
      size: 10 + Math.random() * 15, // px size
      color: Math.random() > 0.5 ? "text-sage" : "text-mustard",
      rotateStart: Math.random() * 360,
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {leaves.map((leaf) => (
        <motion.svg
          key={leaf.id}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`absolute ${leaf.color} opacity-40`}
          style={{
            left: `${leaf.left}%`,
            width: leaf.size,
            height: leaf.size,
            top: -20,
          }}
          initial={{ y: -50, x: 0, rotate: leaf.rotateStart, opacity: 0 }}
          animate={{
            y: "110vh",
            x: [0, 40, -40, 20, 0],
            rotate: [leaf.rotateStart, leaf.rotateStart + 180, leaf.rotateStart + 360],
            opacity: [0, 0.4, 0.4, 0.2, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Simple leaf outline */}
          <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.5C7.2 21.2 8 22 8 22s0.8-0.8 1.5-1.5C12.2 18.6 14 15.5 14 12c0-5.5-4.5-10-10-10zm0 0c5.5 0 10 4.5 10 10 0 3.5-1.8 6.6-4.5 8.5C16.8 21.2 16 22 16 22s-0.8-0.8-1.5-1.5C11.8 18.6 10 15.5 10 12c0-5.5 4.5-10 10-10z" />
        </motion.svg>
      ))}
    </div>
  );
}

// Glowing background fireflies component
function Fireflies() {
  const [fireflies, setFireflies] = useState<any[]>([]);

  useEffect(() => {
    const newFireflies = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      top: 15 + Math.random() * 70,
      delay: Math.random() * 4,
      size: 4 + Math.random() * 4,
    }));
    setFireflies(newFireflies);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {fireflies.map((ff) => (
        <motion.div
          key={ff.id}
          className="absolute rounded-full bg-honey"
          style={{
            left: `${ff.left}%`,
            top: `${ff.top}%`,
            width: ff.size,
            height: ff.size,
            filter: "blur(1px)",
            boxShadow: "0 0 8px #F2C14E, 0 0 16px #F2C14E",
          }}
          animate={{
            y: [0, -15, 10, -5, 0],
            x: [0, 10, -10, 5, 0],
            opacity: [0.1, 0.9, 0.4, 0.9, 0.1],
            scale: [0.8, 1.2, 0.9, 1.2, 0.8],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            delay: ff.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Sunbeams filtering through branches
function Sunbeams() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-45" aria-hidden="true">
      <div 
        className="absolute top-0 left-1/4 w-[200px] h-[150%] bg-gradient-to-r from-honey/10 via-honey/5 to-transparent origin-top-left -rotate-45"
        style={{ filter: "blur(40px)" }}
      />
      <div 
        className="absolute top-0 left-1/2 w-[300px] h-[150%] bg-gradient-to-r from-honey/10 via-honey/3 to-transparent origin-top-left -rotate-40"
        style={{ filter: "blur(60px)" }}
      />
    </div>
  );
}

function Hero() {
  const { data: books } = useSuspenseQuery(publishedBooksQuery);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  // Pre-defined branch coordinates for hanging fruits on the Tree of Knowledge (SVG dimensions: 800x600)
  const hangingSpots = [
    { x: "22%", y: "24%", name: "Branch A (Left High)", delay: "0.2s" },
    { x: "74%", y: "28%", name: "Branch B (Right High)", delay: "0.8s" },
    { x: "15%", y: "46%", name: "Branch C (Left Low)", delay: "1.4s" },
    { x: "82%", y: "48%", name: "Branch D (Right Low)", delay: "0.5s" },
    { x: "34%", y: "38%", name: "Branch E (Center Left)", delay: "1.1s" },
    { x: "65%", y: "42%", name: "Branch F (Center Right)", delay: "1.7s" },
  ];

  return (
    <section className="relative overflow-hidden pt-24 pb-28 min-h-[90vh] flex flex-col justify-center">
      <Sunbeams />
      <FallingLeaves />
      <Fireflies />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Info & Signpost */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-forest/20 bg-sage/10 backdrop-blur-sm text-[10px] font-display uppercase tracking-widest text-forest font-semibold"
            >
              <Sparkles className="w-3 h-3 text-honey animate-pulse" />
              <span>THE TREE OF KNOWLEDGE</span>
            </motion.div>

            <div className="space-y-4">
              {/* Illustrated logo text styling */}
              <h1 className="font-serif text-[12vw] sm:text-[8vw] lg:text-[5.5rem] leading-[0.95] tracking-[-0.03em] text-ink">
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
                      className={`inline-block font-bold ${isNote ? "text-mustard" : "text-dusty"}`}
                      style={{ transformOrigin: "bottom left" }}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
                <span className="text-mustard">.</span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="max-w-xl text-base md:text-lg text-ink/80 leading-relaxed font-serif italic"
              >
                "Step into the sacred orchard where books grow on branches. Harvest handpicked digital guides, notes, and children's stories curated with pure love."
              </motion.p>
            </div>

            {/* Handcrafted wooden sign buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a 
                href="#collection" 
                className="relative inline-flex items-center gap-2 px-6 py-2.5 bg-walnut text-cream rounded-md font-serif text-sm border-b-4 border-stone-900 shadow-md hover:translate-y-[2px] hover:border-b-2 active:translate-y-[4px] active:border-b-0 transition-all cursor-pointer group"
              >
                <span>Harvest Catalog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link 
                to="/about" 
                className="relative inline-flex items-center justify-center px-6 py-2.5 bg-paper border border-walnut/20 text-walnut rounded-md font-serif text-sm hover:bg-sage/10 transition-colors"
              >
                Our Story
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Immersive Tree of Knowledge SVG & Hanging Books */}
          <div className="lg:col-span-6 flex items-center justify-center min-h-[480px] relative">
            
            {/* The Tree of Knowledge Illustration (SVG) */}
            <div className="w-full max-w-[500px] aspect-[4/5] relative">
              <svg 
                viewBox="0 0 400 500" 
                className="w-full h-full text-walnut absolute inset-0 select-none animate-sway origin-bottom pointer-events-none"
              >
                {/* Roots */}
                <path d="M160 480c5 5 25 20 40 20s35-15 40-20l-10-30h-60z" fill="currentColor" opacity="0.15" />
                {/* Trunk */}
                <path d="M180 480c-5-20-10-80-5-150s30-100 45-120c10-15 25-30 20-50s-20-30-35-15c-12 12-25 35-30 60s-5 80-15 120-30 70-35 90c-5 15-5 50-10 65z" fill="currentColor" />
                {/* Branch Left */}
                <path d="M175 320c-30-20-80-25-110 5-15 15-20 45-5 55s35-15 45-30c12-18 45-20 70-15z" fill="currentColor" />
                {/* Branch Right */}
                <path d="M205 310c30-20 90-15 115 15 15 18 10 45-5 50s-25-25-40-35c-15-10-50-15-70-10z" fill="currentColor" />
                {/* Branch High Left */}
                <path d="M185 240c-25-25-70-40-95-20-15 12-15 35-2 42s25-15 35-25c15-15 42-10 62-3z" fill="currentColor" />
                {/* Branch High Right */}
                <path d="M210 230c25-25 75-35 95-5 12 18 2 40-10 42s-22-22-35-27c-15-5-40-5-50-2z" fill="currentColor" />
                
                {/* Leaves clusters */}
                <circle cx="95" cy="200" r="45" fill="currentColor" className="text-forest" opacity="0.35" />
                <circle cx="310" cy="210" r="48" fill="currentColor" className="text-forest" opacity="0.35" />
                <circle cx="50" cy="335" r="40" fill="currentColor" className="text-forest" opacity="0.35" />
                <circle cx="330" cy="340" r="42" fill="currentColor" className="text-forest" opacity="0.35" />
                <circle cx="205" cy="120" r="55" fill="currentColor" className="text-forest" opacity="0.4" />
                
                {/* Woven leaf details */}
                <circle cx="205" cy="120" r="40" fill="currentColor" className="text-sage" opacity="0.25" />
                <circle cx="95" cy="200" r="30" fill="currentColor" className="text-sage" opacity="0.25" />
                <circle cx="310" cy="210" r="32" fill="currentColor" className="text-sage" opacity="0.25" />
              </svg>

              {/* Dynamic Hanging Book Items */}
              {books && books.slice(0, 6).map((book, idx) => {
                const spot = hangingSpots[idx];
                return (
                  <div
                    key={book.id}
                    className="absolute"
                    style={{
                      left: spot.x,
                      top: spot.y,
                      transform: "translate(-50%, -20%)",
                    }}
                  >
                    {/* Hanging rope line */}
                    <div className="w-[1.5px] bg-walnut/30 h-10 mx-auto origin-top" />

                    {/* Hanging Fruit Container with swing animation */}
                    <motion.div
                      style={{ transformOrigin: "top center" }}
                      animate={{
                        rotate: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 5 + idx,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      onClick={() => setSelectedBook(book)}
                      className="cursor-pointer relative group"
                    >
                      {/* Fruit shell / Lantern wrapper */}
                      <div className="relative w-11 h-14 bg-berry/85 group-hover:bg-honey border border-walnut/20 rounded-b-full rounded-t-[50%] flex items-center justify-center shadow-md transition-all duration-300 transform group-hover:scale-115">
                        {/* Glow backlighting */}
                        <div className="absolute inset-0 bg-honey rounded-full filter blur-md opacity-0 group-hover:opacity-85 transition-opacity" />

                        {/* Seed details / Book cover thumbnail */}
                        {book.cover_image ? (
                          <img 
                            src={book.cover_image} 
                            alt={book.title} 
                            className="w-6 h-9 object-cover rounded shadow-sm border border-walnut/10 select-none pointer-events-none"
                          />
                        ) : (
                          <div className="text-xs font-serif font-bold text-cream select-none pointer-events-none">
                            📖
                          </div>
                        )}
                        
                        {/* Little leaf on top of fruit */}
                        <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-4 h-2 bg-sage rounded-full rotate-12 border border-walnut/10" />
                      </div>

                      {/* Tooltip on Hover */}
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-32 bg-ink/90 backdrop-blur-sm border border-walnut/20 text-cream p-2 rounded-lg text-center opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-xl z-30">
                        <div className="text-[10px] font-serif font-bold line-clamp-1">{book.title}</div>
                        <div className="text-[9px] font-display text-mustard mt-0.5">₹{Number(book.current_price).toFixed(0)}</div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Immersive Overlay Panel when a hanging book is clicked */}
            <AnimatePresence>
              {selectedBook && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 z-40 bg-paper/95 border border-walnut/15 rounded-2xl p-5 flex flex-col justify-between shadow-2xl backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-display uppercase tracking-widest bg-sage/20 text-forest px-2 py-0.5 rounded">
                      {selectedBook.category}
                    </span>
                    <button 
                      onClick={() => setSelectedBook(null)}
                      className="text-xs font-serif text-ink/50 hover:text-ink cursor-pointer bg-ink/5 px-2 py-0.5 rounded"
                    >
                      Close ✕
                    </button>
                  </div>

                  <div className="flex gap-4 items-center my-3">
                    <img 
                      src={selectedBook.cover_image} 
                      alt={selectedBook.title}
                      className="w-16 h-24 object-cover rounded shadow border border-walnut/10"
                    />
                    <div className="space-y-1 min-w-0">
                      <h4 className="font-serif text-lg font-bold text-ink truncate">{selectedBook.title}</h4>
                      <p className="text-[11px] font-serif text-ink/70 italic line-clamp-2">
                        "{selectedBook.tagline || selectedBook.description}"
                      </p>
                      <div className="font-display text-sm font-bold text-ink mt-1">
                        ₹{Number(selectedBook.current_price).toFixed(0)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-walnut/10">
                    <Link
                      to="/book/$slug"
                      params={{ slug: selectedBook.slug }}
                      className="flex-1 btn-ink text-xs py-2 text-center flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Harvest PDF Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

function WoodlandFeatures() {
  const values = [
    {
      icon: "🍄",
      title: "Handcrafted Mushrooms",
      desc: "Every digital notebook is structured like a beautiful woodland journal, packed with rich character blueprint lists and chapter summaries."
    },
    {
      icon: "🧺",
      title: "Cozy Harvesting",
      desc: "No corporate grids. Harvest your reads directly from the Tree of Knowledge. PDF links are packaged as forest seeds in your account."
    },
    {
      icon: "🦉",
      title: "Wisdom of the Owl",
      desc: "Classic children's stories, adventure journals, and editorial notes designed to preserve the timeless wonder of literature."
    }
  ];

  return (
    <section className="bg-paper/50 py-16 border-y border-walnut/10 relative">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-4 p-6 rounded-xl bg-cream/70 border border-walnut/5 hover:border-walnut/10 transition-colors shadow-sm"
            >
              <div className="text-3xl p-2 bg-paper rounded-lg border border-walnut/5 h-fit select-none">
                {v.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-ink">{v.title}</h4>
                <p className="text-xs text-ink/75 leading-relaxed font-sans">{v.desc}</p>
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
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", "Kids", "Adventure", "Classics"];

  // Filter books based on active category and search query
  const filteredBooks = books.filter((b) => {
    const matchesCategory = selectedCategory === "all" || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (b.tagline && b.tagline.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="collection" className="relative mx-auto max-w-7xl px-6 md:px-10 py-24">
      
      {/* Search & Signboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Signboard Category Selector & Botanical Search */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* Botanical Search Journal */}
          <div className="bg-paper p-5 rounded-2xl border border-walnut/10 shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-mustard/10 rounded-full filter blur-xl pointer-events-none" />
            <h3 className="font-serif text-lg font-bold text-ink mb-3 flex items-center gap-1.5">
              <span>📖 Botanical Search</span>
            </h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search forest volumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cream pl-10 pr-4 py-2 border border-walnut/10 rounded-md font-sans text-xs focus:outline-none focus:border-walnut/30 text-ink"
              />
              <Search className="w-4 h-4 text-ink/40 absolute left-3 top-2.5" />
            </div>
            <p className="text-[10px] text-ink/50 mt-2 font-serif italic">
              "Type a volume title to filter matching forest leaves."
            </p>
          </div>

          {/* Wooden Signboard Category Post */}
          <div className="relative pl-6 py-2">
            {/* Vertical Wood Pole */}
            <div className="absolute left-[10px] top-0 bottom-0 w-2.5 bg-gradient-to-r from-walnut/80 to-walnut rounded-full shadow-inner" />
            
            <h3 className="font-serif text-sm uppercase tracking-wider text-ink/60 mb-6 pl-4 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-walnut" />
              <span>Forest Signpost</span>
            </h3>

            <div className="space-y-4 relative">
              {categories.map((cat, idx) => {
                const isSelected = selectedCategory === cat;
                const areaNames: Record<string, string> = {
                  all: "🌿 The Entire Forest",
                  Kids: "🍄 Mushroom Garden",
                  Adventure: "🍃 Whispering Canopy",
                  Classics: "🌳 Ancient Roots",
                };
                
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    whileHover={{ x: 6 }}
                    className={`relative block w-full text-left px-5 py-3 rounded-r-md font-serif text-xs border-b-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-walnut text-cream border-stone-900 shadow-md translate-x-2"
                        : "bg-paper text-walnut border-walnut/10 hover:bg-sage/10"
                    }`}
                  >
                    {/* Small wood knot design */}
                    <div className="absolute left-2 top-4 w-1.5 h-1.5 rounded-full bg-walnut/20 border border-walnut/30" />
                    <span className="font-bold pl-2">{areaNames[cat] || cat}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Catalog Grid */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex justify-between items-end border-b border-walnut/10 pb-4">
            <div>
              <div className="text-[10px] font-display uppercase tracking-[0.2em] text-ink/50">
                Cozy Volumes
              </div>
              <h2 className="font-serif text-2xl font-bold text-ink">
                Small Library. Big Attention to Detail.
              </h2>
            </div>
            <Link 
              to="/collection" 
              className="text-xs font-serif text-ink/70 hover:text-ink link-underline"
            >
              All Volumes →
            </Link>
          </div>

          {filteredBooks.length === 0 ? (
            <EmptyState />
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10"
              >
                {filteredBooks.slice(0, 6).map((b, i) => (
                  <BookCard key={b.id} book={b} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-dashed border-walnut/20 rounded-2xl py-24 text-center bg-paper/40"
    >
      <BookOpen className="w-10 h-10 text-walnut/30 mx-auto mb-3" />
      <div className="font-serif text-xl text-ink font-semibold mb-2">Branch is empty</div>
      <p className="text-xs text-ink/60 max-w-xs mx-auto font-serif italic">
        "No knowledge fruits have grown in this corner of the forest yet. Try checking other categories or clear your search."
      </p>
    </motion.div>
  );
}

function Home() {
  return (
    <div className="space-y-6">
      <Hero />
      <WoodlandFeatures />
      <Suspense fallback={
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 text-center text-xs font-serif text-walnut/60 tracking-wider italic">
          Walking through the whispering forest...
        </div>
      }>
        <CollectionPreview />
      </Suspense>
    </div>
  );
}
