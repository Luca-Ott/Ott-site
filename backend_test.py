"""
Backend test suite for ON TIME TECHNOLOGY API.

Focus: New AI blog endpoints (generate, generate-batch, list, get by slug).
Smoke-checks existing endpoints (health, company-info, contact, investor-inquiry).

Uses public URL from EXPO_PUBLIC_BACKEND_URL (frontend/.env), with /api prefix.
"""

import os
import re
import json
import sys
from pathlib import Path

import requests

FRONTEND_ENV = Path("/app/frontend/.env")
BACKEND_URL = None
if FRONTEND_ENV.exists():
    for line in FRONTEND_ENV.read_text().splitlines():
        if line.startswith("EXPO_PUBLIC_BACKEND_URL"):
            BACKEND_URL = line.split("=", 1)[1].strip().strip('"').strip("'")
            break

if not BACKEND_URL:
    print("ERROR: EXPO_PUBLIC_BACKEND_URL not found in frontend/.env")
    sys.exit(1)

API = BACKEND_URL.rstrip("/") + "/api"
BLOG_DIR = Path("/app/frontend/public/blog")

print(f"Testing against: {API}")
print("=" * 80)

results = []

def record(name, ok, detail=""):
    status = "PASS" if ok else "FAIL"
    results.append((name, ok, detail))
    print(f"[{status}] {name}")
    if detail:
        d = detail if len(detail) < 500 else detail[:500] + "...(truncated)"
        print(f"        {d}")


SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

REQUIRED_ARTICLE_FIELDS = {
    "id", "slug", "title", "excerpt", "content", "category",
    "tags", "read_time", "cover_gradient", "author", "published_at", "featured",
}


def test_health():
    try:
        r = requests.get(f"{API}/health", timeout=15)
        ok = r.status_code == 200 and r.json().get("status") == "healthy"
        record("GET /api/health", ok, f"status={r.status_code} body={r.text[:120]}")
    except Exception as e:
        record("GET /api/health", False, str(e))


def test_company_info():
    try:
        r = requests.get(f"{API}/company-info", timeout=15)
        data = r.json()
        ok = (
            r.status_code == 200
            and data.get("name") == "ON TIME TECHNOLOGY LTD"
            and len(data.get("services", [])) == 4
            and len(data.get("special_projects", [])) == 2
        )
        record("GET /api/company-info", ok, f"status={r.status_code}")
    except Exception as e:
        record("GET /api/company-info", False, str(e))


def test_contact():
    try:
        payload = {
            "name": "Alessandro Rossi",
            "email": "alessandro.rossi@futurevc.example",
            "message": "Interested in learning more about your R&D capabilities.",
            "form_type": "general",
        }
        r = requests.post(f"{API}/contact", json=payload, timeout=15)
        ok = r.status_code == 200 and r.json().get("status") == "success"
        record("POST /api/contact", ok, f"status={r.status_code} body={r.text[:160]}")
    except Exception as e:
        record("POST /api/contact", False, str(e))


def test_investor_inquiry():
    try:
        payload = {
            "company_name": "Helix Capital Partners",
            "name": "Elena",
            "surname": "Marchetti",
            "email": "elena.marchetti@helixcap.example",
            "phone": "+393331122334",
            "message": "Evaluating an allocation into NoMoreFakeNews. Please share the deck.",
        }
        r = requests.post(f"{API}/investor-inquiry", json=payload, timeout=15)
        ok = r.status_code == 200 and r.json().get("status") == "success"
        record("POST /api/investor-inquiry", ok, f"status={r.status_code} body={r.text[:160]}")
    except Exception as e:
        record("POST /api/investor-inquiry", False, str(e))


