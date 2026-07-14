import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Book = {
  id: string;
  title: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  cover_image: string | null;
  category: string | null;
  current_price: number;
  original_price: number | null;
  pages: number | null;
  level: string | null;
  language: string | null;
  updated_date: string | null;
  superprofile_url: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export const publishedBooksQuery = queryOptions({
  queryKey: ["books", "published"],
  queryFn: async (): Promise<Book[]> => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Book[];
  },
});

export const bookBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["books", "slug", slug],
    queryFn: async (): Promise<Book | null> => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as Book | null;
    },
  });

export const allBooksAdminQuery = queryOptions({
  queryKey: ["books", "all"],
  queryFn: async (): Promise<Book[]> => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Book[];
  },
});
