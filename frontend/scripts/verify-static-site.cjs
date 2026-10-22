const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Validate the exported site, not the React source: catch missing article pages,
// incorrect canonicals and navigation that Google cannot follow before deploying.
const root = path.resolve(__dirname, '..');
const origin = 'https://www.ott4future.com';
const siteName = 'On Time Technology Ltd';
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
  assert.deepEqual(meta.filter((a) => a.property === 'og:site_name').map((a) => a.content), [siteName], `Conflicting site name: ${url}`);
  assert.deepEqual(meta.filter((a) => a.name === 'application-name').map((a) => a.content), [siteName], `Conflicting application name: ${url}`);
  const robots = meta.filter((a) => a.name === 'robots');
  assert.equal(robots.length, 1, `Invalid robots count: ${url}`);
  assert.ok(!robots[0].content.includes('noindex'), `Sitemap includes a noindex page: ${url}`);
  pages.set(url, html);
  links.set(url, [...html.matchAll(/<a\b[^>]*>/g)].map((m) => attrs(m[0]).href).filter(Boolean).map((href) => new URL(href, url).href));
}

// Check the HTML Google receives, including the site-name signal that is
// separate from the blue title link. Valid markup expresses a preference;
// Google's selected search-result label cannot be guaranteed by this check.
const homeUrl = `${origin}/`;
const home = pages.get(homeUrl);
assert.ok(home, 'Canonical homepage missing from sitemap');
const homeSchemas = [...home.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const websites = homeSchemas.filter((schema) => schema['@type'] === 'WebSite');
const organizations = homeSchemas.filter((schema) => schema['@type'] === 'Organization');
assert.equal(websites.length, 1, 'Homepage must contain exactly one WebSite identity');
assert.equal(organizations.length, 1, 'Homepage must contain exactly one Organization identity');
assert.equal(websites[0].name, siteName, 'Incorrect preferred Google site name');
assert.equal(websites[0].url, homeUrl, 'WebSite must identify the canonical homepage');
assert.equal(websites[0]['@id'], `${homeUrl}#website`, 'Incorrect WebSite identity URL');
assert.equal(organizations[0]['@id'], `${homeUrl}#organization`, 'Incorrect Organization identity URL');
assert.equal(organizations[0].name, siteName, 'Organization and site names must agree');
assert.equal(organizations[0].legalName, siteName, 'Incorrect organization legal name');
assert.equal(websites[0].publisher?.['@id'], organizations[0]['@id'], 'WebSite must reference the publisher identity');
assert.ok(home.match(/<title\b[^>]*>([^<]*)<\/title>/)?.[1].startsWith(siteName), 'Homepage title must identify the company');
const bodyText = home.match(/<body\b[^>]*>([\s\S]*?)<\/body>/)?.[1].replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ');
assert.ok(bodyText?.includes(siteName), 'Preferred site name missing from visible homepage text');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'dist/manifest.json'), 'utf8'));
assert.equal(manifest.name, siteName, 'Manifest and site names must agree');

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

// Google Jobs requires one posting on a dedicated, crawlable page. Check the
// exported HTML so a valid-looking React component cannot ship an empty route.
const jobPages = [
  ['senior-ai-engineer', 'Senior AI Engineer', '2026-05-18'],
  ['react-developer', 'React Developer', '2026-05-18'],
  ['blockchain-engineer', 'Blockchain Engineer', '2026-05-18'],
  ['freelance-sales-manager-europe', 'Freelance Sales Manager', '2026-10-22'],
];
const readSchemas = (html) => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
const careersUrl = `${origin}/careers`;
assert.ok(!readSchemas(pages.get(careersUrl)).some((schema) => schema['@type'] === 'JobPosting'), 'The careers listing must not contain individual JobPosting markup');
for (const [slug, title, datePosted] of jobPages) {
  const url = `${careersUrl}/${slug}`;
  const html = pages.get(url);
  assert.ok(html, `Job missing from sitemap/export: ${url}`);
  assert.ok(links.get(careersUrl).includes(url), `Job must be linked from careers: ${url}`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `Missing/duplicate job H1: ${url}`);
  const schemas = readSchemas(html);
  const postings = schemas.filter((schema) => schema['@type'] === 'JobPosting');
  assert.equal(postings.length, 1, `Each job page needs exactly one JobPosting: ${url}`);
  const job = postings[0];
  assert.equal(job.title, title, `Incorrect job title: ${url}`);
  assert.equal(job.url, url, `Job URL must be its canonical page: ${url}`);
  assert.equal(job.hiringOrganization?.name, siteName, `Incorrect hiring organization: ${url}`);
  assert.equal(job.datePosted, datePosted, `Preserve the original publication date, not the build date: ${url}`);
  assert.ok(!job.validThrough, `Do not invent an expiry date for an open-ended role: ${url}`);
  assert.equal(job.employmentType, 'CONTRACTOR', `Incorrect contract type: ${url}`);
  assert.equal(job.jobLocationType, 'TELECOMMUTE', `Missing remote-work metadata: ${url}`);
  assert.equal(job.jobLocation?.address?.addressCountry, 'IE', `Missing optional Dublin work location: ${url}`);
  assert.ok(!JSON.stringify(job.applicantLocationRequirements || []).includes('Worldwide'), `Worldwide is not a country: ${url}`);
  assert.ok(schemas.some((schema) => schema['@type'] === 'BreadcrumbList' && schema.itemListElement?.at(-1)?.item === url), `Missing job breadcrumbs: ${url}`);
  const visible = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, '');
  assert.ok(visible.includes(title), `Missing visible role: ${url}`);
  assert.ok(job.description.includes('<p>') && job.description.includes('<li>'), `Job description needs readable HTML paragraphs and requirements: ${url}`);
  const decode = (text) => text.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
  const prose = [...job.description.matchAll(/<p>([\s\S]*?)<\/p>/g)].slice(0, 4).map((match) => decode(match[1]));
  const requirements = [...job.description.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((match) => decode(match[1]));
  assert.ok(requirements.length > 0, `Missing job requirements: ${url}`);
  for (const text of [...prose, ...requirements]) assert.ok(visible.includes(escape(text)), `Structured job content missing from visible page: ${url}: ${text}`);
  assert.ok(links.get(url).some((href) => {
    const apply = new URL(href);
    return apply.origin === origin && apply.pathname === '/careers' && apply.searchParams.get('role') === slug && !apply.hash;
  }), `Missing role-specific application link: ${url}`);
  assert.ok(links.get(url).some((href) => href.startsWith('mailto:info@ott4future.com?')), `Missing direct email application: ${url}`);
}
const salesUrl = `${careersUrl}/freelance-sales-manager-europe`;
assert.ok(links.get(homeUrl).includes(salesUrl), 'Homepage must link directly to the featured sales role');
assert.ok(home.includes('Freelance Sales Manager') && home.includes('European'), 'Homepage must promote the European sales opening');
const salesSchema = readSchemas(pages.get(salesUrl)).find((schema) => schema['@type'] === 'JobPosting');
assert.ok(salesSchema.description.includes('SmartTrust Protocol') && salesSchema.description.includes('Europe'), 'Sales posting must identify product and territory');
assert.ok(!salesSchema.description.includes('Competitive day-rates'), 'Do not apply engineering compensation promises to the sales role');
console.log(`Static site verified: ${urls.length} canonical pages, ${articles.length} complete articles, ${jobPages.length} dedicated job pages, all reachable through HTML links; site identity: ${siteName}.`);
