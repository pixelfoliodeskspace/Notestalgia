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

interface Particle {
  id: number;
  type: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  xOffsets: number[];
}

// Emitter for cinematic floating items (leaves, butterflies, golden particles, manuscript pages)
function CinematicParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate static list of particles that drift at different intervals
    const list = Array.from({ length: 24 }).map((_, i) => {
      const types = ["leaf", "butterfly", "gold", "manuscript"];
      const type = types[i % types.length];

      return {
        id: i,
        type,
        left: 35 + Math.random() * 30, // Emit primarily from the center book area
        delay: Math.random() * 12,
        duration: 8 + Math.random() * 8,
        size: type === "gold" ? 3 + Math.random() * 3 : 12 + Math.random() * 10,
        xOffsets: [0, 40, -40, 20, 0],
      };
    });
    setParticles(list);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-25" aria-hidden="true">
      {particles.map((p) => {
        let element = null;

        if (p.type === "gold") {
          element = (
            <span
              className="block rounded-full bg-primary"
              style={{
                width: p.size,
                height: p.size,
                boxShadow: "0 0 10px #F2C14E, 0 0 20px #F2C14E",
              }}
            />
          );
        } else if (p.type === "butterfly") {
          element = (
            <motion.svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-primary/75 w-full h-full"
              animate={{
                scaleX: [1, -0.2, 1], // flapping wing effect
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Butterfly shape */}
              <path d="M12 10C9 4 4 4 4 8c0 4 5 7 8 2 3 5 8 2 8-2 0-4-5-4-8 2z" />
            </motion.svg>
          );
        } else if (p.type === "leaf") {
          element = (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-forest opacity-80 w-full h-full"
            >
              {/* Maple/autumn leaf shape */}
              <path d="M12 2s1.5 4 2 5c2-1 4-1 5 1s-3 3-3 4c2 0 4 1 3 3s-4 1-5 0c0 2-1 4-2 5-1-1-2-3-2-5-1 1-4 2-5 0s1-3 3-3c0-1-5-2-3-4s3-2 5-1c.5-1 2-5 2-5z" />
            </svg>
          );
        } else {
          // manuscript page
          element = (
            <div className="bg-paper/85 border border-border/40 w-5 h-7 rounded-[2px] shadow-sm flex flex-col justify-between p-1">
              <div className="w-full h-[1.5px] bg-foreground/30" />
              <div className="w-3/4 h-[1.5px] bg-foreground/20" />
              <div className="w-5/6 h-[1.5px] bg-foreground/20" />
            </div>
          );
        }

        return (
          <motion.div
            key={p.id}
            className="absolute bottom-16"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              filter: p.type === "gold" ? "blur(0.5px)" : "none",
            }}
            initial={{ y: 220, x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: -500, // drift upward toward the brand logo
              x: p.xOffsets,
              rotate: [0, 45, -45, 90, 180],
              opacity: [0, 0.9, 0.9, 0.4, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            {element}
          </motion.div>
        );
      })}
    </div>
  );
}

