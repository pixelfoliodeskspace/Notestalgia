import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState, useEffect } from "react";
import { publishedBooksQuery } from "@/lib/books";
import { 
  ArrowRight, 
  Sparkles, 
  Search,
  BookOpen,
  Check,
  Star
} from "lucide-react";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedBooksQuery),
  component: Home,
});

// Floating particle drift animation component matching Fable
function ParticleDrift() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 12,
      size: 3 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full bg-foreground/20"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const { data: books } = useSuspenseQuery(publishedBooksQuery);
  const heroBook = books && books.length > 0 ? books[0] : null;

  return (
    <section className="relative pt-6">
      <div className="mx-auto mt-6 w-[min(96%,1200px)]">
        <div className="glass relative overflow-hidden rounded-[2.5rem] px-6 py-12 md:px-14 md:py-20">
          
          {/* Ambient Floating Blobs */}
          <div className="float-blob absolute -left-24 -top-24 h-72 w-72 rounded-full bg-mustard/20 opacity-50 blur-3xl" />
          <div 
            className="float-blob absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-dusty/15 opacity-60 blur-3xl"
            style={{ animationDelay: "3s" }}
          />

          {/* Active Particles Background */}
          <ParticleDrift />

          {/* Core Content Grid */}
          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div className="reveal space-y-6">
              
              <div className="text-xs tracking-[0.3em] text-muted-foreground uppercase flex items-center gap-1.5 font-display">
                Premium Digital Artifacts
                <Sparkles className="w-3.5 h-3.5 text-mustard animate-pulse" />
              </div>

              <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl text-ink font-bold">
                Read, Learn &amp;<br />CollectTimeless Guides
              </h1>
              
              <p className="max-w-md text-base text-muted-foreground md:text-lg font-serif italic">
                Acquire beautifully crafted digital summaries, AI notes, and children's book classics. Formatted for timeless study, and made to last.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#collection" className="btn-primary group flex items-center gap-2">
                  Explore Catalog
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#notebook" className="btn-ghost group flex items-center gap-2">
                  Try Virtual Notebook
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* Student Trust Panel */}
              <div className="mt-10 flex items-center gap-4 pt-4 border-t border-ink/5 max-w-sm">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="" className="h-9 w-9 rounded-full border-2 border-background object-cover"/>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="" className="h-9 w-9 rounded-full border-2 border-background object-cover"/>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="" className="h-9 w-9 rounded-full border-2 border-background object-cover"/>
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink font-display uppercase tracking-wider">500+ Active Readers</div>
                  <div className="flex items-center gap-0.5 text-mustard mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Panel: Hero book preview matching Fable image container */}
            <div className="relative flex justify-center">
              {heroBook ? (
                <div className="relative group max-w-[280px] sm:max-w-[320px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-ink/10">
                  <img 
                    src={heroBook.cover_image || ""} 
                    alt={heroBook.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-6 text-cream">
                    <span className="text-[10px] font-display uppercase tracking-widest bg-mustard text-ink px-2 py-0.5 rounded w-fit mb-2">
                      {heroBook.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold">{heroBook.title}</h3>
                    <p className="text-xs text-cream/70 line-clamp-1 mt-1 font-serif italic">"{heroBook.tagline}"</p>
                  </div>
                </div>
              ) : (
                <div className="w-[300px] h-[400px] rounded-3xl bg-paper border-2 border-dashed border-ink/20 flex flex-col items-center justify-center p-6 text-center shadow-inner">
                  <BookOpen className="w-12 h-12 text-ink/30 mb-3" />
                  <div className="font-serif text-sm font-semibold text-ink/80">No Books Seeded</div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Playable Virtual Notebook Simulator (Bansuri equivalent)
function NotebookSimulator() {
  const [paperStyle, setPaperStyle] = useState<"lined" | "grid" | "dotted" | "blank">("lined");
  const [activePageIndex, setActivePageIndex] = useState(0);

  // Content pages of summary guides
  const pagesContent = [
    {
      title: "The Secret Garden",
      tagline: "Chapter 1: A Locked Sanctuary",
      leftContent: "Mary Lennox discovers a rusted key buried in the soil. It matches the iron gate covered in wild ivy. A sense of magic spreads over the estate.",
      rightContent: [
        "Core Theme: Renewal & Healing",
        "Key Symbol: The Key (Opportunity)",
        "Key Symbol: Ivy (Hidden secrets)",
        "Blueprints: Mary, Colin, Dickon"
      ],
      color: "bg-sage/10 text-forest"
    },
    {
      title: "Alice in Wonderland",
      tagline: "Chapter 2: Down the Rabbit Hole",
      leftContent: "Tumbling down the endless rabbit hole, Alice passes bookshelves, maps, and floating jars. Logic bends, and nonsense begins to guide her path.",
      rightContent: [
        "Core Theme: Childhood Curiosity",
        "Key Symbol: Pocket Watch (Time anxiety)",
        "Key Symbol: Drink Me Bottle (Growth)",
        "Blueprints: Alice, White Rabbit, Hatter"
      ],
      color: "bg-mustard/15 text-ink"
    },
    {
      title: "Treasure Island",
      tagline: "Chapter 3: The Map's Secret",
      leftContent: "Jim Hawkins examines Captain Flint's parchment map. Three red crosses mark the spot of buried doubloons. The smell of salt water fills the air.",
      rightContent: [
        "Core Theme: Greed vs. Honor",
        "Key Symbol: Skeleton Island (Danger)",
        "Key Symbol: Spyglass (Perspective)",
        "Blueprints: Jim, Long John Silver, Flint"
      ],
      color: "bg-dusty/10 text-dusty"
    }
  ];

  const currentPage = pagesContent[activePageIndex];

  // Helper to draw paper background styles dynamically
  const renderPaperBackground = () => {
    switch (paperStyle) {
      case "lined":
        return {
          backgroundImage: "repeating-linear-gradient(rgba(0,0,0,0) 0px, rgba(0,0,0,0) 23px, rgba(64,64,64,0.06) 24px)",
          backgroundSize: "100% 24px",
        };
      case "grid":
        return {
          backgroundImage: "linear-gradient(rgba(64,64,64,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(64,64,64,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        };
      case "dotted":
        return {
          backgroundImage: "radial-gradient(rgba(64,64,64,0.15) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        };
      case "blank":
      default:
        return {};
    }
  };

  return (
    <section id="notebook" className="mx-auto mt-12 w-[min(96%,1200px)]">
      <div className="glass rounded-[2.25rem] p-8 text-center relative overflow-hidden border border-white/5 shadow-2xl">
        
        {/* Section Header */}
        <div className="mb-6">
          <div className="text-xs tracking-[0.3em] text-muted-foreground uppercase flex justify-center items-center gap-1.5 font-display">
            Interactive Experience
            <Sparkles className="w-3.5 h-3.5 text-mustard animate-pulse" />
          </div>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl text-ink font-bold">Try the Journal.</h2>
          <p className="mt-4 text-xs md:text-sm text-muted-foreground max-w-xl mx-auto">
            Experience our premium paper layouts. Select your paper type below, or flip the pages to preview summaries of our classic volumes.
          </p>
        </div>

        {/* Paper Style Selector Toggles */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-xl mx-auto select-none">
          {(["lined", "grid", "dotted", "blank"] as const).map((style) => (
            <button
              key={style}
              onClick={() => setPaperStyle(style)}
              className={`px-4 py-2 rounded-2xl border text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                paperStyle === style
                  ? "bg-ink text-cream border-ink shadow-sm"
                  : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
            >
              {style} Paper
            </button>
          ))}
        </div>

        {/* Playable Book Binder Simulator (Double-Page Mockup) */}
        <div className="mt-10 overflow-x-auto py-6 flex justify-center scrollbar-thin select-none">
          <div className="relative w-[700px] h-[340px] shrink-0 select-none bg-paper border border-walnut/10 rounded-2xl shadow-xl p-6 flex flex-col justify-between" style={renderPaperBackground()}>
            
            {/* Book Spine Center Line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-walnut/15 shadow-inner" />

            {/* Left and Right Page Contents */}
            <div className="grid grid-cols-2 gap-12 h-full text-left pl-6 pr-6">
              
              {/* Left Page (Descriptive Text & Illustration Mockup) */}
              <div className="space-y-4 flex flex-col justify-center border-r border-walnut/5 pr-6 h-full">
                <div className="space-y-1">
                  <span className="text-[10px] font-display uppercase tracking-widest bg-ink/5 px-2 py-0.5 rounded text-ink/60">
                    {currentPage.title}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-ink leading-tight">
                    {currentPage.tagline}
                  </h4>
                </div>
                <p className="text-xs text-ink/75 leading-relaxed font-serif italic select-text">
                  "{currentPage.leftContent}"
                </p>
                <div className="text-[9px] font-mono text-ink/40">Page {activePageIndex * 2 + 1}</div>
              </div>

              {/* Right Page (Bullet blue-prints summary) */}
              <div className="space-y-4 flex flex-col justify-center pl-6 h-full">
                <h4 className="font-serif text-xs uppercase tracking-wider text-ink/50">
                  AI Study Blueprint
                </h4>
                <ul className="space-y-2">
                  {currentPage.rightContent.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-ink/80 font-sans">
                      <Check className="w-3.5 h-3.5 text-mustard stroke-[3]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-[9px] font-mono text-ink/40 text-right">Page {activePageIndex * 2 + 2}</div>
              </div>

            </div>

          </div>
        </div>

        {/* Page Switcher controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setActivePageIndex((prev) => (prev - 1 + pagesContent.length) % pagesContent.length)}
            className="px-4 py-2 rounded-xl border border-ink/15 text-xs font-serif text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer"
          >
            ◀ Turn Back
          </button>
          <span className="font-mono text-xs text-ink/60">
            Guide {activePageIndex + 1} of {pagesContent.length}
          </span>
          <button
            onClick={() => setActivePageIndex((prev) => (prev + 1) % pagesContent.length)}
            className="px-4 py-2 rounded-xl border border-ink/15 text-xs font-serif text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer"
          >
            Next Page ▶
          </button>
        </div>

      </div>
    </section>
  );
}

// 4-Column stats grid matching Fable
function StatsBar() {
  const stats = [
    { value: "500+", label: "Happy Readers" },
    { value: "6+", label: "Seeded Volumes" },
    { value: "1000+", label: "Summaries & Notes" },
    { value: "5★", label: "Average Review" }
  ];

  return (
    <section className="mx-auto mt-8 w-[min(96%,1200px)]">
      <div className="glass grid grid-cols-2 divide-foreground/10 rounded-[2rem] p-6 md:grid-cols-4 md:divide-x md:p-8">
        {stats.map((s, idx) => (
          <div key={idx} className="px-4 py-4 text-center">
            <div className="font-serif text-4xl md:text-5xl text-ink font-bold">{s.value}</div>
            <div className="mt-2 text-xs tracking-wider text-muted-foreground uppercase font-display">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Features Section matching Fable
function FeatureCards() {
  const cards = [
    {
      title: "One-to-One Notes",
      desc: "Each guide is hand-bound with personal margin summaries to ensure faster comprehension.",
      icon: "📖"
    },
    {
      title: "AI Blueprints",
      desc: "Get instant character blueprints, map indexes, and thematic logs for active reference.",
      icon: "✨"
    },
    {
      title: "Curated Catalog",
      desc: "Only the most timeless and beloved children's classics, structured for modern learning.",
      icon: "🌿"
    },
    {
      title: "Community Access",
      desc: "Join a growing circle of digital collectors, students, and readers worldwide.",
      icon: "👥"
    }
  ];

  return (
    <section className="mx-auto mt-8 w-[min(96%,1200px)]">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {cards.map((c, idx) => (
          <div key={idx} className="glass group rounded-3xl p-6 text-center transition-all duration-500 hover:-translate-y-1">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-white/50 border border-ink/5 text-2xl select-none">
              {c.icon}
            </div>
            <div className="mt-4 font-serif text-lg font-bold text-ink leading-snug">{c.title}</div>
            <p className="mt-2 text-xs text-muted-foreground md:text-sm font-sans">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Redesigned Catalog grid matching Fable's course layout
function CollectionPreview() {
  const { data: books } = useSuspenseQuery(publishedBooksQuery);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter((b) => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.category && b.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="collection" className="mx-auto mt-12 w-[min(96%,1200px)]">
      <div className="glass rounded-[2.5rem] p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_2.5fr]">
          
          {/* Left panel: Info & search box */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-serif text-3xl md:text-4xl text-ink font-bold">
              Popular Volumes
              <Sparkles className="w-5 h-5 text-mustard" />
            </div>
            <p className="text-sm text-muted-foreground font-serif italic">
              Begin your study journey with our most popular formatted guides.
            </p>

            {/* Botanical Search Box */}
            <div className="relative pt-2">
              <input 
                type="text" 
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cream pl-10 pr-4 py-2.5 border border-ink/10 rounded-full font-sans text-xs focus:outline-none focus:border-ink/20 text-ink shadow-sm"
              />
              <Search className="w-4 h-4 text-ink/40 absolute left-3.5 top-[18px]" />
            </div>
          </div>

          {/* Right panel: Course Cards matching Fable's Course layout */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.length === 0 ? (
              <div className="sm:col-span-2 lg:col-span-3 text-center py-12 text-xs font-serif text-ink/40 italic">
                No matching volumes found in the library.
              </div>
            ) : (
              filteredBooks.map((book) => {
                const discount = book.original_price && book.original_price > book.current_price
                  ? Math.round(((book.original_price - book.current_price) / book.original_price) * 100)
                  : null;

                return (
                  <article key={book.id} className="group glass-soft overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between">
                    <div>
                      {/* Image Thumbnail */}
                      <div className="aspect-[4/3] overflow-hidden relative border-b border-ink/5 bg-paper">
                        <img 
                          src={book.cover_image || ""} 
                          alt={book.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
                        />
                        {discount && (
                          <span className="absolute top-3 left-3 bg-berry text-cream text-[9px] font-display tracking-wider uppercase px-2 py-0.5 rounded-full">
                            -{discount}%
                          </span>
                        )}
                      </div>

                      {/* Content details */}
                      <div className="p-4 space-y-2">
                        <span className="text-[9px] font-display uppercase tracking-widest bg-ink/5 px-2 py-0.5 rounded text-ink/60 w-fit block">
                          {book.category}
                        </span>
                        <h3 className="font-serif text-lg leading-tight font-bold text-ink truncate">
                          {book.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 h-8 font-serif italic">
                          {book.tagline || book.description}
                        </p>
                        
                        {/* Specs bullet list matching Fable */}
                        <ul className="mt-3 space-y-1 pt-2 border-t border-ink/5">
                          <li className="flex items-center gap-2 text-[10px] text-foreground/75 font-sans">
                            <Check className="w-3.5 h-3.5 text-mustard stroke-[3]" />
                            <span>Pages: {book.pages || 48}</span>
                          </li>
                          <li className="flex items-center gap-2 text-[10px] text-foreground/75 font-sans">
                            <Check className="w-3.5 h-3.5 text-mustard stroke-[3]" />
                            <span>Language: {book.language || "English"}</span>
                          </li>
                          <li className="flex items-center gap-2 text-[10px] text-foreground/75 font-sans">
                            <Check className="w-3.5 h-3.5 text-mustard stroke-[3]" />
                            <span>Includes AI Blueprints</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Pricing & Footer Actions */}
                    <div className="p-4 pt-0 border-t border-ink/5 mt-auto">
                      <div className="flex items-center justify-between py-2.5">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-display">Format: PDF</span>
                        <div className="text-right">
                          <span className="font-display font-bold text-ink">₹{Number(book.current_price).toFixed(0)}</span>
                          {book.original_price && book.original_price > book.current_price && (
                            <span className="text-[10px] text-muted-foreground line-through ml-1.5">₹{Number(book.original_price).toFixed(0)}</span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <a 
                          href={book.superprofile_url || "https://superprofile.bio/in"} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn-primary !px-2 !py-2 text-[10px] text-center w-full shadow-sm"
                        >
                          Harvest
                        </a>
                        <Link 
                          to="/book/$slug" 
                          params={{ slug: book.slug }} 
                          className="btn-ghost !px-2 !py-2 text-[10px] text-center w-full"
                        >
                          Explore
                        </Link>
                      </div>
                    </div>

                  </article>
                );
              })
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

// Curator Info Section matching Fable
function CuratorShowcase() {
  return (
    <section id="about" className="mx-auto mt-8 w-[min(96%,1200px)]">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass overflow-hidden rounded-[2rem] p-2">
          <div className="relative overflow-hidden rounded-[1.6rem]">
            <img 
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600" 
              alt="Notestalgia Curator Desk" 
              loading="lazy" 
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
        <div className="glass flex flex-col justify-center rounded-[2rem] p-8 md:p-12 space-y-4">
          <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase flex items-center gap-1 font-display">
            About the Library
            <Sparkles className="w-3 h-3 text-mustard" />
          </div>
          <h2 className="font-serif text-3xl leading-tight md:text-5xl text-ink font-bold">
            Read, study &amp; reflect deeply.
          </h2>
          <p className="text-sm text-muted-foreground font-serif italic">
            "At Notestalgia, we believe in restoring the magic of study. Our AI blueprints and children's book collection are designed to help students read deeply — not just pass tests — making high-quality notes universally accessible."
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            <a 
              href="https://wa.me/919645767284?text=I%27d%20like%20to%20learn%20more%20about%20Notestalgia%20guides" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-primary flex items-center gap-1.5"
            >
              Meet the Curator
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/collection" className="btn-ghost">
              Read Our Blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Student results / Review Quotes matching Fable
function Testimonials() {
  const reviews = [
    {
      quote: "The formatted layout and AI Blueprints are incredibly detailed. I finished and understood the whole book in a single evening.",
      author: "Anjali S.",
      role: "Student"
    },
    {
      quote: "These notes have restored my child's love for reading. The summaries are beautiful and so easy to follow.",
      author: "Ravi K.",
      role: "Parent"
    }
  ];

  return (
    <section className="mx-auto mt-12 w-[min(96%,1200px)] pb-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-serif text-3xl md:text-5xl text-ink font-bold">Reader Results</h2>
        <a 
          href="https://wa.me/919645767284?text=I%27d%20like%20to%20know%20more%20about%20Notestalgia" 
          target="_blank" 
          rel="noreferrer" 
          className="btn-ghost hidden md:inline-flex items-center gap-1.5"
        >
          Start Your Journey
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((r, idx) => (
          <figure key={idx} className="glass rounded-[2rem] p-8 shadow-sm">
            <div className="text-4xl font-serif leading-none text-foreground/20">“</div>
            <blockquote className="mt-2 font-serif text-lg leading-snug md:text-xl text-ink italic">
              {r.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-paper flex items-center justify-center border border-ink/10 font-serif font-bold text-ink">
                {r.author.slice(0, 1)}
              </div>
              <div>
                <div className="text-sm font-medium text-ink">{r.author}</div>
                <div className="text-xs text-muted-foreground font-serif">{r.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="space-y-6 pb-12">
      <Hero />
      <NotebookSimulator />
      <FeatureCards />
      <StatsBar />
      <CuratorShowcase />
      <CollectionPreview />
      <Testimonials />
    </div>
  );
}
