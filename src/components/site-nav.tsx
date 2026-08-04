import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { Menu, Search, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function SiteNav() {
  const { isAdmin, user } = useIsAdmin();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate({
        to: "/collection",
        // We can pass state or search parameter if the catalog page uses local search state
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background border-b border-border">
      {/* 1. TOP UTILITY BAR (Desktop Only) */}
      <div className="hidden md:block bg-muted/60 border-b border-border/50 py-2 text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex justify-between items-center">
          <div>High-quality PDFs. Instant Access. Lifelong Learning.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Sell on Notestalgia</a>
            <span className="text-border/85">|</span>
            <a href="#" className="hover:text-foreground transition-colors">Become an Author</a>
            <span className="text-border/85">|</span>
            <a href="#" className="hover:text-foreground transition-colors">Help Center</a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER ROW */}
      <div className="bg-background py-4">
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between gap-4">
          
          {/* Logo & Sub-tagline */}
          <Link to="/" className="flex flex-col select-none">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight">
              Notestalgia
            </span>
            <span className="hidden md:inline text-[9px] tracking-wider text-muted-foreground mt-0.5">
              Notes that stay. Knowledge that lasts.
            </span>
          </Link>

          {/* Search bar (Hidden on mobile) */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xl border border-border rounded-md overflow-hidden bg-muted/30 focus-within:border-primary/50 transition-colors">
            <div className="flex items-center px-3 text-muted-foreground border-r border-border/85 bg-muted/10 shrink-0 select-none text-xs gap-1.5 cursor-pointer hover:bg-muted/35">
              <span>All Categories</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for PDFs, EBooks, Notes..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full pl-3 pr-10 py-2 bg-transparent text-xs text-foreground focus:outline-none placeholder:text-muted-foreground/60"
              />
            </div>
            <button type="submit" className="bg-foreground text-background px-4 py-2 hover:bg-foreground/90 transition-colors shrink-0 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right side controls */}
          <div className="flex items-center gap-6">
            {/* Wishlist Link */}
            <a href="#" className="hidden lg:flex items-center gap-1.5 text-xs text-foreground hover:opacity-85 transition-opacity">
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </a>

            {/* Cart Link */}
            <a href="#" className="flex items-center gap-1.5 text-xs text-foreground hover:opacity-85 transition-opacity">
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              <span className="flex items-center justify-center bg-foreground text-background w-4 h-4 rounded-full text-[9px] font-bold">
                0
              </span>
            </a>

            {/* Auth Actions / Profile */}
            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="text-xs text-foreground/80 hover:text-foreground font-semibold px-2 py-1">
                      Admin
                    </Link>
                  )}
                  {user && (
                    <Link to="/library" className="text-xs text-foreground/80 hover:text-foreground font-semibold px-2 py-1">
                      Library
                    </Link>
                  )}
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="btn-ghost text-xs cursor-pointer py-1.5 px-3.5"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="btn-ghost text-xs py-1.5 px-3.5"
                    search={{ redirect: pathname }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth"
                    className="btn-primary text-xs py-1.5 px-3.5"
                    search={{ redirect: pathname }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Toggle menu"
                  className="grid h-8 w-8 place-items-center rounded-md border border-border bg-muted/40 md:hidden cursor-pointer hover:bg-muted/60 transition-colors"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background flex flex-col justify-between h-full border-l border-border w-72 p-6"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Access site navigation links and account settings.
                </SheetDescription>

                <div className="flex flex-col gap-6 mt-4">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <Link to="/" className="flex flex-col select-none">
                      <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
                        Notestalgia
                      </span>
                    </Link>
                  </div>

                  <nav className="flex flex-col gap-4 mt-2">
                    <SheetClose asChild>
                      <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                        Home
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/collection" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                        Collection
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                        About
                      </Link>
                    </SheetClose>
                    {user && (
                      <SheetClose asChild>
                        <Link to="/library" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                          My Library
                        </Link>
                      </SheetClose>
                    )}
                    {isAdmin && (
                      <SheetClose asChild>
                        <Link to="/admin" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                          Admin Panel
                        </Link>
                      </SheetClose>
                    )}
                  </nav>
                </div>

                <div className="pt-6 border-t border-border mt-auto">
                  {user ? (
                    <button
                      onClick={() => supabase.auth.signOut()}
                      className="btn-ink w-full text-center text-xs py-2.5 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        to="/auth"
                        className="btn-ink w-full text-center text-xs py-2.5"
                        search={{ redirect: pathname }}
                      >
                        Sign In
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* 3. CATEGORIES SUB-NAV ROW (Desktop Only) */}
      <div className="hidden md:block border-t border-border bg-background py-2">
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center gap-8 text-xs font-medium">
          <div className="flex items-center gap-2 cursor-pointer py-1 text-foreground/80 hover:text-foreground select-none">
            <Menu className="w-3.5 h-3.5" />
            <span className="font-semibold uppercase tracking-wider">Categories</span>
          </div>

          <div className="h-4 w-px bg-border/80" />

          <nav className="flex items-center gap-8">
            <Link to="/" className="text-foreground font-semibold border-b border-foreground pb-1 -mb-2 transition-all">
              Home
            </Link>
            <Link to="/collection" className="text-muted-foreground hover:text-foreground transition-colors">
              New Arrivals
            </Link>
            <Link to="/collection" className="text-muted-foreground hover:text-foreground transition-colors">
              Best Sellers
            </Link>
            <Link to="/collection" className="text-muted-foreground hover:text-foreground transition-colors">
              Bundles
            </Link>
            <Link to="/collection" className="text-muted-foreground hover:text-foreground transition-colors">
              Free Resources
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