def validate_article_shape(article):
    errs = []
    missing = REQUIRED_ARTICLE_FIELDS - set(article.keys())
    if missing:
        errs.append(f"missing fields: {missing}")
    if not isinstance(article.get("tags"), list):
        errs.append("tags is not list")
    if not isinstance(article.get("cover_gradient"), list) or len(article.get("cover_gradient", [])) < 2:
        errs.append("cover_gradient invalid")
    if not isinstance(article.get("read_time"), int):
        errs.append("read_time not int")
    slug = article.get("slug", "")
    if not slug or not SLUG_RE.match(slug):
        errs.append(f"slug not URL-friendly: '{slug}'")
    if not article.get("title"):
        errs.append("title empty")
    if not article.get("content") or len(article.get("content", "")) < 200:
        errs.append(f"content too short: {len(article.get('content', ''))}")
    if not article.get("excerpt"):
        errs.append("excerpt empty")
    if not article.get("author"):
        errs.append("author empty")
    if not article.get("published_at"):
        errs.append("published_at empty")
    return (len(errs) == 0, errs)


GENERATED_SLUG = None


def test_blog_generate():
    global GENERATED_SLUG
    try:
        payload = {
            "topic": "Quantum-Safe Cryptography for Enterprise Data Vaults in 2026",
            "category": "Cybersecurity",
            "tone": "corporate, futuristic, authoritative",
        }
        r = requests.post(f"{API}/blog/generate", json=payload, timeout=180)
        if r.status_code != 200:
            record("POST /api/blog/generate", False, f"status={r.status_code} body={r.text[:400]}")
            return
        data = r.json()
        if data.get("status") != "success":
            record("POST /api/blog/generate", False, f"status field={data.get('status')} body={str(data)[:300]}")
            return
        article = data.get("article", {})
        ok, errs = validate_article_shape(article)
        if not ok:
            record("POST /api/blog/generate (shape)", False, "; ".join(errs))
            return
        GENERATED_SLUG = article["slug"]
        record(
            "POST /api/blog/generate",
            True,
            f"slug={article['slug']} title={article['title'][:60]} content_len={len(article['content'])}",
        )
    except Exception as e:
        record("POST /api/blog/generate", False, f"exception: {e}")


def test_blog_list_contains_generated():
    try:
        r = requests.get(f"{API}/blog/articles", timeout=30)
        if r.status_code != 200:
            record("GET /api/blog/articles", False, f"status={r.status_code}")
            return
        data = r.json()
        items = data.get("articles", [])
        if not isinstance(items, list) or len(items) == 0:
            record("GET /api/blog/articles", False, f"no articles returned: {str(data)[:200]}")
            return
        has_content_field = any("content" in i for i in items)
        sorted_ok = True
        try:
            pub_dates = [i.get("published_at", "") for i in items if i.get("published_at")]
            sorted_ok = pub_dates == sorted(pub_dates, reverse=True)
        except Exception:
            sorted_ok = True
        contains = (GENERATED_SLUG is None) or any(i.get("slug") == GENERATED_SLUG for i in items)
        ok = (not has_content_field) and contains and sorted_ok
        detail = f"count={len(items)} has_content_field={has_content_field} contains_generated={contains} sorted_desc={sorted_ok}"
        record("GET /api/blog/articles", ok, detail)
    except Exception as e:
        record("GET /api/blog/articles", False, str(e))


def test_blog_get_by_slug():
    slug = GENERATED_SLUG
    if not slug:
        existing = [p.stem for p in BLOG_DIR.glob("*.json") if p.stem != "articles"]
        slug = existing[0] if existing else None
    if not slug:
        record("GET /api/blog/articles/{slug}", False, "no slug available to test")
        return
    try:
        r = requests.get(f"{API}/blog/articles/{slug}", timeout=30)
        if r.status_code != 200:
            record("GET /api/blog/articles/{slug}", False, f"status={r.status_code} body={r.text[:200]}")
            return
        article = r.json()
        ok, errs = validate_article_shape(article)
        record(
            "GET /api/blog/articles/{slug}",
            ok,
            f"slug={slug} " + ("ok" if ok else "; ".join(errs)),
        )
    except Exception as e:
        record("GET /api/blog/articles/{slug}", False, str(e))


