import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const bookByIdQuery = (id: string) =>
  queryOptions({
    queryKey: ["books", "id", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("books").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const Route = createFileRoute("/_authenticated/admin/edit/$id")({
  component: EditBookPage,
});

function EditBookPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: book, isLoading } = useQuery(bookByIdQuery(id));
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    if (book && !form) setForm({ ...book });
  }, [book]);

  if (isLoading || !form) {
    return <div className="text-muted-foreground">Loading…</div>;
  }

  function update(k: string, v: any) {
    setForm((f) => ({ ...(f as any), [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase
        .from("books")
        .update({
          title: form!.title,
          tagline: form!.tagline || null,
          description: form!.description || null,
          cover_image: form!.cover_image || null,
          category: form!.category || null,
          current_price: Number(form!.current_price) || 0,
          original_price: form!.original_price ? Number(form!.original_price) : null,
          pages: form!.pages ? Number(form!.pages) : null,
          level: form!.level || null,
          language: form!.language || null,
          updated_date: form!.updated_date || null,
          superprofile_url: form!.superprofile_url,
          featured: !!form!.featured,
          published: !!form!.published,
        })
        .eq("id", id);
      if (error) throw error;
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["books"] });
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Delete this book permanently?")) return;
    setBusy(true);
    const { error } = await supabase.from("books").delete().eq("id", id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["books"] });
    navigate({ to: "/admin" });
  }

  return (
    <form onSubmit={submit} className="space-y-10 max-w-3xl">
      <Field label="Title"><input required value={form.title ?? ""} onChange={(e) => update("title", e.target.value)} className={input} /></Field>
      <Field label="Tagline"><input value={form.tagline ?? ""} onChange={(e) => update("tagline", e.target.value)} className={input} /></Field>
      <Field label="Description"><textarea rows={6} value={form.description ?? ""} onChange={(e) => update("description", e.target.value)} className={input} /></Field>
      <Field label="Cover image URL"><input type="url" value={form.cover_image ?? ""} onChange={(e) => update("cover_image", e.target.value)} className={input} /></Field>
      <div className="grid grid-cols-2 gap-6">
        <Field label="Category"><input value={form.category ?? ""} onChange={(e) => update("category", e.target.value)} className={input} /></Field>
        <Field label="Language"><input value={form.language ?? ""} onChange={(e) => update("language", e.target.value)} className={input} /></Field>
        <Field label="Current price (₹)"><input type="number" step="0.01" value={form.current_price ?? ""} onChange={(e) => update("current_price", e.target.value)} className={input} /></Field>
        <Field label="Original price (₹)"><input type="number" step="0.01" value={form.original_price ?? ""} onChange={(e) => update("original_price", e.target.value)} className={input} /></Field>
        <Field label="Pages"><input type="number" value={form.pages ?? ""} onChange={(e) => update("pages", e.target.value)} className={input} /></Field>
        <Field label="Level"><input value={form.level ?? ""} onChange={(e) => update("level", e.target.value)} className={input} /></Field>
        <Field label="Updated date"><input type="date" value={form.updated_date ?? ""} onChange={(e) => update("updated_date", e.target.value)} className={input} /></Field>
      </div>
      <Field label="SuperProfile URL"><input type="url" required value={form.superprofile_url ?? ""} onChange={(e) => update("superprofile_url", e.target.value)} className={input} /></Field>

      <div className="flex items-center gap-8">
        <Toggle label="Featured" checked={!!form.featured} onChange={(v) => update("featured", v)} />
        <Toggle label="Published" checked={!!form.published} onChange={(v) => update("published", v)} />
      </div>

      <div className="pt-4 flex gap-3">
        <button type="submit" disabled={busy} className="btn-ink">{busy ? "Saving…" : "Save changes"}</button>
        <button type="button" onClick={() => navigate({ to: "/admin" })} className="btn-ghost">Cancel</button>
        <button type="button" onClick={remove} disabled={busy} className="ml-auto text-sm text-red-700 hover:underline">Delete</button>
      </div>
    </form>
  );
}

const input = "w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-ink transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[10px] font-display tracking-[0.3em] uppercase text-ink/60 mb-2">{label}</div>
      {children}
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-3">
      <div className={`w-10 h-6 rounded-full border transition-colors ${checked ? "bg-ink border-ink" : "bg-transparent border-border"} relative`}>
        <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-cream transition-all ${checked ? "left-[calc(100%-1.25rem-0.125rem)]" : "left-0.5"}`} />
      </div>
      <span className="text-sm font-display">{label}</span>
    </button>
  );
}
