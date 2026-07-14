import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useIsAdmin } from "@/hooks/use-is-admin";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Notestalgia" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { isAdmin, loading, user } = useIsAdmin();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 font-display text-muted-foreground">
        Checking access…
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="text-xs font-display tracking-[0.3em] uppercase text-ink/60 mb-4">
          Restricted
        </div>
        <h1 className="font-display text-4xl md:text-5xl mb-4">Admin only.</h1>
        <p className="text-muted-foreground mb-6">
          This area is reserved for the site owner.
        </p>
        <div className="text-xs text-ink/60 bg-paper border border-border rounded-lg p-4 mx-auto max-w-md text-left font-mono">
          <div className="text-[10px] uppercase tracking-widest mb-2 font-display text-ink/50">
            You're signed in as
          </div>
          <div className="break-all">{user?.email}</div>
          <div className="text-[10px] uppercase tracking-widest mt-4 mb-2 font-display text-ink/50">
            To become admin
          </div>
          <div className="whitespace-pre-wrap">
            Ask the site owner to grant your user the "admin" role in the backend.
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { to: "/admin", label: "Dashboard", exact: true },
    { to: "/admin/new", label: "Add book", exact: false },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-display tracking-[0.3em] uppercase text-ink/60 mb-3">
            Admin
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-none tracking-tight">
            Studio.
          </h1>
        </div>
        <nav className="flex gap-2">
          {tabs.map((t) => {
            const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`tag-pill ${active ? "bg-ink text-cream border-ink" : ""}`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="rule-hair mb-12" />
      <Outlet />
    </div>
  );
}
