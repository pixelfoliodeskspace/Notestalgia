import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { allBooksAdminQuery } from "@/lib/books";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: books, isLoading } = useQuery(allBooksAdminQuery);

  const total = books?.length ?? 0;
  const featured = books?.filter((b) => b.featured).length ?? 0;
  const drafts = books?.filter((b) => !b.published).length ?? 0;
  const estRevenue = (books ?? []).reduce((s, b) => s + Number(b.current_price), 0);

  return (
    <div className="space-y-14">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total titles" value={total} />
        <Stat label="Featured" value={featured} />
        <Stat label="Drafts" value={drafts} />
        <Stat label="Catalog value" value={`₹${estRevenue.toFixed(0)}`} />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Recently added</h2>
        <Link to="/admin/new" className="btn-ink text-sm">
          Add book <span aria-hidden>+</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Loading…</div>
      ) : total === 0 ? (
        <div className="border border-dashed border-border rounded-lg py-16 text-center">
          <div className="font-display text-2xl mb-2">No books yet.</div>
          <p className="text-muted-foreground mb-6">Add your first title to start the collection.</p>
          <Link to="/admin/new" className="btn-ink">Add first book</Link>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <table className="w-full text-sm">
            <thead className="bg-paper text-left">
              <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:font-display [&>th]:text-xs [&>th]:tracking-widest [&>th]:uppercase [&>th]:text-ink/60">
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books!.slice(0, 20).map((b) => (
                <tr key={b.id} className="border-t border-border [&>td]:px-4 [&>td]:py-3">
                  <td className="font-medium">
                    <Link to="/book/$slug" params={{ slug: b.slug }} className="link-underline">
                      {b.title}
                    </Link>
                  </td>
                  <td className="text-muted-foreground">{b.category ?? "—"}</td>
                  <td>₹{Number(b.current_price).toFixed(0)}</td>
                  <td>
                    <span className={`tag-pill ${b.published ? "" : "opacity-60"}`}>
                      {b.published ? "Published" : "Draft"}
                    </span>
                    {b.featured && <span className="tag-pill ml-2 bg-mustard border-mustard">Featured</span>}
                  </td>
                  <td className="text-right">
                    <Link to="/admin/edit/$id" params={{ id: b.id }} className="text-xs link-underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <div className="text-[10px] font-display tracking-[0.3em] uppercase text-ink/60">{label}</div>
      <div className="mt-3 font-display text-4xl">{value}</div>
    </motion.div>
  );
}
