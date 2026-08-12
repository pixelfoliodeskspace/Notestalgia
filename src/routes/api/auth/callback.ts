import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        
        // Forward all query parameters (code, state, errors) to Supabase's callback
        const supabaseUrl = new URL("https://zuhblihcnwtyoaeedcnb.supabase.co/auth/v1/callback");
        url.searchParams.forEach((value, key) => {
          supabaseUrl.searchParams.set(key, value);
        });

        // 302 redirect Google's response back to Supabase
        return new Response(null, {
          status: 302,
          headers: {
            Location: supabaseUrl.toString(),
          },
        });
      },
    },
  },
});
