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

export function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}
