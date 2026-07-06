import { supabase, isSupabaseConfigured } from './supabaseClient.js'
import { getPosts as getStaticPosts, getPost as getStaticPost } from '../data/site.js'

// Not called from anywhere yet — Actualites.jsx, Article.jsx and
// BlogPreview.jsx still import getPosts/getPost directly from
// data/site.js. This is the drop-in replacement for that, to switch to
// once a Supabase project is live (see SUPABASE_SETUP.md, final step).

// Maps a `posts` row to the same shape the rest of the site already expects
// from the static POSTS array (see ArticleCard.jsx, Article.jsx). `category`,
// `author` and `readingMin` aren't columns on this table yet (the requested
// schema only covers title/slug/content/excerpt/image/published/timestamps),
// so they default to null here rather than throwing — see the "Notes" section
// in SUPABASE_SETUP.md before relying on them post-swap.
function mapRow(row) {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.content,
    cover: row.featured_image_url,
    coverAlt: row.title,
    date: row.published_at,
    category: row.category ?? null,
    author: row.author ?? null,
    readingMin: row.reading_min ?? null,
  }
}

export async function getPosts() {
  if (!isSupabaseConfigured) return getStaticPosts()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('[blogRepository] getPosts failed, falling back to static data:', error)
    return getStaticPosts()
  }
  return data.map(mapRow)
}

export async function getPostBySlug(slug) {
  if (!isSupabaseConfigured) return getStaticPost(slug)

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) {
    console.error('[blogRepository] getPostBySlug failed, falling back to static data:', error)
    return getStaticPost(slug)
  }
  return data ? mapRow(data) : getStaticPost(slug)
}
