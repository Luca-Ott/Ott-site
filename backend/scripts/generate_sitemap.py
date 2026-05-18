"""Generate /app/frontend/public/sitemap.xml from a fixed list of static routes
plus every article slug found in /app/frontend/public/blog/.

Run after content changes:
    python /app/backend/scripts/generate_sitemap.py
"""

import json
from datetime import datetime
from pathlib import Path

SITE = "https://www.ott4future.com"
PUBLIC = Path("/app/frontend/public")
BLOG_DIR = PUBLIC / "blog"
OUT = PUBLIC / "sitemap.xml"


STATIC_ROUTES = [
    # (path, priority, changefreq)
    ("/", "1.0", "weekly"),
    ("/about", "0.8", "monthly"),
    ("/contact", "0.7", "monthly"),
    ("/special-projects", "0.9", "weekly"),
    ("/freety", "0.9", "weekly"),
    ("/nomorefakenews", "0.9", "weekly"),
    ("/ai-act-compliance", "0.9", "monthly"),
    ("/software-design", "0.8", "monthly"),
    ("/software-development", "0.8", "monthly"),
    ("/research-development", "0.8", "monthly"),
    ("/investor-inquiry", "0.7", "monthly"),
    ("/blog", "0.9", "daily"),
    ("/resources", "0.7", "monthly"),
]


def main() -> None:
    today = datetime.utcnow().strftime("%Y-%m-%d")
    urls = []

    for path, priority, freq in STATIC_ROUTES:
        urls.append(
            f"  <url>\n"
            f"    <loc>{SITE}{path}</loc>\n"
            f"    <lastmod>{today}</lastmod>\n"
            f"    <changefreq>{freq}</changefreq>\n"
            f"    <priority>{priority}</priority>\n"
            f"  </url>"
        )

    # Add blog articles
    if BLOG_DIR.exists():
        for f in sorted(BLOG_DIR.glob("*.json")):
            if f.name == "articles.json":
                continue
            try:
                data = json.loads(f.read_text(encoding="utf-8"))
            except Exception:
                continue
            slug = data.get("slug") or f.stem
            published = data.get("published_at", "")[:10] or today
            urls.append(
                f"  <url>\n"
                f"    <loc>{SITE}/blog/{slug}</loc>\n"
                f"    <lastmod>{published}</lastmod>\n"
                f"    <changefreq>monthly</changefreq>\n"
                f"    <priority>0.7</priority>\n"
                f"  </url>"
            )

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(urls)
        + "\n</urlset>\n"
    )
    OUT.write_text(xml, encoding="utf-8")
    print(f"\u2713 wrote {OUT} with {len(urls)} URLs")


if __name__ == "__main__":
    main()
