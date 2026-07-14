import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Grain } from "@/components/grain";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center paper-bg px-4">
      <div className="max-w-md text-center">
        <div className="font-display text-[9rem] leading-none tracking-tighter text-foreground/90">404</div>
        <h2 className="mt-2 font-display text-2xl">Not in the library</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for isn't shelved here.
        </p>
        <div className="mt-8">
          <a href="/" className="btn-ink">Return home</a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center paper-bg px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something slipped</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Try again, or head back to the collection.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-ink"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Notestalgia — Premium AI Notes & Digital Resources" },
      {
        name: "description",
        content:
          "A quiet library of premium AI notes, guides and digital resources. Editorial, retro, and made for learners.",
      },
      { name: "author", content: "Notestalgia" },
      { name: "theme-color", content: "#FFFDF8" },
      { property: "og:title", content: "Notestalgia — Premium AI Notes & Digital Resources" },
      {
        property: "og:description",
        content: "A quiet library of premium AI notes, guides and digital resources. Editorial, retro, and made for learners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Notestalgia — Premium AI Notes & Digital Resources" },
      { name: "twitter:description", content: "A quiet library of premium AI notes, guides and digital resources. Editorial, retro, and made for learners." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2b50cd3a-728a-4734-bac7-5c66eee47fa2/id-preview-281acd25--819b4988-dca4-4e4b-b922-117e4a4c49ba.lovable.app-1784003854658.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2b50cd3a-728a-4734-bac7-5c66eee47fa2/id-preview-281acd25--819b4988-dca4-4e4b-b922-117e4a4c49ba.lovable.app-1784003854658.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen text-foreground">
        <Grain />
        <SiteNav />
        <main className="pt-16">
          <Outlet />
        </main>
        <SiteFooter />
        <Toaster position="top-center" richColors closeButton />
      </div>
    </QueryClientProvider>
  );
}
