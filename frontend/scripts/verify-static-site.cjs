const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Validate the exported site, not the React source: catch missing article pages,
// incorrect canonicals and navigation that Google cannot follow before deploying.
const root = path.resolve(__dirname, '..');
const origin = 'https://www.ott4future.com';
const sitemap = fs.readFileSync(path.join(root, 'dist/sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
const pages = new Map();
const links = new Map();
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');

for (const url of urls) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, origin, `Non-canonical sitemap host: ${url}`);
  const relative = parsed.pathname.slice(1);
  const file = [path.join(root, 'dist', `${relative}.html`), path.join(root, 'dist', relative, 'index.html')].find((candidate) => fs.existsSync(candidate));
  assert.ok(file, `Missing exported page (would return 404): ${url}`);
  const html = fs.readFileSync(file, 'utf8');
  const canonicals = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attrs(m[0])).filter((a) => a.rel === 'canonical');
  assert.deepEqual(canonicals.map((a) => a.href), [url], `Invalid canonical: ${url}`);
  assert.equal([...html.matchAll(/<title\b[^>]*>/g)].length, 1, `Invalid title count: ${url}`);
  const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attrs(m[0]));
  assert.equal(meta.filter((a) => a.name === 'description' && a.content).length, 1, `Missing/duplicate description: ${url}`);
  const robots = meta.filter((a) => a.name === 'robots');
  assert.equal(robots.length, 1, `Invalid robots count: ${url}`);
  assert.ok(!robots[0].content.includes('noindex'), `Sitemap includes a noindex page: ${url}`);
  pages.set(url, html);
  links.set(url, [...html.matchAll(/<a\b[^>]*>/g)].map((m) => attrs(m[0]).href).filter(Boolean).map((href) => new URL(href, url).href));
}

const visited = new Set();
const queue = [`${origin}/`];
while (queue.length) {
  const url = queue.shift();
  if (visited.has(url)) continue;
  visited.add(url);
  for (const link of links.get(url) || []) if (pages.has(link) && !visited.has(link)) queue.push(link);
}
for (const url of urls) assert.ok(visited.has(url), `Page cannot be reached through HTML links: ${url}`);

const articles = JSON.parse(fs.readFileSync(path.join(root, 'public/blog/articles.json'), 'utf8'));
for (const summary of articles) {
  const url = `${origin}/blog/${summary.slug}`;
  assert.ok(pages.has(url), `Article missing from sitemap: ${url}`);
  const html = pages.get(url);
  const article = JSON.parse(fs.readFileSync(path.join(root, `public/blog/${summary.slug}.json`), 'utf8'));
  assert.ok(html.includes(escape(article.title)), `Missing rendered article title: ${url}`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `Missing/duplicate article H1: ${url}`);
  assert.ok(!html.includes('Loading article') && !html.includes('Article not found.'), `Article exported as loading/error: ${url}`);
  const visibleText = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ');
  assert.ok(visibleText.split(/\s+/).length >= article.content.split(/\s+/).length * 0.8, `Article body missing from initial HTML: ${url}`);
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  assert.ok(schemas.some((s) => s['@type'] === 'Article' && s.headline === article.title), `Article metadata missing: ${url}`);
  assert.ok(links.get(`${origin}/blog`).includes(url), `Article not linked from blog: ${url}`);
}

for (const pathname of ['careers', 'special-projects', 'software-design', 'ai-act-compliance', 'blog']) {
  assert.equal([...pages.get(`${origin}/${pathname}`).matchAll(/<h1\b/g)].length, 1, `Missing/duplicate page H1: ${pathname}`);
}
console.log(`Static site verified: ${urls.length} canonical pages, ${articles.length} complete articles, all reachable through HTML links.`);