def test_blog_get_404():
    try:
        r = requests.get(f"{API}/blog/articles/this-slug-definitely-does-not-exist-xyz-12345", timeout=15)
        ok = r.status_code == 404
        record("GET /api/blog/articles/{unknown} -> 404", ok, f"status={r.status_code}")
    except Exception as e:
        record("GET /api/blog/articles/{unknown} -> 404", False, str(e))


BATCH_SLUGS = []


def test_blog_generate_batch():
    global BATCH_SLUGS
    try:
        payload = [
            {"topic": "AI Agents Orchestrating Multi-Cloud Cost Optimisation", "category": "AI & Innovation"},
            {"topic": "Zero-Knowledge Identity Layers for Financial KYC", "category": "Web3 & Fintech"},
        ]
        r = requests.post(f"{API}/blog/generate-batch", json=payload, timeout=300)
        if r.status_code != 200:
            record("POST /api/blog/generate-batch", False, f"status={r.status_code} body={r.text[:400]}")
            return
        data = r.json()
        ok_resp = (
            data.get("status") == "success"
            and data.get("count") == 2
            and isinstance(data.get("slugs"), list)
            and len(data["slugs"]) == 2
        )
        if not ok_resp:
            record("POST /api/blog/generate-batch", False, f"resp={str(data)[:300]}")
            return
        BATCH_SLUGS = data["slugs"]
        missing_files = []
        for s in BATCH_SLUGS:
            if not (BLOG_DIR / f"{s}.json").exists():
                missing_files.append(s)
        index_file = BLOG_DIR / "articles.json"
        index_ok = index_file.exists()
        in_index = False
        if index_ok:
            try:
                idx_data = json.loads(index_file.read_text())
                idx_slugs = {a.get("slug") for a in idx_data}
                in_index = all(s in idx_slugs for s in BATCH_SLUGS)
            except Exception:
                in_index = False
        ok = (not missing_files) and index_ok and in_index
        record(
            "POST /api/blog/generate-batch",
            ok,
            f"slugs={BATCH_SLUGS} missing_files={missing_files} index_ok={index_ok} in_index={in_index}",
        )
    except Exception as e:
        record("POST /api/blog/generate-batch", False, f"exception: {e}")


def test_batch_articles_retrievable():
    if not BATCH_SLUGS:
        record("Batch articles retrievable via GET", False, "no batch slugs to verify")
        return
    all_ok = True
    details = []
    for s in BATCH_SLUGS:
        try:
            r = requests.get(f"{API}/blog/articles/{s}", timeout=20)
            if r.status_code != 200:
                all_ok = False
                details.append(f"{s}:status={r.status_code}")
                continue
            article = r.json()
            ok, errs = validate_article_shape(article)
            if not ok:
                all_ok = False
                details.append(f"{s}:{errs}")
            else:
                details.append(f"{s}:ok")
        except Exception as e:
            all_ok = False
            details.append(f"{s}:exc={e}")
    record("Batch articles retrievable via GET", all_ok, "; ".join(details))


if __name__ == "__main__":
    test_health()
    test_company_info()
    test_contact()
    test_investor_inquiry()

    test_blog_generate()
    test_blog_list_contains_generated()
    test_blog_get_by_slug()
    test_blog_get_404()
    test_blog_generate_batch()
    test_batch_articles_retrievable()

    print("=" * 80)
    total = len(results)
    passed = sum(1 for _, ok, _ in results if ok)
    failed = total - passed
    print(f"RESULTS: {passed}/{total} passed, {failed} failed")
    if failed:
        print("\nFailed tests:")
        for name, ok, detail in results:
            if not ok:
                print(f"  - {name}: {detail}")
    sys.exit(0 if failed == 0 else 1)
