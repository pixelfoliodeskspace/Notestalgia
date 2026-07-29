import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState, useEffect } from "react";
import { publishedBooksQuery } from "@/lib/books";
import { ArrowRight, Sparkles, Search, BookOpen, Check, Star, Shield, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedBooksQuery),
  component: Home,
});

const TITLE = "NOTEStalgia";

function Hero() {
  return (
    <section 
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-10 overflow-hidden bg-[#1c0f24]"
    >
      {/* Cinematic Ambient Background Blurs / Light Leak Blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/40 rounded-full blur-[160px] pointer-events-none z-0" />
      
      {/* Layered Floating Assets (Exactly as shown in mockup) */}
      
      {/* 1. Purple Closed Book (Left Top) */}
      <div 
        className="absolute left-[8%] top-[15%] w-36 sm:w-44 md:w-56 aspect-[3/4] z-10 pointer-events-none select-none hidden md:block"
        style={{
          animation: "book-float-cinematic 8s ease-in-out infinite",
          filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.65))"
        }}
      >
        <img 
          src="/book-asset.jpg" 
          alt="Vintage Book" 
          className="w-full h-full object-contain rounded-2xl" 
        />
        {/* Soft violet highlight behind book */}
        <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl -z-10 animate-pulse" />
      </div>

      {/* 2. White Feather Quill (Left Bottom) */}
      <div 
        className="absolute left-[3%] bottom-[12%] w-44 sm:w-56 md:w-72 aspect-[3/4] z-20 pointer-events-none select-none hidden md:block"
        style={{
          animation: "quill-sway-cinematic 10s ease-in-out infinite",
          filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))"
        }}
      >
        <img 
          src="/feather-asset.jpg" 
          alt="Feather Quill" 
          className="w-full h-full object-contain" 
        />
      </div>

      {/* 3. Magic Glowing Book (Right Bottom) */}
      <div 
        className="absolute right-[5%] bottom-[8%] w-60 sm:w-80 md:w-[28rem] aspect-[4/3] z-10 pointer-events-none select-none hidden md:block"
        style={{
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.85))"
        }}
      >
        <img 
          src="/glowing-book-asset.jpg" 
          alt="Glowing Book" 
          className="w-full h-full object-contain" 
        />
        {/* Golden glow shimmer rays */}
        <div 
          className="absolute inset-0 bg-radial from-amber-500/20 to-transparent mix-blend-screen pointer-events-none"
          style={{
            animation: "book-glow-pulse 4s ease-in-out infinite"
          }}
        />
      </div>

      {/* 4. Vintage Lantern (Right Middle) */}
      <div 
        className="absolute right-[1%] top-[20%] w-36 sm:w-44 md:w-56 aspect-[3/4] z-10 pointer-events-none select-none hidden md:block"
        style={{
          animation: "book-float-cinematic 11s ease-in-out infinite",
          filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.7))"
        }}
      >
        <img 
          src="/lantern-asset.jpg" 
          alt="Vintage Lantern" 
          className="w-full h-full object-contain" 
        />
      </div>

      {/* 5. Sparkles / Rising Magic Dust particles */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block overflow-hidden">
        {/* Sparkle 1 */}
        <div 
          className="absolute bottom-[20%] right-[30%] w-2 h-2 rounded-full bg-amber-400 blur-[1px] opacity-0"
          style={{ animation: "spark-rising-slow 7s linear infinite" }}
        />
        {/* Sparkle 2 */}
        <div 
          className="absolute bottom-[15%] right-[22%] w-1.5 h-1.5 rounded-full bg-amber-300 blur-[1px] opacity-0"
          style={{ animation: "spark-rising-fast 5s linear infinite 1.5s" }}
        />
        {/* Sparkle 3 */}
        <div 
          className="absolute bottom-[25%] right-[15%] w-2.5 h-2.5 rounded-full bg-amber-400/80 blur-[2px] opacity-0"
          style={{ animation: "spark-rising-slow 9s linear infinite 3s" }}
        />
        {/* Sparkle 4 */}
        <div 
          className="absolute bottom-[10%] right-[28%] w-1 h-1 rounded-full bg-amber-200 opacity-0"
          style={{ animation: "spark-rising-fast 6s linear infinite 4.2s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-4xl px-6 md:px-10 z-20 w-full text-center flex flex-col items-center justify-center my-auto space-y-6">
        {/* Star Divider & Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 text-primary">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-xs">✦</span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <div className="font-serif text-3xl font-bold tracking-tight text-foreground select-none">
            <span className="text-brand-note">NOTE</span>
            <span className="text-foreground">stalgia</span>
            <span className="text-brand-note font-sans font-bold text-base ml-[1px]">.</span>
          </div>
        </motion.div>

        {/* Cinematic Headline */}
        <div className="space-y-6 max-w-3xl">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.25rem] leading-[1.05] tracking-tight text-foreground font-bold">
            Where Every Book <br />
            Keeps a <span className="text-primary italic font-serif">Memory</span>
          </h1>

          <div className="flex items-center justify-center gap-3 text-primary/40">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/40" />
            <span className="text-xs">❦</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary/40" />
          </div>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-foreground/95 leading-relaxed font-serif italic">
            Acquire beautifully formatted volumes, handwritten study journals, and AI
            character blueprints. Classic physical reading meets modern digital notes.
          </p>
        </div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="pt-4"
        >
          <a 
            href="#collection" 
            className="btn-primary group flex items-center gap-2 shadow-[0_0_30px_rgba(13,148,136,0.4)] hover:shadow-[0_0_40px_rgba(13,148,136,0.6)] transition-all duration-300"
          >
            <span>Explore Bookstore</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      {/* Floating Glassmorphic Info Bar & Review Module */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="glass rounded-[2rem] p-6 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center"
        >
          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-primary">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider font-display">Premium Collections</h4>
                <p className="text-[10px] text-muted-foreground font-serif italic">Curated with care</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-primary">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider font-display">Handwritten Journals</h4>
                <p className="text-[10px] text-muted-foreground font-serif italic">Authentic & personal</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-primary font-display font-bold text-xs select-none">
                AI
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider font-display">AI Character Blueprints</h4>
                <p className="text-[10px] text-muted-foreground font-serif italic font-semibold">For creators & dreamers</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-primary">
                <Shield className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider font-display">Secure Access</h4>
                <p className="text-[10px] text-muted-foreground font-serif italic">Your library, safe</p>
              </div>
            </div>
          </div>

          {/* Vertical Separator for Desktop */}
          <div className="hidden lg:block w-[1px] h-10 bg-white/10" />

          {/* Review Module */}
          <div className="flex items-center gap-4 justify-center lg:justify-start">
            <div className="flex -space-x-2.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                alt=""
                className="h-9 w-9 rounded-full border-2 border-background object-cover shrink-0"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                alt=""
                className="h-9 w-9 rounded-full border-2 border-background object-cover shrink-0"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                alt=""
                className="h-9 w-9 rounded-full border-2 border-background object-cover shrink-0"
              />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-semibold text-foreground font-display uppercase tracking-wider">
                500+ Readers Enrolled
              </div>
              <div className="flex items-center gap-0.5 text-primary mt-0.5">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-8 flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-display">
          <span>Scroll to discover</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-primary stroke-[1.5]" />
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
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBuyNow = (e: React.MouseEvent, book: any) => {
    e.preventDefault();
    if (user) {
      window.open(book.superprofile_url || "https://superprofile.bio/in", "_blank", "noopener,noreferrer");
    } else {
      navigate({
        to: "/auth",
        search: { redirect: `/book/${book.slug}?checkout=true` },
      });
    }
  };

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
                    <button
                      onClick={(e) => handleBuyNow(e, book)}
                      className="btn-primary !px-2 !py-2 text-[10px] text-center w-full shadow-sm rounded-xl font-semibold cursor-pointer"
                    >
                      Buy Now
                    </button>
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
      <FeatureCards />
      <StatsBar />
      <Testimonials />
    </div>
  );
}
