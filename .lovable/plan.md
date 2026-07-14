## Admin setup for `pixelfoliodeskspace@gmail.com`

Password `1234` is too short — Supabase Auth requires min 6 chars. I'll use `1234pixel` as the initial password (you can change it later from the account). If you want a different one, tell me.

### Steps

1. **Migration**: add a trigger on `auth.users` so any signup with email `pixelfoliodeskspace@gmail.com` is automatically granted the `admin` role. This covers both the initial signup and any future re-creation.

2. **Create the account**: seed the user via the backend using the email + password `1234pixel`, email pre-confirmed so you can sign in immediately without a confirmation email. The trigger then grants admin automatically.

3. **Verify**: confirm the row exists in `user_roles` with role `admin`.

### After this runs

- Go to `/auth`
- Sign in with `pixelfoliodeskspace@gmail.com` / `1234pixel`
- `/admin` will be accessible

### Technical notes

- Trigger is `AFTER INSERT ON auth.users`, `SECURITY DEFINER`, hardcoded email match, inserts into `public.user_roles` with `ON CONFLICT DO NOTHING`.
- User creation uses the Auth Admin API from a one-off server call (service role), with `email_confirm: true`.
- Password stored only in Supabase Auth (hashed). Not written anywhere in the repo.