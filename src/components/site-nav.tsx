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
          ? "backdrop-blur-md bg-[color:var(--cream)]/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-lg tracking-tight font-bold">
          <span className="text-mustard">Note</span>
          <span className="text-dusty">stalgia</span>
          <span className="text-mustard">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/collection" className="link-underline text-ink/80 hover:text-ink" activeProps={{ className: "text-ink" }}>
            Collection
          </Link>
          <Link to="/about" className="link-underline text-ink/80 hover:text-ink" activeProps={{ className: "text-ink" }}>
            About
          </Link>
          {isAdmin && (
            <Link to="/admin" className="link-underline text-dusty" activeProps={{ className: "text-ink" }}>
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/auth" className="btn-ghost text-xs hidden md:inline-flex" search={{ redirect: pathname }}>
              Account
            </Link>
          ) : (
            <Link to="/auth" className="btn-ghost text-xs hidden md:inline-flex" search={{ redirect: pathname }}>
              Sign in
            </Link>
          )}

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2 -mr-2 text-ink hover:text-ink/80 focus:outline-none cursor-pointer"
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
                  <div className="font-display text-lg tracking-tight pt-4">
                    <span className="font-medium">Notestalgia</span>
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
                        Account
                      </Link>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        to="/auth"
                        className="btn-ink w-full text-center text-sm font-display"
                        search={{ redirect: pathname }}
                      >
                        Sign in
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

