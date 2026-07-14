import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in — Notestalgia" },
      { name: "description", content: "Sign in to Notestalgia." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const cleanRedirect = redirect && redirect.startsWith("/") ? redirect : "/";

  async function handleGoogle() {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message ?? "Sign in failed");
        setBusy(false);
        return;
      }
      if (result.redirected) return;
      navigate({ to: cleanRedirect });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Account created. You're signed in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: cleanRedirect });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
  }

  if (user) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <div className="text-xs font-display tracking-[0.3em] uppercase text-foreground/60 mb-4">
          Account
        </div>
        <h1 className="font-display text-4xl mb-3">Signed in</h1>
        <p className="text-muted-foreground text-sm mb-8">{user.email}</p>
        <div className="flex justify-center gap-3">
          <Link to="/collection" className="btn-ink">Browse collection</Link>
          <button onClick={handleSignOut} className="btn-ghost">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-xs font-display tracking-[0.3em] uppercase text-foreground/60 mb-4">
          {mode === "signin" ? "Welcome back" : "Create account"}
        </div>
        <h1 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
          {mode === "signin" ? "Sign in." : "Join the library."}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Optional. You can browse the entire collection without an account.
        </p>

        <div className="mt-10 space-y-3">
          <button
            onClick={handleGoogle}
            disabled={busy}
            className="btn-ghost w-full py-3"
          >
            Continue with Google
          </button>
        </div>

        <div className="my-8 flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
          <div className="flex-1 rule-hair" />
          or
          <div className="flex-1 rule-hair" />
        </div>

        <form onSubmit={handleEmail} className="space-y-4">
          <div>
            <label className="text-xs font-display tracking-widest uppercase text-foreground/60">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-border transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-display tracking-widest uppercase text-foreground/60">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-border transition-colors"
            />
          </div>
          <button type="submit" disabled={busy} className="btn-ink w-full mt-4">
            {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          {mode === "signin" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="link-underline text-foreground"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="link-underline text-foreground"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
