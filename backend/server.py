from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from typing import Optional, List
import os
import json
import re
import uuid
import asyncio
from pathlib import Path
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Emergent AI integration
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv()

EMERGENT_LLM_KEY = os.getenv("EMERGENT_LLM_KEY", "")
BLOG_OUTPUT_DIR = Path(__file__).parent.parent / "frontend" / "public" / "blog"
BLOG_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="ON TIME TECHNOLOGY API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client.ott_database

# Pydantic models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str
    form_type: str = "general"  # general or investor
    company_name: Optional[str] = None
    phone: Optional[str] = None
    created_at: Optional[datetime] = None

class InvestorInquiry(BaseModel):
    company_name: str
    name: str
    surname: str
    email: EmailStr
    phone: str
    message: str
    created_at: Optional[datetime] = None


class BlogGenerateRequest(BaseModel):
    topic: str
    category: str = "AI & Innovation"
    tone: str = "corporate, futuristic, authoritative"


class BlogArticle(BaseModel):
    id: str
    slug: str
    title: str
    excerpt: str
    content: str
    category: str
    tags: List[str]
    read_time: int
    cover_gradient: List[str]
    author: str
    published_at: str
    featured: bool = False

@app.get("/")
async def root():
    return {"message": "ON TIME TECHNOLOGY API", "status": "running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@app.post("/api/contact")
async def submit_contact_form(form: ContactForm):
    try:
        form.created_at = datetime.utcnow()
        result = await db.contacts.insert_one(form.dict())
        return {
            "message": "Contact form submitted successfully",
            "id": str(result.inserted_id),
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting form: {str(e)}")

@app.post("/api/investor-inquiry")
async def submit_investor_inquiry(inquiry: InvestorInquiry):
    try:
        inquiry.created_at = datetime.utcnow()
        result = await db.investor_inquiries.insert_one(inquiry.dict())
        return {
            "message": "Investor inquiry submitted successfully",
            "id": str(result.inserted_id),
            "status": "success",
            "note": "Our team will contact you shortly at luca@ott4fututre.com"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting inquiry: {str(e)}")

@app.get("/api/company-info")
async def get_company_info():
    return {
        "name": "ON TIME TECHNOLOGY LTD",
        "tagline": "Information Technology Company - SW Engineering - SW Development",
        "address": "The Black Church - St Mary's Place, Dublin, D07 P4AX, Ireland",
        "email": "Info@ott4future.com",
        "phone": "+447775682831",
        "logo_url": "https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68",
        "services": [
            {
                "title": "Software Design",
                "description": "Innovative software design solutions tailored to your business needs"
            },
            {
                "title": "Software Development",
                "description": "Custom software development with cutting-edge technologies"
            },
            {
                "title": "R&D",
                "description": "Research and development for next-generation solutions"
            },
            {
                "title": "Special Projects",
                "description": "Unique and innovative projects tackling real-world challenges"
            }
        ],
        "special_projects": [
            {
                "name": "NoMoreFakeNews",
                "description": "An innovative project in development designed to combat fake news and misinformation. Our solution aims to identify, flag, and eventually eliminate fake news through advanced AI and verification technologies.",
                "status": "In Development",
                "investor_contact": True
            },
            {
                "name": "Custodiy",
                "description": "A modular platform designed to empower individuals and businesses. Whether you're an entrepreneur establishing a marketplace, a seller expanding reach, or an organization facilitating OTC transactions and fundraising, Custodiy provides the tools and support needed.",
                "features": [
                    "OTC Service for token trading",
                    "Escrow Service via smart contracts",
                    "Marketplace for products and services",
                    "Secure document storage and management"
                ],
                "website": "https://custodiy.com",
                "logo": "https://custodiy.com/static/media/custodiy.cf5be9dd4c6daac32193.png"
            }
        ]
    }

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")[:80]


def parse_json_from_text(text: str) -> dict:
    """Extract JSON object from LLM response (handles ```json fences and stray prose)."""
    text = text.strip()
    # Try fenced code block first
    fence_match = re.search(r"```(?:json)?\s*(\{[\s\S]*?\})\s*```", text)
    if fence_match:
        candidate = fence_match.group(1)
    else:
        # Find first { and last }
        start = text.find("{")
        end = text.rfind("}")
        if start == -1 or end == -1:
            raise ValueError("No JSON object found in LLM response")
        candidate = text[start : end + 1]
    return json.loads(candidate)


COVER_GRADIENTS = [
    ["#7C3AED", "#2563EB", "#06B6D4"],
    ["#0EA5E9", "#6366F1", "#8B5CF6"],
    ["#F472B6", "#A855F7", "#3B82F6"],
    ["#10B981", "#06B6D4", "#3B82F6"],
    ["#F59E0B", "#EF4444", "#8B5CF6"],
    ["#22D3EE", "#3B82F6", "#0F172A"],
    ["#A855F7", "#EC4899", "#F97316"],
    ["#06B6D4", "#3B82F6", "#1E1B4B"],
]


async def generate_article_via_llm(topic: str, category: str, tone: str, index: int = 0) -> dict:
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="EMERGENT_LLM_KEY is not configured")

    system_prompt = (
        "You are the senior technology editor for ON TIME TECHNOLOGY LTD, a UK-based IT company specialising "
        "in Software Design, Software Development, R&D, and innovative special projects (NoMoreFakeNews, "
        "Custodiy, Freety). You write authoritative, forward-looking corporate blog articles for an executive "
        "and investor audience. Tone: futuristic, sharp, professional, slightly visionary. Avoid fluff and "
        "marketing clichés. Use British English. Each article must be self-contained and SEO friendly. "
        "Always return ONLY a single valid JSON object — no commentary, no markdown fences."
    )

    user_prompt = f"""Write a long-form blog article on the following topic.

TOPIC: {topic}
CATEGORY: {category}
TONE: {tone}

Return STRICTLY a JSON object with this exact schema:
{{
  "title": "Compelling, specific headline, max 90 chars",
  "excerpt": "1-2 sentence hook, max 200 chars",
  "content": "Full article in clean Markdown. 700-1100 words. Use ## subheadings, short paragraphs, occasional bullet lists. Open with a strong intro, then 3-4 sections, then a forward-looking conclusion. Do NOT include the H1 title (it will be rendered separately). Do NOT include images. End with a sentence connecting back to ON TIME TECHNOLOGY's vision.",
  "tags": ["3 to 5 short lowercase tags"],
  "read_time": 6,
  "category": "{category}"
}}

Critical: output MUST be parseable JSON. No prose outside the JSON."""

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"blog-gen-{uuid.uuid4()}",
        system_message=system_prompt,
    ).with_model("openai", "gpt-5.1")

    response = await chat.send_message(UserMessage(text=user_prompt))
    data = parse_json_from_text(response)

    title = data.get("title", topic).strip()
    slug = slugify(title) or slugify(topic) or f"article-{uuid.uuid4().hex[:8]}"
    gradient = COVER_GRADIENTS[index % len(COVER_GRADIENTS)]

    article = {
        "id": str(uuid.uuid4()),
        "slug": slug,
        "title": title,
        "excerpt": data.get("excerpt", "").strip(),
        "content": data.get("content", "").strip(),
        "category": data.get("category", category),
        "tags": data.get("tags", [])[:5],
        "read_time": int(data.get("read_time", 6)),
        "cover_gradient": gradient,
        "author": "On Time Technology Editorial",
        "published_at": datetime.utcnow().isoformat() + "Z",
        "featured": False,
    }
    return article


def write_articles_to_disk(articles: List[dict]) -> None:
    """Persist articles as static JSON for the frontend (bundled with Vercel export)."""
    BLOG_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    index_payload = [
        {
            "id": a["id"],
            "slug": a["slug"],
            "title": a["title"],
            "excerpt": a["excerpt"],
            "category": a["category"],
            "tags": a["tags"],
            "read_time": a["read_time"],
            "cover_gradient": a["cover_gradient"],
            "author": a["author"],
            "published_at": a["published_at"],
            "featured": a.get("featured", False),
        }
        for a in articles
    ]
    (BLOG_OUTPUT_DIR / "articles.json").write_text(
        json.dumps(index_payload, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    for a in articles:
        (BLOG_OUTPUT_DIR / f"{a['slug']}.json").write_text(
            json.dumps(a, indent=2, ensure_ascii=False), encoding="utf-8"
        )


@app.post("/api/blog/generate")
async def generate_blog_article(req: BlogGenerateRequest):
    try:
        article = await generate_article_via_llm(req.topic, req.category, req.tone)
        await db.blog_articles.update_one(
            {"slug": article["slug"]}, {"$set": article}, upsert=True
        )
        return {"status": "success", "article": article}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM generation failed: {str(e)}")


@app.post("/api/blog/generate-batch")
async def generate_blog_batch(topics: List[dict]):
    """topics: [{"topic": "...", "category": "..."}, ...] — generates, stores in DB and writes static JSON."""
    try:
        articles: List[dict] = []
        for i, t in enumerate(topics):
            art = await generate_article_via_llm(
                t.get("topic", "Future of Technology"),
                t.get("category", "AI & Innovation"),
                t.get("tone", "corporate, futuristic, authoritative"),
                index=i,
            )
            if i < 2:
                art["featured"] = True
            await db.blog_articles.update_one(
                {"slug": art["slug"]}, {"$set": art}, upsert=True
            )
            articles.append(art)
        write_articles_to_disk(articles)
        return {"status": "success", "count": len(articles), "slugs": [a["slug"] for a in articles]}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch generation failed: {str(e)}")


@app.get("/api/blog/articles")
async def list_articles():
    cursor = db.blog_articles.find({}, {"_id": 0, "content": 0}).sort("published_at", -1)
    items = await cursor.to_list(length=200)
    return {"articles": items}


@app.get("/api/blog/articles/{slug}")
async def get_article(slug: str):
    article = await db.blog_articles.find_one({"slug": slug}, {"_id": 0})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)