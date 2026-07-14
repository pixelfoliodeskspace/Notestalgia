import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl">
            Notestalgia<span className="text-primary">.</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Made for learners. A quiet library of premium AI notes, guides and digital resources.
          </p>
        </div>
        <div className="flex md:justify-center gap-8 text-sm">
          <Link to="/collection" className="link-underline">
            Collection
          </Link>
          <Link to="/about" className="link-underline">
            About
          </Link>
          <a href="mailto:hello@notestalgia.com" className="link-underline">
            Contact
          </a>
        </div>
        <div className="md:text-right text-xs text-muted-foreground font-display tracking-widest uppercase">
          © {new Date().getFullYear()} Notestalgia
        </div>
      </div>
    </footer>
  );
}
