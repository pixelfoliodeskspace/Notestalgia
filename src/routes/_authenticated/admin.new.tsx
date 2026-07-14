import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/slug";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/new")({
  component: NewBookPage,
});

function NewBookPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "",
    tagline: "",
    description: "",
    cover_image: "",
    category: "",
    current_price: "",
    original_price: "",
    pages: "",
    level: "",
    language: "English",
    updated_date: "",
    superprofile_url: "",
    featured: false,
    published: true,
  });

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.superprofile_url.trim()) {
      toast.error("Title and SuperProfile URL are required");
      return;
    }
    setBusy(true);
    try {
      const slug = slugify(form.title) + "-" + Math.random().toString(36).slice(2, 6);
      const { error } = await supabase.from("books").insert({
        title: form.title.trim(),
        slug,
        tagline: form.tagline || null,
        description: form.description || null,
        cover_image: form.cover_image || null,
        category: form.category || null,
        current_price: Number(form.current_price) || 0,
        original_price: form.original_price ? Number(form.original_price) : null,
        pages: form.pages ? Number(form.pages) : null,
        level: form.level || null,
        language: form.language || null,
        updated_date: form.updated_date || null,
        superprofile_url: form.superprofile_url.trim(),
        featured: form.featured,
        published: form.published,
      });
      if (error) throw error;
      toast.success("Book added to the collection");
      qc.invalidateQueries({ queryKey: ["books"] });
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add book");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-10 max-w-3xl">
      <Field label="Title *">
        <input required value={form.title} onChange={(e) => update("title", e.target.value)} className={input} />
      </Field>
      <Field label="Tagline">
        <input value={form.tagline} onChange={(e) => update("tagline", e.target.value)} className={input} placeholder="One-line hook" />
      </Field>
      <Field label="Description">
        <textarea rows={6} value={form.description} onChange={(e) => update("description", e.target.value)} className={input} />
      </Field>
      <Field label="Cover image URL">
        <input
          type="url"
          value={form.cover_image}
          onChange={(e) => update("cover_image", e.target.value)}
          className={input}
          placeholder="https://…"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Paste a public URL for the cover. (Direct uploads coming soon.)
        </p>
      </Field>

      <div className="grid grid-cols-2 gap-6">
        <Field label="Category">
          <input value={form.category} onChange={(e) => update("category", e.target.value)} className={input} placeholder="Guides" />
        </Field>
        <Field label="Language">
          <input value={form.language} onChange={(e) => update("language", e.target.value)} className={input} />
        </Field>
        <Field label="Current price (₹)">
          <input type="number" step="0.01" value={form.current_price} onChange={(e) => update("current_price", e.target.value)} className={input} />
        </Field>
        <Field label="Original price (₹)">
          <input type="number" step="0.01" value={form.original_price} onChange={(e) => update("original_price", e.target.value)} className={input} />
        </Field>
        <Field label="Pages">
          <input type="number" value={form.pages} onChange={(e) => update("pages", e.target.value)} className={input} />
        </Field>
        <Field label="Level">
          <input value={form.level} onChange={(e) => update("level", e.target.value)} className={input} placeholder="Beginner" />
        </Field>
        <Field label="Updated date">
          <input type="date" value={form.updated_date} onChange={(e) => update("updated_date", e.target.value)} className={input} />
        </Field>
      </div>

      <Field label="SuperProfile purchase URL *">
        <input
          type="url"
          required
          value={form.superprofile_url}
          onChange={(e) => update("superprofile_url", e.target.value)}
          className={input}
          placeholder="https://superprofile.bio/…"
        />
      </Field>

      <div className="flex items-center gap-8">
        <Toggle label="Featured" checked={form.featured} onChange={(v) => update("featured", v)} />
        <Toggle label="Published" checked={form.published} onChange={(v) => update("published", v)} />
      </div>

      <div className="pt-4 flex gap-3">
        <button type="submit" disabled={busy} className="btn-ink">
          {busy ? "Adding…" : "Add to collection"}
        </button>
        <button type="button" onClick={() => navigate({ to: "/admin" })} className="btn-ghost">
          Cancel
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
      <div className="text-[10px] font-display tracking-[0.3em] uppercase text-foreground/60 mb-2">{label}</div>
      {children}
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 group"
    >
      <div
        className={`w-10 h-6 rounded-full border transition-colors ${
          checked ? "bg-ink border-border" : "bg-transparent border-border"
        } relative`}
      >
        <div
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white/5 transition-all ${
            checked ? "left-[calc(100%-1.25rem-0.125rem)]" : "left-0.5"
          }`}
        />
      </div>
      <span className="text-sm font-display">{label}</span>
    </button>
  );
}
