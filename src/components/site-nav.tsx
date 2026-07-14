import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin, user } = useIsAdmin();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[color:var(--cream)]/85 border-b border-walnut/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        
        {/* Editorial Logo */}
        <Link to="/" className="font-serif text-lg tracking-tight font-bold group">
          <span className="text-mustard transition-colors group-hover:text-honey">Note</span>
          <span className="text-dusty transition-colors group-hover:text-walnut">stalgia</span>
          <span className="text-mustard font-sans font-bold text-base ml-[1px]">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-display uppercase tracking-wider">
          <Link to="/collection" className="link-underline text-ink/80 hover:text-ink" activeProps={{ className: "text-ink font-semibold" }}>
            Collection
          </Link>
          <Link to="/about" className="link-underline text-ink/80 hover:text-ink" activeProps={{ className: "text-ink font-semibold" }}>
            About
          </Link>
          {isAdmin && (
            <Link to="/admin" className="link-underline text-dusty hover:text-ink" activeProps={{ className: "text-ink" }}>
              Admin Panel
            </Link>
          )}
        </nav>

        {/* Storybook Action Bar (Basket, Nest, Cabin) */}
        <div className="flex items-center gap-3">
          
          {/* Bird's Nest (Wishlist) */}
          <Sheet>
            <SheetTrigger asChild>
              <button 
                className="p-2 text-ink/85 hover:text-mustard transition-colors relative cursor-pointer group rounded-full hover:bg-paper/50" 
                title="Wishlist Nest"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
                  <path d="M3 14c2-1 6-2 9-2s7 1 9 2" className="text-walnut" />
                  <path d="M2 16c3-1.5 7-2.5 10-2.5s7 1 10 2.5" className="text-walnut" />
                  <path d="M4 18c4-1 8-1.5 12-1.5s4 0.5 4 1.5" className="text-walnut" />
                  <path d="M6 16c2 3 6 4 12 0" className="text-walnut fill-paper/40" />
                  <ellipse cx="9" cy="11" rx="2.2" ry="3" className="fill-sage/60 text-sage/80" />
                  <ellipse cx="14" cy="11" rx="2.2" ry="3" className="fill-honey/60 text-honey/80" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="paper-bg border-l border-border w-80 sm:w-96 flex flex-col justify-between">
              <SheetTitle className="font-serif text-2xl text-ink flex items-center gap-2 border-b border-border/40 pb-4">
                <span>🪺 Wishlist Nest</span>
              </SheetTitle>
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-paper flex items-center justify-center border border-border/40 animate-float">
                  <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-ink/40">
                    <path d="M3 14c2-1 6-2 9-2s7 1 9 2" />
                    <path d="M2 16c3-1.5 7-2.5 10-2.5s7 1 10 2.5" />
                    <ellipse cx="9" cy="11" rx="2.2" ry="3" />
                    <ellipse cx="14" cy="11" rx="2.2" ry="3" />
                  </svg>
                </div>
                <div className="space-y-1.5 px-6">
                  <h4 className="font-serif text-lg font-semibold text-ink">Nest is empty</h4>
                  <p className="text-xs text-ink/60 font-serif italic">
                    "Your wishlist nest has no eggs. Save knowledge items here to let them hatch."
                  </p>
                </div>
              </div>
              <SheetClose asChild>
                <button className="w-full btn-ghost text-xs py-2 flex items-center justify-center cursor-pointer">
                  Close nest
                </button>
              </SheetClose>
            </SheetContent>
          </Sheet>

          {/* Picnic Basket (Cart) */}
          <Sheet>
            <SheetTrigger asChild>
              <button 
                className="p-2 text-ink/85 hover:text-mustard transition-colors relative cursor-pointer group rounded-full hover:bg-paper/50" 
                title="Picnic Basket (Cart)"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
                  <path d="M4 10c0-4 3-7 8-7s8 3 8 7" className="text-walnut" />
                  <path d="M2 10h20l-2 10H4L2 10z" className="fill-paper/60 text-walnut" />
                  <path d="M7 10v10" stroke="rgba(0,0,0,0.1)" />
                  <path d="M12 10v10" stroke="rgba(0,0,0,0.1)" />
                  <path d="M17 10v10" stroke="rgba(0,0,0,0.1)" />
                  <path d="M2 14h20" stroke="rgba(0,0,0,0.1)" />
                  <path d="M3 18h18" stroke="rgba(0,0,0,0.1)" />
                </svg>
                <span className="absolute -top-[1px] -right-[1px] bg-berry text-cream text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-cream shadow-sm">
                  0
                </span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="paper-bg border-l border-border w-80 sm:w-96 flex flex-col justify-between">
              <SheetTitle className="font-serif text-2xl text-ink flex items-center gap-2 border-b border-border/40 pb-4">
                <span>🧺 Picnic Basket</span>
              </SheetTitle>
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-paper flex items-center justify-center border border-border/40 animate-float">
                  <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-ink/40">
                    <path d="M4 10c0-4 3-7 8-7s8 3 8 7" />
                    <path d="M2 10h20l-2 10H4L2 10z" />
                  </svg>
                </div>
                <div className="space-y-1.5 px-6">
                  <h4 className="font-serif text-lg font-semibold text-ink">Basket is empty</h4>
                  <p className="text-xs text-ink/60 font-serif italic">
                    "Walk through the forest and pick some fresh knowledge fruits from the Tree of Knowledge."
                  </p>
                </div>
              </div>
              <div className="border-t border-border/40 pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-serif text-ink/70">Basket Total:</span>
                  <span className="font-display font-bold text-ink">₹0</span>
                </div>
                <SheetClose asChild>
                  <button className="w-full btn-ink text-sm py-2.5 flex items-center justify-center gap-2 cursor-pointer">
                    Explore forest
                  </button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

          {/* Cozy Log Cabin (Account) */}
          <Link 
            to="/auth" 
            className="p-2 text-ink/85 hover:text-mustard transition-colors relative cursor-pointer group rounded-full hover:bg-paper/50" 
            search={{ redirect: pathname }}
            title={user ? "Cozy Cabin (Account)" : "Sign in to Cabin"}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
              <path d="M2 12l10-9 10 9" className="text-walnut" />
              <path d="M4 10v11h16V10" className="text-walnut fill-paper/60" />
              <path d="M9 21v-6h6v6" className="text-walnut fill-paper" />
              <rect x="6" y="12" width="3" height="3" rx="0.5" className="fill-honey/20 text-walnut" />
              <path d="M18 6V4h-2" className="text-walnut" />
              <path d="M17 2c0.5-0.5 1-0.5 1 0s-0.5 1-0.5 1.5" className="text-mustard stroke-[1.5] animate-pulse" />
            </svg>
          </Link>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2 -mr-2 text-ink hover:text-ink/80 focus:outline-none cursor-pointer rounded-full hover:bg-paper/50"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="paper-bg flex flex-col justify-between h-full border-l border-border w-72"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Access site navigation links and account settings.
                </SheetDescription>
                
                <div className="flex flex-col gap-8">
                  <div className="font-serif text-lg tracking-tight pt-4 font-bold">
                    <span className="text-mustard">Note</span>
                    <span className="text-dusty">stalgia</span>
                    <span className="text-mustard">.</span>
                  </div>
                  <nav className="flex flex-col gap-4 text-base font-display">
                    <SheetClose asChild>
                      <Link
                        to="/collection"
                        className="text-ink/80 hover:text-ink py-2 border-b border-border/40 transition-colors"
                      >
                        Collection
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/about"
                        className="text-ink/80 hover:text-ink py-2 border-b border-border/40 transition-colors"
                      >
                        About
                      </Link>
                    </SheetClose>
                    {isAdmin && (
                      <SheetClose asChild>
                        <Link
                          to="/admin"
                          className="text-dusty hover:text-ink py-2 border-b border-border/40 transition-colors font-semibold"
                        >
                          Admin Panel
                        </Link>
                      </SheetClose>
                    )}
                  </nav>
                </div>

                <div className="pt-6 border-t border-border mt-auto">
                  {user ? (
                    <SheetClose asChild>
                      <Link
                        to="/auth"
                        className="btn-ink w-full text-center text-sm font-display"
                        search={{ redirect: pathname }}
                      >
                        Account Cabin
                      </Link>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        to="/auth"
                        className="btn-ink w-full text-center text-sm font-display"
                        search={{ redirect: pathname }}
                      >
                        Enter Cabin (Sign In)
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
