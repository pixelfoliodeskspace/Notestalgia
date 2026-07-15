import { Link, useRouterState } from "@tanstack/react-router";
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
  const { isAdmin, user } = useIsAdmin();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto mt-4 w-[min(96%,1200px)]">
        <div className="glass flex items-center justify-between rounded-full px-5 py-3">
          {/* Logo Brand matching Fable style */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background font-serif text-lg font-bold select-none">
              N
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-2xl tracking-tight font-bold">
                <span className="text-brand-note">Note</span>
                <span className="text-dusty">stalgia</span>
              </span>
              <span className="text-[9px] tracking-[0.32em] text-muted-foreground uppercase">
                Digital Library
              </span>
            </span>
          </Link>

          {/* Navigation links */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              to="/"
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              Home
            </Link>
            <Link
              to="/collection"
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              Collection
            </Link>
            <Link
              to="/about"
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              About
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground font-semibold" }}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Action Cabin/Auth button */}
          <div className="flex items-center gap-2">
            {user ? (
              <Link
                to="/auth"
                className="btn-primary text-xs hidden sm:inline-flex"
                search={{ redirect: pathname }}
              >
                My Account
              </Link>
            ) : (
              <Link
                to="/auth"
                className="btn-primary text-xs hidden sm:inline-flex"
                search={{ redirect: pathname }}
              >
                Enter Cabin
              </Link>
            )}

            {/* Mobile menu trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Toggle menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-white/40 lg:hidden cursor-pointer hover:bg-white/60 transition-colors"
                >
                  <Menu className="h-4 w-4" />
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

                <div className="flex flex-col gap-6 mt-4">
                  <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background font-serif text-lg font-bold">
                        N
                      </span>
                      <span className="flex flex-col leading-none">
                        <span className="font-serif text-2xl tracking-tight font-bold">
                          <span className="text-brand-note">Note</span>
                          <span className="text-dusty">stalgia</span>
                        </span>
                        <span className="text-[9px] tracking-[0.32em] text-muted-foreground uppercase">
                          Library
                        </span>
                      </span>
                    </Link>
                  </div>

                  <nav className="flex flex-col gap-4 mt-6">
                    <SheetClose asChild>
                      <Link
                        to="/"
                        className="text-lg font-medium text-foreground/80 transition-all hover:text-foreground hover:translate-x-1 duration-200"
                      >
                        Home
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/collection"
                        className="text-lg font-medium text-foreground/80 transition-all hover:text-foreground hover:translate-x-1 duration-200"
                      >
                        Collection
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/about"
                        className="text-lg font-medium text-foreground/80 transition-all hover:text-foreground hover:translate-x-1 duration-200"
                      >
                        About
                      </Link>
                    </SheetClose>
                    {isAdmin && (
                      <SheetClose asChild>
                        <Link
                          to="/admin"
                          className="text-lg font-medium text-foreground/80 transition-all hover:text-foreground hover:translate-x-1 duration-200 font-semibold"
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
                        className="btn-ink w-full text-center text-sm font-display py-3"
                        search={{ redirect: pathname }}
                      >
                        Account Cabin
                      </Link>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        to="/auth"
                        className="btn-ink w-full text-center text-sm font-display py-3"
                        search={{ redirect: pathname }}
                      >
                        Sign in to Cabin
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