// 3D Animated Book resting on a mossy stone
function CinematicBook3D() {
  return (
    <div className="relative w-full max-w-[450px] aspect-[4/5] flex items-center justify-center">
      {/* Morning Sunlight Filtering Rays */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-primary/15 via-primary/5 to-transparent filter blur-3xl pointer-events-none animate-pulse duration-10000" />

      {/* Soft Fog/Mist Layers */}
      <motion.div
        className="absolute bottom-12 left-0 right-0 h-16 bg-gradient-to-r from-transparent via-foreground/5 to-transparent filter blur-xl pointer-events-none z-10"
        animate={{
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* The 3D Book Layout Container */}
      <div className="relative w-72 h-80 flex items-center justify-center [perspective:1000px]">
        {/* Mossy Stone Base SVG */}
        <div className="absolute bottom-0 w-80 h-32 z-0">
          <svg
            viewBox="0 0 200 80"
            className="w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
          >
            {/* Rock shape */}
            <path d="M10 70 Q 30 15 100 20 Q 170 15 190 70 Z" fill="oklch(22% .04 140)" />
            {/* Moss details overlay */}
            <path
              d="M30 40 C 60 20 80 15 110 25 C 140 18 160 30 175 45 C 150 48 130 40 100 45 C 70 42 50 48 30 40 Z"
              fill="oklch(45% .1 145)"
            />
            {/* Stone textures */}
            <path d="M15 68 L 185 68" stroke="oklch(15% .03 140)" strokeWidth="1.5" />
            <path d="M70 24 L 90 28" stroke="oklch(15% .03 140)" strokeWidth="1" />
          </svg>
        </div>

        {/* 3D Angled Leather-Bound Book Wrapper */}
        <motion.div
          className="relative w-52 h-64 [transform-style:preserve-3d] cursor-pointer z-10"
          style={{
            transformOrigin: "center bottom",
          }}
          animate={{
            rotateY: -15,
            rotateX: 18,
            y: [-3, 3, -3],
          }}
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {/* Back Cover (Leather) */}
          <div className="absolute inset-0 rounded-lg bg-stone-900 border-2 border-stone-800 shadow-2xl [transform:translateZ(-10px)]" />

          {/* Book Spine (Warm Wood/Leather) */}
          <div className="absolute top-0 bottom-0 -left-2 w-4 bg-stone-950 border-r border-stone-800 [transform:rotateY(-90deg) translateZ(8px)]" />

          {/* Opening Pages Flipping loop */}
          <div className="absolute inset-0 bg-stone-800 rounded-lg overflow-hidden border border-stone-700 [transform:translateZ(-5px)]" />

          {/* Main Open Pages */}
          <div className="absolute inset-1 bg-paper/95 rounded shadow-inner flex [transform:translateZ(0px)] border border-border/40">
            {/* Left Page (Lined Paper) */}
            <div
              className="flex-1 border-r border-stone-300 p-3 space-y-2 relative"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(rgba(0,0,0,0) 0px, rgba(0,0,0,0) 11px, rgba(0,0,0,0.06) 12px)",
                backgroundSize: "100% 12px",
              }}
            >
              <div className="w-1/2 h-2 bg-stone-400 rounded-full" />
              <div className="w-5/6 h-1.5 bg-stone-300 rounded-full" />
              <div className="w-full h-1.5 bg-stone-300 rounded-full" />
              <div className="w-4/5 h-1.5 bg-stone-300 rounded-full" />
            </div>

            {/* Right Page (Turning / Active notes) */}
            <div
              className="flex-1 p-3 space-y-2 relative"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(rgba(0,0,0,0) 0px, rgba(0,0,0,0) 11px, rgba(0,0,0,0.06) 12px)",
                backgroundSize: "100% 12px",
              }}
            >
              <div className="w-1/3 h-2 bg-primary rounded-full" />
              <div className="w-full h-1.5 bg-stone-300 rounded-full" />
              <div className="w-full h-1.5 bg-stone-300 rounded-full" />
              <div className="w-3/4 h-1.5 bg-stone-300 rounded-full" />

              {/* Little illuminated gold star icon on the page */}
              <Sparkles className="w-3.5 h-3.5 text-primary absolute bottom-3 right-3 animate-pulse" />
            </div>
          </div>

          {/* Animated Page Flipping Layer overlay */}
          <motion.div
            className="absolute inset-1 bg-paper/90 origin-left border-l border-stone-300"
            style={{
              width: "50%",
              left: "50%",
              backfaceVisibility: "hidden",
            }}
            animate={{
              rotateY: [0, -180, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 min-h-[90vh] flex flex-col justify-center">
      {/* Custom Drifting Emitters */}
      <CinematicParticles />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 z-20 w-full">
        {/* Split screen layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Info & Signpost */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Brand Logo and Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <div className="font-serif text-3xl font-bold tracking-tight text-foreground">
                <span className="text-mustard">NOTE</span>
                <span className="text-dusty">stalgia</span>
                <span className="text-mustard font-sans font-bold text-base ml-[1px]">.</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-forest/20 bg-white/5 backdrop-blur-sm text-[10px] font-display uppercase tracking-widest text-primary font-semibold">
                <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                <span>Nostalgia Meets Modern Learning</span>
              </div>
            </motion.div>

            {/* Cinematic Headline */}
            <div className="space-y-4">
              <h1 className="font-serif text-5xl sm:text-[4vw] lg:text-[4.5rem] leading-[1.05] tracking-[-0.02em] text-foreground font-bold">
                Where Books, Notes <br />
                and <span className="text-primary italic">Memories</span> Come Together
              </h1>

              <p className="max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed font-serif italic">
                Step into an enchanted sanctuary where classic physical reading meets modern digital
                notes. Acquire beautifully formatted volumes, handwritten study journals, and AI
                character blueprints.
              </p>
            </div>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap items-center gap-4 pt-2"
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
            <div className="mt-8 flex items-center gap-4 pt-4 border-t border-white/5 max-w-sm">
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
              <div>
                <div className="text-xs font-semibold text-foreground font-display uppercase tracking-wider">
                  500+ Readers Enrolled
                </div>
                <div className="flex items-center gap-0.5 text-primary mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic 3D Book resting on Mossy Rock */}
          <div className="lg:col-span-5 flex items-center justify-center min-h-[440px] relative">
            <CinematicBook3D />
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
                  : "bg-white/5 border-white/5 text-foreground/80 hover:bg-white/10 hover:text-foreground"
              }`}
            >
              {style} Paper
            </button>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto py-6 flex justify-center scrollbar-thin select-none">
          <div
            className="relative w-[700px] h-[340px] shrink-0 select-none bg-white/5 border border-border/40 rounded-2xl shadow-xl p-6 flex flex-col justify-between"
            style={renderPaperBackground()}
          >
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-border/40 shadow-inner" />

            <div className="grid grid-cols-2 gap-12 h-full text-left pl-6 pr-6">
              <div className="space-y-4 flex flex-col justify-center border-r border-border/40 pr-6 h-full">
                <div className="space-y-1">
                  <span className="text-[10px] font-display uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded text-foreground/60">
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
    <section id="collection" className="mx-auto mt-12 w-[min(96%,1200px)]">
      <div className="glass rounded-[2.5rem] p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_2.5fr]">
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-2 font-serif text-3xl md:text-4xl text-foreground font-bold">
              Popular Volumes
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground font-serif italic">
              Begin your study journey with our most popular formatted guides.
            </p>

            <div className="relative pt-2">
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 pl-10 pr-4 py-2.5 border border-border/40 rounded-full font-sans text-xs focus:outline-none focus:border-border/40 text-foreground shadow-sm"
              />
              <Search className="w-4 h-4 text-foreground/60 absolute left-3.5 top-[18px]" />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.length === 0 ? (
              <div className="sm:col-span-2 lg:col-span-3 text-center py-12 text-xs font-serif text-foreground/60 italic">
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
                    className="group glass-soft overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between text-left"
                  >
                    <div>
                      <div className="aspect-[4/3] overflow-hidden relative border-b border-border/40 bg-white/5">
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

                      <div className="p-4 space-y-2">
                        <span className="text-[9px] font-display uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded text-foreground/60 w-fit block">
                          {book.category}
                        </span>
                        <h3 className="font-serif text-lg leading-tight font-bold text-foreground truncate">
                          {book.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 h-8 font-serif italic">
                          {book.tagline || book.description}
                        </p>

                        <ul className="mt-3 space-y-1 pt-2 border-t border-border/40">
                          <li className="flex items-center gap-2 text-[10px] text-foreground/75 font-sans">
                            <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />
                            <span>Pages: {book.pages || 48}</span>
                          </li>
                          <li className="flex items-center gap-2 text-[10px] text-foreground/75 font-sans">
                            <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />
                            <span>Language: {book.language || "English"}</span>
                          </li>
                          <li className="flex items-center gap-2 text-[10px] text-foreground/75 font-sans">
                            <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />
                            <span>Includes AI Blueprints</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-border/40 mt-auto">
                      <div className="flex items-center justify-between py-2.5">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-display">
                          Format: PDF
                        </span>
                        <div className="text-right">
                          <span className="font-display font-bold text-foreground">
                            ₹{Number(book.current_price).toFixed(0)}
                          </span>
                          {book.original_price && book.original_price > book.current_price && (
                            <span className="text-[10px] text-muted-foreground line-through ml-1.5">
                              ₹{Number(book.original_price).toFixed(0)}
                            </span>
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
        <div className="glass flex flex-col justify-center rounded-[2rem] p-8 md:p-12 space-y-4 text-left">
          <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase flex items-center gap-1 font-display">
            About the Library
            <Sparkles className="w-3 h-3 text-primary" />
          </div>
          <h2 className="font-serif text-3xl leading-tight md:text-5xl text-foreground font-bold">
            Read, study &amp; reflect deeply.
          </h2>
          <p className="text-sm text-muted-foreground font-serif italic">
            "At NOTEStalgia, we believe in restoring the magic of study. Our AI blueprints and
            children's book collection are designed to help students read deeply — not just pass
            tests — making high-quality notes universally accessible."
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

function Testimonials() {
  const reviews = [
    {
      quote:
        "The formatted layout and AI Blueprints are incredibly detailed. I finished and understood the whole book in a single evening.",
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
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-border/40 font-serif font-bold text-foreground">
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
