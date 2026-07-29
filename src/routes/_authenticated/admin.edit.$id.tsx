import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { slugify } from "@/lib/slug";
import { Upload, Image, Loader2 } from "lucide-react";

import type { Book } from "@/lib/books";

const bookByIdQuery = (id: string) =>
  queryOptions({
    queryKey: ["books", "id", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("books").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data as Book;
    },
  });

export const Route = createFileRoute("/_authenticated/admin/edit/$id")({
  head: () => ({
    meta: [{ title: "Edit Book — Notestalgia" }, { name: "robots", content: "noindex" }],
  }),
  component: EditBookPage,
});

function EditBookPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: book, isLoading } = useQuery(bookByIdQuery(id));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<Partial<Book> | null>(null);

  useEffect(() => {
    if (book && !form) setForm({ ...book });
  }, [book, form]);

  if (isLoading || !form) {
    return <div className="text-muted-foreground">Loading…</div>;
  }

  function update(k: keyof Book | string, v: unknown) {
    setForm((f) => ({ ...(f || {}), [k]: v }));
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const slug = form.title ? slugify(form.title) : "book";
      const fileName = `${slug}-${Math.random().toString(36).substring(2, 6)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("book-covers")
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from("book-covers")
        .getPublicUrl(fileName);

      update("cover_image", publicUrl);
      toast.success("Cover image uploaded successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

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
      <Field label="Title">
        <input
          required
          value={form.title ?? ""}
          onChange={(e) => update("title", e.target.value)}
          className={input}
        />
      </Field>
      <Field label="Tagline">
        <input
          value={form.tagline ?? ""}
          onChange={(e) => update("tagline", e.target.value)}
          className={input}
        />
      </Field>
      <Field label="Description">
        <textarea
          rows={6}
          value={form.description ?? ""}
          onChange={(e) => update("description", e.target.value)}
          className={input}
        />
      </Field>
      <Field label="Cover Image">
        <div className="mt-2 space-y-4">
          <div className="flex gap-4 items-center">
            {form.cover_image ? (
              <div className="relative aspect-[3/4] w-28 rounded-lg overflow-hidden border border-border bg-white/5 shadow-inner shrink-0">
                <img src={form.cover_image} alt="Preview" className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="relative aspect-[3/4] w-28 rounded-lg border border-dashed border-border bg-white/5 flex flex-col items-center justify-center text-muted-foreground shrink-0 select-none">
                <Image className="w-6 h-6 stroke-[1.5]" />
                <span className="text-[9px] mt-1 uppercase font-display tracking-wider">No Cover</span>
              </div>
            )}

            <div className="flex-1 space-y-2">
              <label
                htmlFor="cover-upload"
                className="btn-ghost flex items-center justify-center gap-2 py-2 text-xs font-semibold cursor-pointer w-full"
              >
                {uploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                <span>{uploading ? "Uploading..." : "Upload Cover File"}</span>
              </label>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
              <p className="text-[10px] text-muted-foreground text-center">
                PNG, JPG or WebP up to 5MB.
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-display uppercase tracking-widest text-foreground/50">
              Or paste image URL directly
            </label>
            <input
              type="url"
              value={form.cover_image ?? ""}
              onChange={(e) => update("cover_image", e.target.value)}
              className={input}
              placeholder="https://…"
            />
          </div>
        </div>
      </Field>
      <div className="grid grid-cols-2 gap-6">
        <Field label="Category">
          <input
            value={form.category ?? ""}
            onChange={(e) => update("category", e.target.value)}
            className={input}
          />
        </Field>
        <Field label="Language">
          <input
            value={form.language ?? ""}
            onChange={(e) => update("language", e.target.value)}
            className={input}
          />
        </Field>
        <Field label="Current price (₹)">
          <input
            type="number"
            step="0.01"
            value={form.current_price ?? ""}
            onChange={(e) => update("current_price", e.target.value)}
            className={input}
          />
        </Field>
        <Field label="Original price (₹)">
          <input
            type="number"
            step="0.01"
            value={form.original_price ?? ""}
            onChange={(e) => update("original_price", e.target.value)}
            className={input}
          />
        </Field>
        <Field label="Pages">
          <input
            type="number"
            value={form.pages ?? ""}
            onChange={(e) => update("pages", e.target.value)}
            className={input}
          />
        </Field>
        <Field label="Level">
          <input
            value={form.level ?? ""}
            onChange={(e) => update("level", e.target.value)}
            className={input}
          />
        </Field>
        <Field label="Updated date">
          <input
            type="date"
            value={form.updated_date ?? ""}
            onChange={(e) => update("updated_date", e.target.value)}
            className={input}
          />
        </Field>
      </div>
      <Field label="SuperProfile URL">
        <input
          type="url"
          required
          value={form.superprofile_url ?? ""}
          onChange={(e) => update("superprofile_url", e.target.value)}
          className={input}
        />
      </Field>

      <div className="flex items-center gap-8">
        <Toggle
          label="Featured"
          checked={!!form.featured}
          onChange={(v) => update("featured", v)}
        />
        <Toggle
          label="Published"
          checked={!!form.published}
          onChange={(v) => update("published", v)}
        />
      </div>

      <div className="pt-4 flex gap-3">
        <button type="submit" disabled={busy} className="btn-ink">
          {busy ? "Saving…" : "Save changes"}
        </button>
        <button type="button" onClick={() => navigate({ to: "/admin" })} className="btn-ghost">
          Cancel
        </button>
        <button
          type="button"
          onClick={remove}
          disabled={busy}
          className="ml-auto text-sm text-red-700 hover:underline"
        >
          Delete
        </button>
      </div>
    </form>
  );
}

const input =
  "w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-border transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[10px] font-display tracking-[0.3em] uppercase text-foreground/60 mb-2">
        {label}
      </div>
      {children}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-3">
      <div
        className={`w-10 h-6 rounded-full border transition-colors ${checked ? "bg-ink border-border" : "bg-transparent border-border"} relative`}
      >
        <div
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white/5 transition-all ${checked ? "left-[calc(100%-1.25rem-0.125rem)]" : "left-0.5"}`}
        />
      </div>
      <span className="text-sm font-display">{label}</span>
    </button>
  );
}
