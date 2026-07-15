import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState, useEffect } from "react";
import { publishedBooksQuery } from "@/lib/books";
import { ArrowRight, Sparkles, Search, BookOpen, Check, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedBooksQuery),
  component: Home,
});

const TITLE = "NOTEStalgia";

function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 min-h-[70vh] flex flex-col justify-center">
      <div className="relative mx-auto max-w-4xl px-6 md:px-10 z-20 w-full text-center flex flex-col items-center justify-center space-y-8">
        {/* Brand Logo and Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3 flex flex-col items-center"
        >
          <div className="font-serif text-3xl font-bold tracking-tight text-foreground">
            <span className="text-brand-note">NOTE</span>
            <span className="text-dusty">stalgia</span>
            <span className="text-brand-note font-sans font-bold text-base ml-[1px]">.</span>
          </div>
        </motion.div>

        {/* Cinematic Headline */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4rem] leading-[1.1] tracking-[-0.02em] text-foreground">
            Where Every Book <br />
            Leaves a <span className="text-primary italic">Memory</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-foreground/80 leading-relaxed font-serif italic">
            Acquire beautifully formatted volumes, handwritten study journals, and AI
            character blueprints. Classic physical reading meets modern digital notes.
          </p>
        </div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <a href="#collection" className="btn-primary group flex items-center gap-2">
            <span>Explore Bookstore</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#notebook" className="btn-ghost group flex items-center gap-2">
            <span>Try the Journal</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Happy Reader trust panel */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-border/40 w-full max-w-md justify-center">
          <div className="flex -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
              alt=""
              className="h-9 w-9 rounded-full border-2 border-background object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
              alt=""
              className="h-9 w-9 rounded-full border-2 border-background object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
              alt=""
              className="h-9 w-9 rounded-full border-2 border-background object-cover"
            />
          </div>
          <div className="text-left sm:text-left text-center">
            <div className="text-[10px] font-semibold text-foreground font-display uppercase tracking-wider">
              500+ Readers Enrolled
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-0.5 text-primary mt-0.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
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

  const pagesContent = [
    {
      title: "The Secret Garden",
      tagline: "Chapter 1: A Locked Sanctuary",
      leftContent:
        "Mary Lennox discovers a rusted key buried in the soil. It matches the iron gate covered in wild ivy. A sense of magic spreads over the estate.",
      rightContent: [
        "Core Theme: Renewal & Healing",
        "Key Symbol: The Key (Opportunity)",
        "Key Symbol: Ivy (Hidden secrets)",
        "Blueprints: Mary, Colin, Dickon",
      ],
      color: "bg-sage/10 text-forest",
    },
    {
      title: "Alice in Wonderland",
      tagline: "Chapter 2: Down the Rabbit Hole",
      leftContent:
        "Tumbling down the endless rabbit hole, Alice passes bookshelves, maps, and floating jars. Logic bends, and nonsense begins to guide her path.",
      rightContent: [
        "Core Theme: Childhood Curiosity",
        "Key Symbol: Pocket Watch (Time anxiety)",
        "Key Symbol: Drink Me Bottle (Growth)",
        "Blueprints: Alice, White Rabbit, Hatter",
      ],
      color: "bg-primary/15 text-foreground",
    },
    {
      title: "Treasure Island",
      tagline: "Chapter 3: The Map's Secret",
      leftContent:
        "Jim Hawkins examines Captain Flint's parchment map. Three red crosses mark the spot of buried doubloons. The smell of salt water fills the air.",
      rightContent: [
        "Core Theme: Greed vs. Honor",
        "Key Symbol: Skeleton Island (Danger)",
        "Key Symbol: Spyglass (Perspective)",
        "Blueprints: Jim, Long John Silver, Flint",
      ],
      color: "bg-dusty/10 text-dusty",
    },
  ];

  const currentPage = pagesContent[activePageIndex];

  const renderPaperBackground = () => {
    switch (paperStyle) {
      case "lined":
        return {
          backgroundImage:
            "repeating-linear-gradient(rgba(0,0,0,0) 0px, rgba(0,0,0,0) 23px, rgba(255,255,255,0.06) 24px)",
          backgroundSize: "100% 24px",
        };
      case "grid":
        return {
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        };
      case "dotted":
        return {
          backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
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
        <div className="mb-6">
          <div className="text-xs tracking-[0.3em] text-foreground/80 uppercase flex justify-center items-center gap-1.5 font-display">
            Interactive Experience
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          </div>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl text-foreground font-bold">
            Try the Journal.
          </h2>
          <p className="mt-4 text-xs md:text-sm text-foreground/80 max-w-xl mx-auto">
            Experience our premium paper layouts. Select your paper type below, or flip the pages to
            preview summaries of our classic volumes.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-xl mx-auto select-none">
          {(["lined", "grid", "dotted", "blank"] as const).map((style) => (
            <button
              key={style}
              onClick={() => setPaperStyle(style)}
              className={`px-4 py-2 rounded-2xl border text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                paperStyle === style
                  ? "bg-foreground text-background border-foreground shadow-sm"
                  : "bg-secondary/40 border-border/40 text-foreground/80 hover:bg-secondary hover:text-foreground"
              }`}
            >
              {style} Paper
            </button>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto py-6 flex justify-center scrollbar-thin select-none">
          <div
            className="relative w-[700px] h-[340px] shrink-0 select-none bg-white border border-border/40 rounded-2xl shadow-xl p-6 flex flex-col justify-between"
            style={renderPaperBackground()}
          >
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-border/40 shadow-inner" />

            <div className="grid grid-cols-2 gap-12 h-full text-left pl-6 pr-6">
              <div className="space-y-4 flex flex-col justify-center border-r border-border/40 pr-6 h-full">
                <div className="space-y-1">
                  <span className="text-[10px] font-display uppercase tracking-widest bg-secondary px-2 py-0.5 rounded text-foreground/60">
                    {currentPage.title}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-foreground leading-tight">
                    {currentPage.tagline}
                  </h4>
                </div>
                <p className="text-xs text-foreground/85 leading-relaxed font-serif italic select-text">
                  "{currentPage.leftContent}"
                </p>
                <div className="text-[9px] font-mono text-foreground/60">
                  Page {activePageIndex * 2 + 1}
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-center pl-6 h-full">
                <h4 className="font-serif text-xs uppercase tracking-wider text-foreground/60">
                  AI Study Blueprint
                </h4>
                <ul className="space-y-2">
                  {currentPage.rightContent.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs text-foreground/85 font-sans"
                    >
                      <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-[9px] font-mono text-foreground/60 text-right">
                  Page {activePageIndex * 2 + 2}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() =>
              setActivePageIndex((prev) => (prev - 1 + pagesContent.length) % pagesContent.length)
            }
            className="px-4 py-2 rounded-xl border border-border/40 text-xs font-serif text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
          >
            ◀ Turn Back
          </button>
          <span className="font-mono text-xs text-foreground/60">
            Guide {activePageIndex + 1} of {pagesContent.length}
          </span>
          <button
            onClick={() => setActivePageIndex((prev) => (prev + 1) % pagesContent.length)}
            className="px-4 py-2 rounded-xl border border-border/40 text-xs font-serif text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
          >
            Next Page ▶
          </button>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "500+", label: "Happy Readers" },
    { value: "6+", label: "Seeded Volumes" },
    { value: "1000+", label: "Summaries & Notes" },
    { value: "5★", label: "Average Review" },
  ];

  return (
    <section className="mx-auto mt-8 w-[min(96%,1200px)]">
      <div className="glass grid grid-cols-2 divide-foreground/10 rounded-[2rem] p-6 md:grid-cols-4 md:divide-x md:p-8">
        {stats.map((s, idx) => (
          <div key={idx} className="px-4 py-4 text-center">
            <div className="font-serif text-4xl md:text-5xl text-foreground font-bold">
              {s.value}
            </div>
            <div className="mt-2 text-xs tracking-wider text-muted-foreground uppercase font-display">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureCards() {
  const cards = [
    {
      title: "One-to-One Notes",
      desc: "Each guide is hand-bound with personal margin summaries to ensure faster comprehension.",
      icon: "📖",
    },
    {
      title: "AI Blueprints",
      desc: "Get instant character blueprints, map indexes, and thematic logs for active reference.",
      icon: "✨",
    },
    {
      title: "Curated Catalog",
      desc: "Only the most timeless and beloved children's classics, structured for modern learning.",
      icon: "🌿",
    },
    {
      title: "Community Access",
      desc: "Join a growing circle of digital collectors, students, and readers worldwide.",
      icon: "👥",
    },
  ];

  return (
    <section className="mx-auto mt-8 w-[min(96%,1200px)]">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="glass group rounded-3xl p-6 text-center transition-all duration-500 hover:-translate-y-1"
          >
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-white/50 border border-border/40 text-2xl select-none">
              {c.icon}
            </div>
            <div className="mt-4 font-serif text-lg font-bold text-foreground leading-snug">
              {c.title}
            </div>
            <p className="mt-2 text-xs text-muted-foreground md:text-sm font-sans">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CollectionPreview() {
  const { data: books } = useSuspenseQuery(publishedBooksQuery);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.category && b.category.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <section id="collection" className="mx-auto mt-8 w-[min(96%,1200px)]">
      <div className="flex flex-col items-center text-center space-y-4 mb-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-display uppercase tracking-widest font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Popular Volumes</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-foreground font-bold tracking-tight">
          Explore Our Collection
        </h2>
        <p className="text-sm text-muted-foreground font-serif italic">
          Begin your study journey with our popular formatted guides.
        </p>

        <div className="relative w-full max-w-md pt-2">
          <input
            type="text"
            placeholder="Search collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 pl-10 pr-4 py-2.5 border border-border/40 rounded-full font-sans text-xs focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 text-foreground shadow-sm transition-all placeholder:text-foreground/40"
          />
          <Search className="w-4 h-4 text-foreground/60 absolute left-3.5 top-[18px]" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredBooks.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-4 text-center py-16 text-xs font-serif text-foreground/60 italic">
            No matching volumes found in the library.
          </div>
        ) : (
          filteredBooks.map((book) => {
            const discount =
              book.original_price && book.original_price > book.current_price
                ? Math.round(
                    ((book.original_price - book.current_price) / book.original_price) * 100,
                  )
                : null;

            return (
              <article
                key={book.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/40 bg-card p-4 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_-15px_rgba(59,17,62,0.3)] hover:border-primary/30 text-left"
              >
                <div className="space-y-4">
                  {/* Book cover img */}
                  <div className="aspect-[4/3] overflow-hidden relative rounded-2xl bg-secondary/40 border border-border/20">
                    <img
                      src={book.cover_image || ""}
                      alt={book.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {discount && (
                      <span className="absolute top-2.5 left-2.5 bg-berry text-cream text-[9px] font-display tracking-wider uppercase px-2 py-0.5 rounded-full font-semibold">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* Title & info */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-display uppercase tracking-widest text-primary font-semibold">
                        {book.category}
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase font-mono">
                        PDF
                      </span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 h-8 font-serif italic leading-relaxed">
                      {book.tagline || book.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground font-display uppercase tracking-wider">
                      Price
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      {book.original_price && book.original_price > book.current_price && (
                        <span className="text-[10px] text-muted-foreground line-through">
                          ₹{Number(book.original_price).toFixed(0)}
                        </span>
                      )}
                      <span className="font-display font-bold text-sm text-foreground">
                        ₹{Number(book.current_price).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={book.superprofile_url || "https://superprofile.bio/in"}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary !px-2 !py-2 text-[10px] text-center w-full shadow-sm rounded-xl font-semibold"
                    >
                      Buy Now
                    </a>
                    <Link
                      to="/book/$slug"
                      params={{ slug: book.slug }}
                      className="btn-ghost !px-2 !py-2 text-[10px] text-center w-full rounded-xl"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      quote:
        "The AI blueprints bring the characters to life. It transformed my notes from static pages to interactive dialogues.",
      author: "Anjali S.",
      role: "Student",
    },
    {
      quote:
        "These notes have restored my child's love for reading. The summaries are beautiful and so easy to follow.",
      author: "Ravi K.",
      role: "Parent",
    },
  ];

  return (
    <section className="mx-auto mt-12 w-[min(96%,1200px)] pb-12">
      <div className="mb-8 flex items-end justify-between gap-4 text-left">
        <h2 className="font-serif text-3xl md:text-5xl text-foreground font-bold">
          Reader Results
        </h2>
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
          <figure key={idx} className="glass rounded-[2rem] p-8 shadow-sm text-left">
            <div className="text-4xl font-serif leading-none text-foreground/20">“</div>
            <blockquote className="mt-2 font-serif text-lg leading-snug md:text-xl text-foreground italic">
              {r.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center border border-border/40 font-serif font-bold text-foreground">
                {r.author.slice(0, 1)}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{r.author}</div>
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
    <div className="space-y-16 pb-12">
      <Hero />
      <CollectionPreview />
      <NotebookSimulator />
      <FeatureCards />
      <StatsBar />
      <Testimonials />
    </div>
  );
}
