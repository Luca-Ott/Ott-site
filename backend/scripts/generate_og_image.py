"""
Generate a futuristic Open Graph image for On Time Technology.
Saves a 1200x630 JPEG at /app/frontend/public/og-image.jpg.

Theme matches the site:
 - Deep space dark gradient (blue -> purple)
 - Twinkling stars
 - Soft neon orbit + atmospheric glow
 - Large brand title with gradient highlight
 - Subtitle + meta badge (IRELAND · DUBLIN · AI · R&D)
 - OTT logo (downloaded from CDN)
"""

from __future__ import annotations

import io
import math
import os
import random
import urllib.request

from PIL import Image, ImageDraw, ImageFilter, ImageFont

# -------- Config --------------------------------------------------------------

W, H = 1200, 630
OUT = "/app/frontend/public/og-image.jpg"
LOGO_URL = (
    "https://assets.mywebsite-editor.com/user/"
    "e54dca75-a95e-43bb-ac7f-e04a22ca9584/"
    "402f4cab-f3db-457d-9e4f-21ffd3914a68"
)

FONT_BOLD = "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf"
FONT_REG = "/usr/share/fonts/truetype/freefont/FreeSans.ttf"


# -------- Helpers -------------------------------------------------------------

def lerp(a, b, t):
    return int(a + (b - a) * t)


def mix(c1, c2, t):
    return (lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t))


def radial_gradient(size, center, inner_color, outer_color, max_radius):
    """Build a radial gradient image."""
    w, h = size
    img = Image.new("RGB", size, outer_color)
    px = img.load()
    cx, cy = center
    for y in range(h):
        for x in range(w):
            d = math.hypot(x - cx, y - cy) / max_radius
            d = min(max(d, 0.0), 1.0)
            px[x, y] = mix(inner_color, outer_color, d)
    return img


def linear_v(size, top_color, bottom_color):
    w, h = size
    img = Image.new("RGB", size, top_color)
    px = img.load()
    for y in range(h):
        t = y / (h - 1)
        c = mix(top_color, bottom_color, t)
        for x in range(w):
            px[x, y] = c
    return img


def add_stars(img: Image.Image, n=180, seed=42):
    rnd = random.Random(seed)
    draw = ImageDraw.Draw(img, "RGBA")
    for _ in range(n):
        x = rnd.randint(0, W - 1)
        y = rnd.randint(0, H - 1)
        size = rnd.choice([1, 1, 1, 2, 2, 3])
        alpha = rnd.randint(120, 240)
        c = (224, 242, 254, alpha)
        if size == 1:
            draw.point((x, y), fill=c)
        else:
            draw.ellipse([x - size, y - size, x + size, y + size], fill=c)
    return img


def add_orbit_glow(img: Image.Image):
    """A soft cyan/purple atmospheric blob on the right side."""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    cx, cy = int(W * 0.83), int(H * 0.55)
    od.ellipse([cx - 320, cy - 320, cx + 320, cy + 320], fill=(96, 165, 250, 50))
    od.ellipse([cx - 220, cy - 220, cx + 220, cy + 220], fill=(168, 85, 247, 70))
    od.ellipse([cx - 130, cy - 130, cx + 130, cy + 130], fill=(34, 211, 238, 90))
    overlay = overlay.filter(ImageFilter.GaussianBlur(50))
    img.paste(overlay, (0, 0), overlay)

    # Two thin orbit ellipses
    draw = ImageDraw.Draw(img, "RGBA")
    for r, a in [(280, 70), (200, 100), (120, 140)]:
        bbox = [cx - r * 1.4, cy - r * 0.6, cx + r * 1.4, cy + r * 0.6]
        draw.ellipse(bbox, outline=(96, 165, 250, a), width=2)
    return img


def fit_logo(logo_bytes: bytes, target_h: int) -> Image.Image:
    try:
        logo = Image.open(io.BytesIO(logo_bytes)).convert("RGBA")
    except Exception:
        return None
    ratio = target_h / logo.height
    new_size = (int(logo.width * ratio), target_h)
    return logo.resize(new_size, Image.LANCZOS)


