"""Rebuild /app/frontend/public/blog/articles.json from individual article JSON files.
Run after manual edits, restored backups, or when the index is out of sync.
"""

import json
from pathlib import Path

BLOG_DIR = Path("/app/frontend/public/blog")


def main() -> None:
    files = sorted(BLOG_DIR.glob("*.json"))
    articles = []
    for f in files:
        if f.name == "articles.json":
            continue
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
        except Exception as e:
            print(f"skip {f.name}: {e}")
            continue
        articles.append({
            "id": data.get("id", f.stem),
            "slug": data.get("slug", f.stem),
            "title": data["title"],
            "excerpt": data.get("excerpt", ""),
            "category": data.get("category", "Insights"),
            "tags": data.get("tags", []),
            "read_time": int(data.get("read_time", 6)),
            "cover_gradient": data.get("cover_gradient", ["#3B82F6", "#A855F7", "#22D3EE"]),
            "author": data.get("author", "On Time Technology Editorial"),
            "published_at": data.get("published_at", ""),
            "featured": data.get("featured", False),
        })
    # newest first
    articles.sort(key=lambda a: a["published_at"], reverse=True)
    # mark first 2 as featured if none are
    if not any(a["featured"] for a in articles):
        for a in articles[:2]:
            a["featured"] = True
    (BLOG_DIR / "articles.json").write_text(
        json.dumps(articles, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print(f"\u2713 rebuilt articles.json with {len(articles)} entries")
    for a in articles:
        print(f"   - {a['slug']}  ({a['category']})  featured={a['featured']}")


if __name__ == "__main__":
    main()
