# Storage bucket spec — blog featured images

Not created yet. Create this once a real Supabase project exists (dashboard:
Storage → New bucket, or the SQL below).

| Setting | Value |
|---|---|
| Bucket name | `blog-images` |
| Public | **Yes** — read-only public access (matches how `/public/images/news-*.jpg` are served today: plain public URLs, no signing) |
| Allowed for `anon` / public role | `SELECT` (read) only |
| Allowed for `service_role` | `INSERT` / `UPDATE` / `DELETE` (uploads happen from the Supabase dashboard or a trusted admin tool, never from the site itself) |
| Suggested file size limit | 5 MB per file |
| Suggested MIME types | `image/jpeg`, `image/png`, `image/webp` |
| Path convention | `blog-images/<post-slug>/<filename>` — groups each post's images together and keys off the same `slug` used in `posts.slug` |

The public URL for an uploaded file (e.g. `blog-images/qu-est-ce-qu-un-holter-ecg/cover.jpg`)
is what gets stored in `posts.featured_image_url`.

## Equivalent SQL (optional, if you prefer scripting the bucket over the dashboard)

```sql
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

create policy "Public can read blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images');
```
