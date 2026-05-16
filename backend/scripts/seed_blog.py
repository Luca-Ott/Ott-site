"""Seed the blog with an initial batch of AI-generated articles.

Run with:
    python /app/backend/scripts/seed_blog.py
"""

import asyncio
import json
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))

from server import (  # type: ignore
    generate_article_via_llm,
    write_articles_to_disk,
    db,
)


TOPICS = [
    {
        "topic": "How generative AI is reshaping enterprise software development in 2026 — agents, copilots, and the new engineering stack.",
        "category": "AI & Innovation",
    },
    {
        "topic": "Beyond fake news: building trust infrastructure for the post-truth internet with verifiable AI and provenance signals.",
        "category": "AI & Innovation",
    },
    {
        "topic": "Tokenising real-world commodities: how cargo, energy and metals are moving on-chain and what it means for global trade.",
        "category": "Web3 & FinTech",
    },
    {
        "topic": "The rise of modular escrow and OTC platforms: programmable trust as the next layer of digital commerce.",
        "category": "Web3 & FinTech",
    },
    {
        "topic": "Cyber resilience in the age of autonomous attackers: how IT companies must redesign defence for AI-driven threats.",
        "category": "Cyber Security",
    },
    {
        "topic": "From R&D lab to production: building a research-driven culture inside a modern software company.",
        "category": "R&D & Engineering",
    },
    {
        "topic": "Special projects as strategic R&D: why visionary side bets create the breakthroughs of the next decade.",
        "category": "Strategy & Vision",
    },
    {
        "topic": "Designing software that ages well: principles of long-lived, maintainable architectures for mission-critical systems.",
        "category": "Software Design",
    },
]


async def main() -> None:
    articles = []
    for i, t in enumerate(TOPICS):
        print(f"[{i+1}/{len(TOPICS)}] Generating: {t['topic'][:70]}...")
        try:
            art = await generate_article_via_llm(
                topic=t["topic"],
                category=t["category"],
                tone="corporate, futuristic, authoritative",
                index=i,
            )
            if i < 2:
                art["featured"] = True
            await db.blog_articles.update_one(
                {"slug": art["slug"]}, {"$set": art}, upsert=True
            )
            articles.append(art)
            print(f"   ✓ {art['title']}  →  /{art['slug']}")
        except Exception as e:
            print(f"   ✗ Failed: {e}")

    if articles:
        write_articles_to_disk(articles)
        print(f"\n✓ Wrote {len(articles)} articles to /app/frontend/public/blog/")
    else:
        print("\n✗ No articles generated.")


if __name__ == "__main__":
    asyncio.run(main())
