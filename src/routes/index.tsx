import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { publishedBooksQuery } from "@/lib/books";
import { 
  ArrowRight, 
  Sparkles, 
  Search, 
  Check, 
  Star, 
  FileDown, 
  ShieldCheck, 
  LifeBuoy 
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { BookCard } from "@/components/book-card";
import { NotesalgiaBrandShowcase } from "@/components/notesalgia-wordmark";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publishedBooksQuery),
  component: Home,
});

function Hero() {
  return (
    <section className="mx-auto mt-6 w-[min(96%,1200px)]">
      <div className="bg-card rounded-[2rem] border-2 border-border overflow-hidden grid md:grid-cols-12 items-center gap-8 p-8 md:p-12 min-h-[60vh] shadow-sm">
        {/* Left Info Column */}
        <div className="md:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-sans uppercase tracking-widest font-semibold">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Welcome to Notestalgia</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight text-foreground font-bold">
            Where every page <br />
            Keeps a <span className="text-primary italic">memory</span>
          </h1>

          <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
            Explore expertly crafted PDFs across academics, self-growth, business, design, and more. Download instantly to start learning.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#collection" className="btn-primary flex items-center gap-2 text-xs py-2.5 px-6">
              <span>Explore PDFs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link to="/collection" className="btn-ghost flex items-center gap-2 text-xs py-2.5 px-6">
              <span>Browse Categories</span>
            </Link>
          </div>
        </div>

        {/* Right Visual Image Column */}
        <div className="md:col-span-6 h-full flex items-center justify-center">
          <div className="w-full h-[280px] md:h-[400px] rounded-2xl overflow-hidden shadow-soft border-2 border-border bg-background">
            <img 
              src="/hero-desk.jpg" 
              alt="Notestalgia Lifestyle Mockup" 
              className="w-full h-full object-cover select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesBar() {
  const items = [
    {
      title: "High Quality Content",
      subtitle: "Curated and verified PDFs",
      icon: <Star className="w-5 h-5 text-foreground" />,
    },
    {
      title: "Instant Access",
      subtitle: "Download immediately",
      icon: <FileDown className="w-5 h-5 text-foreground" />,
    },
    {
      title: "Secure Payments",
      subtitle: "Safe & trusted checkout",
      icon: <ShieldCheck className="w-5 h-5 text-foreground" />,
    },
    {
      title: "24/7 Support",
      subtitle: "We're here to help",
      icon: <LifeBuoy className="w-5 h-5 text-foreground" />,
    },
  ];

  return (
    <section className="mx-auto mt-12 w-[min(96%,1200px)] border-y border-border/70 py-8 bg-background">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-border/60">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 px-4 pt-4 md:pt-0 first:pt-0">
            <div className="p-2 rounded-lg bg-muted/40 border border-border/50 shrink-0">
              {item.icon}
            </div>
            <div className="text-left">
              <h3 className="font-sans text-xs md:text-sm font-semibold text-foreground leading-tight">
                {item.title}
              </h3>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">
                {item.subtitle}
              </p>
            </div>
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
    <section id="collection" className="mx-auto mt-14 w-[min(96%,1200px)]">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-left">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground font-bold tracking-tight">
            Featured PDFs
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 font-serif italic">
            Begin your study journey with our popular formatted guides.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Simple search bar next to title */}
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/40 pl-8 pr-4 py-1.5 border border-border rounded-md font-sans text-xs focus:outline-none focus:border-foreground/45 text-foreground transition-all"
            />
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2.5" />
          </div>
          <Link to="/collection" className="text-xs font-semibold hover:underline shrink-0">
            View All
          </Link>
        </div>
      </div>

      {/* Grid of Clean Minimalist Cards */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {filteredBooks.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-4 text-center py-16 text-xs font-serif text-foreground/60 italic">
            No matching volumes found in the library.
          </div>
        ) : (
          filteredBooks.slice(0, 8).map((book, idx) => (
            <BookCard key={book.id} book={book} index={idx} />
          ))
        )}
      </div>
    </section>
  );
}

function TopCategories() {
  const categories = [
    "Business",
    "Education",
    "Self Help",
    "Design",
    "Technology",
    "Health & Fitness"
  ];

  return (
    <section className="mx-auto mt-14 w-[min(96%,1200px)]">
      <div className="text-center space-y-4 mb-8">
        <h2 className="font-serif text-3xl text-foreground font-bold tracking-tight">
          Top Categories
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((c, idx) => (
          <Link
            key={idx}
            to="/collection"
            search={{ category: c }}
            className="px-6 py-3 border-2 border-border rounded-full text-xs font-semibold text-foreground hover:bg-white hover:border-foreground transition-all font-sans shadow-sm"
          >
            {c}
          </Link>
        ))}
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
    <section className="mx-auto mt-16 w-[min(96%,1200px)] pb-12">
      <div className="mb-8 flex items-end justify-between gap-4 text-left border-b border-border pb-4">
        <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold">
          Reader Results
        </h2>
        <a
          href="https://wa.me/919645767284?text=I%27d%20like%20to%20know%20more%20about%20Notestalgia"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold hover:underline flex items-center gap-1"
        >
          Start Your Journey
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((r, idx) => (
          <figure key={idx} className="bg-card border border-border rounded-xl p-6 shadow-sm text-left">
            <div className="text-3xl font-serif leading-none text-muted-foreground/30">“</div>
            <blockquote className="mt-2 font-serif text-sm md:text-base leading-relaxed text-foreground italic">
              {r.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border/50 pt-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border font-sans font-bold text-foreground text-xs">
                {r.author.slice(0, 1)}
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">{r.author}</div>
                <div className="text-[10px] text-muted-foreground font-sans">{r.role}</div>
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
    <div className="space-y-16 pb-12 bg-background">
      <Hero />
      <NotesalgiaBrandShowcase />
      <FeaturesBar />
      <CollectionPreview />
      <TopCategories />
      <Testimonials />
    </div>
  );
}
