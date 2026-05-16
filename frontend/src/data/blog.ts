import { Platform } from 'react-native';
import articlesIndex from '../../public/blog/articles.json';

export type ArticleSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  read_time: number;
  cover_gradient: string[];
  author: string;
  published_at: string;
  featured?: boolean;
};

export type FullArticle = ArticleSummary & { content: string };

export function getAllArticles(): ArticleSummary[] {
  // articles.json is bundled at build-time; sort newest first
  return [...(articlesIndex as ArticleSummary[])].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export function getFeaturedArticles(): ArticleSummary[] {
  const all = getAllArticles();
  const featured = all.filter((a) => a.featured);
  return featured.length > 0 ? featured : all.slice(0, 2);
}

// Use require with explicit literal path so Metro can statically resolve each JSON.
// We try several known slugs lazily; otherwise fallback to fetching the JSON file via /blog/{slug}.json (static path).
const getBaseUrl = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') return window.location.origin;
  return process.env.EXPO_PUBLIC_BACKEND_URL || '';
};

export async function getArticleBySlug(slug: string): Promise<FullArticle | null> {
  try {
    const url = `${getBaseUrl()}/blog/${encodeURIComponent(slug)}.json`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as FullArticle;
  } catch {
    return null;
  }
}

export function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}
