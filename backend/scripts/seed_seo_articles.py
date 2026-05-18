"""Generate a fresh batch of SEO-targeted articles aligned with the cluster
keyword strategy (EU AI Act, fake news / deepfake, custodial wallet IE,
tokenised commodities, Irish AI company).

Usage:
    python /app/backend/scripts/seed_seo_articles.py
"""

import asyncio
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
        "topic": "EU AI Act compliance checklist for Irish startups in 2026: classification, high-risk requirements, AI sandbox in Ireland and proportional obligations for SMEs. Include practical engineering steps.",
        "category": "AI Act Compliance",
    },
    {
        "topic": "High-risk AI system requirements under the EU AI Act: risk management, data governance, technical documentation, transparency, human oversight, accuracy and cybersecurity \u2014 how to demonstrate conformity in Ireland.",
        "category": "AI Act Compliance",
    },
    {
        "topic": "How to perform an EU AI Act gap analysis on an existing AI product: a 7-step methodology for product managers, engineering leads and compliance teams.",
        "category": "AI Act Compliance",
    },
    {
        "topic": "Deepfake detection AI in 2026: how multimodal models, watermarking and provenance signals (C2PA, content credentials) combine to combat synthetic media at scale.",
        "category": "AI Fake News",
    },
    {
        "topic": "How an AI fake news detector actually works under the hood: classification pipelines, source-credibility graphs, retrieval-augmented verification and human-in-the-loop review \u2014 lessons from building NoMoreFakeNews.",
        "category": "AI Fake News",
    },
    {
        "topic": "Custodial wallet in Ireland: MiCA, CASP licensing and AML/KYC obligations for institutional crypto custody providers in 2026. What technical architecture choices matter and what changes for Irish startups.",
        "category": "Web3 & FinTech",
    },
    {
        "topic": "Tokenised commodities trading in 2026: how cargo, energy and metals are moving on-chain, the role of AI in price discovery and counterparty risk, and the regulatory posture across the EU.",
        "category": "Web3 & FinTech",
    },
    {
        "topic": "Why Dublin is becoming a hub for Irish AI software companies: the talent pool, EU AI Act sandboxes, R&D tax credits and the founders building the next decade of European AI.",
        "category": "Company & Ireland",
    },
]


async def main() -> None:
    articles = []
    for i, t in enumerate(TOPICS):
        print(f"[{i+1}/{len(TOPICS)}] Generating: {t['topic'][:80]}...")
        try:
            art = await generate_article_via_llm(
                topic=t["topic"],
                category=t["category"],
                tone="corporate, authoritative, technically precise, practical for engineering teams",
                index=i,
            )
            await db.blog_articles.update_one(
                {"slug": art["slug"]}, {"$set": art}, upsert=True
            )
            articles.append(art)
            print(f"   \u2713 {art['title']}  \u2192  /{art['slug']}")
        except Exception as e:
            print(f"   \u2717 Failed: {e}")

    if articles:
        write_articles_to_disk(articles)
        print(f"\n\u2713 Wrote {len(articles)} SEO articles. Index rebuilt with full catalogue.")
    else:
        print("\n\u2717 No articles generated.")


if __name__ == "__main__":
    asyncio.run(main())
