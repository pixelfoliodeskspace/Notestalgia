import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const claimSearchSchema = z.object({
  book_slug: z.string(),
  secret: z.string(),
});

export const Route = createFileRoute("/_authenticated/library/claim")({
  validateSearch: claimSearchSchema,
  loader: async ({ context, search }) => {
    const { book_slug, secret } = search;
    const user = context.user; // Inherited from parent layout context

    // 1. Verify secret
    const EXPECTED_SECRET = import.meta.env.VITE_CLAIM_SECRET || "notestalgia_claim_token";
    if (secret !== EXPECTED_SECRET) {
      throw new Error("Invalid claim secret token.");
    }

    // 2. Retrieve book by slug
    const { data: book, error: bookError } = await supabase
      .from("books")
      .select("id, title")
      .eq("slug", book_slug)
      .maybeSingle();

    if (bookError) throw bookError;
    if (!book) {
      throw new Error(`The book matching slug '${book_slug}' could not be found.`);
    }

    // 3. Insert into user_library (claims ownership)
    const { error: insertError } = await supabase
      .from("user_library")
      .insert({
        user_id: user.id,
        book_id: book.id,
      });

    // Code 23505 is PostgreSQL's unique_violation. If it already exists, ignore it.
    if (insertError && insertError.code !== "23505") {
      throw insertError;
    }

    // 4. Force refetch of library list
    context.queryClient.invalidateQueries({ queryKey: ["user-library", user.id] });

    // 5. Redirect to library shelf
    throw redirect({
      to: "/library",
    });
  },
  component: ClaimingPage,
  errorComponent: ClaimErrorPage,
});

function ClaimingPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-32 text-center space-y-4">
      <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      <h1 className="font-display text-2xl">Claiming your purchase...</h1>
      <p className="text-sm text-muted-foreground">
        Please wait while we add this title to your digital shelf.
      </p>
    </div>
  );
}

function ClaimErrorPage({ error }: { error: Error }) {
  return (
    <div className="mx-auto max-w-md px-6 py-32 text-center space-y-6">
      <div className="mx-auto w-16 h-16 rounded-full bg-destructive/15 border border-destructive/30 grid place-items-center text-destructive">
        ⚠️
      </div>
      <div className="space-y-2">
        <h1 className="font-display text-2xl text-foreground">Claim Failed</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {error.message || "An unexpected error occurred while claiming your book."}
        </p>
      </div>
      <div className="pt-2">
        <Link to="/collection" className="btn-ink px-6 py-3">
          Back to Bookstore
        </Link>
      </div>
    </div>
  );
}
