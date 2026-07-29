-- Create public.user_library table
CREATE TABLE IF NOT EXISTS public.user_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  book_id uuid REFERENCES public.books(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_book UNIQUE (user_id, book_id)
);

-- Enable RLS
ALTER TABLE public.user_library ENABLE ROW LEVEL SECURITY;

-- Grant access
GRANT SELECT ON public.user_library TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.user_library TO authenticated;
GRANT ALL ON public.user_library TO service_role;

-- RLS Policies
CREATE POLICY "Users can view their own library entries"
  ON public.user_library FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert their own library entries"
  ON public.user_library FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update library entries"
  ON public.user_library FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete library entries"
  ON public.user_library FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));


-- Create public.book_downloads table
CREATE TABLE IF NOT EXISTS public.book_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES public.books(id) ON DELETE CASCADE UNIQUE NOT NULL,
  download_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.book_downloads ENABLE ROW LEVEL SECURITY;

-- Grant access
GRANT SELECT ON public.book_downloads TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.book_downloads TO authenticated;
GRANT ALL ON public.book_downloads TO service_role;

-- Policies
CREATE POLICY "Users can view download links for books they own"
  ON public.book_downloads FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR
    EXISTS (
      SELECT 1 FROM public.user_library
      WHERE user_library.user_id = auth.uid()
      AND user_library.book_id = book_downloads.book_id
    )
  );

CREATE POLICY "Admins can manage download links"
  ON public.book_downloads FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
