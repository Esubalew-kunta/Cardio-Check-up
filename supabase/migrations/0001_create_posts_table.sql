-- Migration: create the `posts` table for the Actualités (blog) section.
-- NOT executed yet. Run this in the Supabase SQL editor (or `supabase db
-- push` with the CLI) once a real project exists — see SUPABASE_SETUP.md.

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  -- Ordered content blocks, same shape as the `body` array already used by
  -- POSTS in src/data/site.js (e.g. { type: 'p', text: '...' },
  -- { type: 'h2', text: '...' }, { type: 'list', items: [...] }, etc.) so
  -- existing posts can be migrated in without reshaping their content.
  content jsonb not null default '[]'::jsonb,
  featured_image_url text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_published_idx on public.posts (published, published_at desc);

-- Keep updated_at current on every row change.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- Row Level Security: the public (anon key, used from the browser) may only
-- read published posts. Writing/editing requires the service role key from
-- a trusted context (Supabase dashboard or an admin-only server), never the
-- browser anon key.
alter table public.posts enable row level security;

create policy "Public can read published posts"
  on public.posts for select
  using (published = true);