def gradient_text(draw, base_img, text, xy, font, colors):
    """Draw text with a horizontal linear gradient between the given colors."""
    # First render a mask of the text
    text_mask = Image.new("L", base_img.size, 0)
    md = ImageDraw.Draw(text_mask)
    md.text(xy, text, font=font, fill=255)

    # Build a gradient strip
    grad = Image.new("RGB", base_img.size, colors[0])
    px = grad.load()
    bbox = font.getbbox(text)
    text_w = bbox[2] - bbox[0]
    x0 = xy[0]
    for x in range(base_img.size[0]):
        t = max(0.0, min(1.0, (x - x0) / max(1, text_w)))
        col = colors[int(t * (len(colors) - 1))]
        next_col = colors[min(len(colors) - 1, int(t * (len(colors) - 1)) + 1)]
        sub = (t * (len(colors) - 1)) - int(t * (len(colors) - 1))
        col = mix(col, next_col, sub)
        for y in range(base_img.size[1]):
            px[x, y] = col

    # Composite the gradient using the mask
    base_img.paste(grad, (0, 0), text_mask)


# -------- Build --------------------------------------------------------------

def build():
    # 1) Background — dark space radial + vertical
    bg = linear_v((W, H), (8, 10, 24), (3, 4, 12))
    glow = radial_gradient((W, H), (int(W * 0.18), int(H * 0.35)), (28, 38, 96), (4, 5, 18), 700)
    bg = Image.blend(bg, glow, 0.55)

    add_stars(bg, n=220, seed=11)
    add_orbit_glow(bg)

    # 2) Logo
    try:
        with urllib.request.urlopen(LOGO_URL, timeout=10) as r:
            logo_bytes = r.read()
        logo = fit_logo(logo_bytes, 110)
    except Exception as e:
        print("Logo download failed:", e)
        logo = None

    if logo is not None:
        bg.paste(logo, (60, 60), logo)

    # Brand line next to logo
    draw = ImageDraw.Draw(bg, "RGBA")
    font_brand = ImageFont.truetype(FONT_BOLD, 30)
    font_tag = ImageFont.truetype(FONT_REG, 18)
    draw.text((190, 70), "ON TIME TECHNOLOGY", font=font_brand, fill=(248, 250, 252, 255))
    draw.text((190, 110), "Irish AI software house · Dublin", font=font_tag, fill=(148, 163, 184, 255))

    # 3) Eyebrow pill
    font_eyebrow = ImageFont.truetype(FONT_BOLD, 18)
    pill_text = "  AI  ·  R&D  ·  SPECIAL PROJECTS  "
    pw = font_eyebrow.getlength(pill_text)
    px0, py0 = 60, 230
    draw.rounded_rectangle(
        [px0, py0, px0 + pw + 30, py0 + 42],
        radius=22,
        outline=(34, 211, 238, 140),
        width=2,
        fill=(34, 211, 238, 35),
    )
    draw.ellipse([px0 + 16, py0 + 17, px0 + 24, py0 + 25], fill=(34, 211, 238, 255))
    draw.text((px0 + 32, py0 + 10), pill_text.strip(), font=font_eyebrow, fill=(186, 230, 253, 255))

    # 4) Main title — bigger, fewer words
    font_title = ImageFont.truetype(FONT_BOLD, 86)
    title_line1 = "Building the digital"
    title_line2 = "infrastructure of tomorrow"

    draw.text((60, 300), title_line1, font=font_title, fill=(248, 250, 252, 255))

    # Gradient on line 2
    gradient_text(
        draw,
        bg,
        title_line2,
        (60, 400),
        font_title,
        [(96, 165, 250), (168, 85, 247), (34, 211, 238)],
    )

    # 5) URL bottom-left
    font_url = ImageFont.truetype(FONT_BOLD, 28)
    draw.text((60, 540), "ott4future.com", font=font_url, fill=(96, 165, 250, 255))

    # Subtle bottom-right corner accent
    draw.rectangle([W - 4, 0, W, H], fill=(34, 211, 238, 200))

    # 7) Save as JPEG (X requires < 5MB, JPEG/PNG)
    bg.convert("RGB").save(OUT, format="JPEG", quality=88, optimize=True)
    print(f"Wrote {OUT}  ({os.path.getsize(OUT)/1024:.1f} KB)")


if __name__ == "__main__":
    build()
