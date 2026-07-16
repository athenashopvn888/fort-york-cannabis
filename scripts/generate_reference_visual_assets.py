from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
BRAND.mkdir(parents=True, exist_ok=True)

INK = (6, 15, 27)
NAVY = (8, 28, 45)
HARBOUR = (10, 59, 70)
TEAL = (35, 178, 169)
AQUA = (118, 222, 213)
COPPER = (198, 132, 68)
GOLD = (226, 184, 108)
MIST = (242, 247, 246)
PLUM = (67, 42, 82)
HERB = (65, 114, 58)
LIME = (130, 166, 76)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def save(img: Image.Image, name: str, quality: int = 88) -> None:
    img.convert("RGB").save(BRAND / name, "WEBP", quality=quality, method=6)


def gradient(size: tuple[int, int], top: tuple[int, int, int], bottom: tuple[int, int, int]) -> Image.Image:
    w, h = size
    img = Image.new("RGB", size)
    px = img.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        row = tuple(int(top[i] * (1 - t) + bottom[i] * t) for i in range(3))
        for x in range(w):
            px[x, y] = row
    return img


def add_noise(img: Image.Image, amount: int = 18, seed: int = 10) -> Image.Image:
    rnd = random.Random(seed)
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    px = overlay.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            if rnd.random() < 0.05:
                v = rnd.randint(-amount, amount)
                px[x, y] = (255, 255, 255, max(0, v)) if v > 0 else (0, 0, 0, abs(v))
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def draw_bokeh(draw: ImageDraw.ImageDraw, size: tuple[int, int], seed: int, palette: list[tuple[int, int, int]]) -> None:
    rnd = random.Random(seed)
    w, h = size
    for _ in range(85):
        r = rnd.randint(10, 60)
        x = rnd.randint(-r, w + r)
        y = rnd.randint(-r, h + r)
        c = rnd.choice(palette)
        a = rnd.randint(14, 58)
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(*c, a))


def draw_skyline(draw: ImageDraw.ImageDraw, w: int, h: int, y_base: int, alpha: int = 75) -> None:
    rnd = random.Random(81)
    x = 0
    while x < w:
        bw = rnd.randint(36, 92)
        bh = rnd.randint(90, 310)
        col = (14, 42, 58, alpha)
        draw.rectangle((x, y_base - bh, x + bw, y_base), fill=col, outline=(71, 140, 146, alpha // 2))
        for wy in range(y_base - bh + 16, y_base - 10, 32):
            if rnd.random() < 0.55:
                draw.line((x + 10, wy, x + bw - 10, wy), fill=(218, 169, 100, alpha // 3), width=1)
        x += bw + rnd.randint(5, 16)
    tower_x = int(w * 0.68)
    draw.line((tower_x, y_base - 380, tower_x, y_base + 6), fill=(178, 212, 212, alpha), width=4)
    draw.ellipse((tower_x - 30, y_base - 280, tower_x + 30, y_base - 266), outline=(226, 184, 108, alpha), width=3)


def draw_waterfront(draw: ImageDraw.ImageDraw, w: int, h: int, y: int, alpha: int = 70) -> None:
    for i in range(16):
        yy = y + i * 13
        draw.line((0, yy, w, yy), fill=(42, 183, 169, max(12, alpha - i * 3)), width=1)
    for x in range(0, w, 90):
        draw.line((x, y - 4, x + 60, y - 4), fill=(226, 184, 108, alpha // 2), width=1)


def draw_retail_shelves(draw: ImageDraw.ImageDraw, w: int, h: int, x0: int, y0: int, width: int, height: int, seed: int) -> None:
    rnd = random.Random(seed)
    draw.rounded_rectangle((x0, y0, x0 + width, y0 + height), radius=12, fill=(4, 10, 17, 105), outline=(242, 211, 168, 62), width=2)
    rows = 3
    for row in range(rows):
        y = y0 + 60 + row * (height - 100) // rows
        draw.line((x0 + 28, y, x0 + width - 28, y), fill=(226, 184, 108, 88), width=2)
        for i in range(8):
            cx = x0 + 52 + i * (width - 110) // 7 + rnd.randint(-8, 8)
            jar_w = rnd.randint(28, 46)
            jar_h = rnd.randint(44, 74)
            draw.rounded_rectangle((cx, y - jar_h, cx + jar_w, y), radius=8, fill=(225, 240, 235, 34), outline=(220, 238, 232, 74), width=1)
            draw.rectangle((cx + 4, y - jar_h + 8, cx + jar_w - 4, y - jar_h + 17), fill=(42, 183, 169, 92))


def draw_bud(draw: ImageDraw.ImageDraw, cx: int, cy: int, scale: float, seed: int, alpha: int = 255) -> None:
    rnd = random.Random(seed)
    for i in range(210):
        ang = rnd.random() * math.tau
        dist = (rnd.random() ** 0.58) * 54 * scale
        rx = cx + math.cos(ang) * dist * 0.9
        ry = cy + math.sin(ang) * dist * 1.18
        r = rnd.uniform(4.0, 10.0) * scale
        base = rnd.choice([HERB, (78, 125, 62), (88, 93, 58), (119, 92, 56), (102, 70, 94)])
        col = tuple(max(0, min(255, base[j] + rnd.randint(-22, 22))) for j in range(3))
        draw.ellipse((rx - r, ry - r * 0.72, rx + r, ry + r * 0.72), fill=(*col, alpha))
        if rnd.random() < 0.18:
            draw.line((rx, ry, rx + rnd.randint(-12, 12) * scale, ry + rnd.randint(-10, 10) * scale), fill=(218, 126, 57, alpha), width=max(1, int(2 * scale)))
    for _ in range(30):
        x = cx + rnd.randint(int(-45 * scale), int(45 * scale))
        y = cy + rnd.randint(int(-55 * scale), int(55 * scale))
        draw.ellipse((x - 1, y - 1, x + 1, y + 1), fill=(230, 235, 182, alpha))


def rounded_panel(img: Image.Image, box: tuple[int, int, int, int], radius: int, fill: tuple[int, int, int, int], outline=None) -> None:
    ImageDraw.Draw(img).rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=2 if outline else 1)


def hero_image(size: tuple[int, int], variant: str) -> Image.Image:
    w, h = size
    img = gradient(size, (8, 18, 31), (5, 34, 42))
    img = add_noise(img, 12, 72)
    glow = Image.new("RGBA", size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow, "RGBA")
    draw_bokeh(gd, size, 32, [TEAL, GOLD, COPPER, AQUA])
    gd.rectangle((0, int(h * 0.52), w, h), fill=(3, 18, 24, 92))
    draw_skyline(gd, w, h, int(h * 0.68), 78)
    draw_waterfront(gd, w, h, int(h * 0.78), 95)
    if variant == "home":
        draw_retail_shelves(gd, w, h, int(w * 0.54), int(h * 0.18), int(w * 0.36), int(h * 0.45), 11)
        for i, (x, y, s) in enumerate([(int(w * 0.70), int(h * 0.64), 1.25), (int(w * 0.82), int(h * 0.58), 1.0), (int(w * 0.61), int(h * 0.62), 0.85)]):
            draw_bud(gd, x, y, s, 120 + i, 210)
    else:
        draw_retail_shelves(gd, w, h, int(w * 0.50), int(h * 0.16), int(w * 0.39), int(h * 0.50), 21)
        gd.rounded_rectangle((int(w * 0.10), int(h * 0.18), int(w * 0.37), int(h * 0.40)), radius=10, fill=(242, 247, 246, 30), outline=(226, 184, 108, 90), width=2)
        gd.text((int(w * 0.13), int(h * 0.25)), "38 FORT YORK", font=font(max(30, w // 40), True), fill=(242, 247, 246, 190))
        for i, (x, y, s) in enumerate([(int(w * 0.73), int(h * 0.62), 1.1), (int(w * 0.84), int(h * 0.60), 0.9)]):
            draw_bud(gd, x, y, s, 220 + i, 200)
    img = Image.alpha_composite(img.convert("RGBA"), glow)
    vignette = Image.new("RGBA", size, (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette, "RGBA")
    for i in range(18):
        vd.rectangle((i * 8, i * 8, w - i * 8, h - i * 8), outline=(0, 0, 0, max(2, 32 - i * 2)), width=8)
    return Image.alpha_composite(img, vignette).filter(ImageFilter.UnsharpMask(radius=1.2, percent=110, threshold=3))


def category_base(size: tuple[int, int], seed: int, accent: tuple[int, int, int]) -> Image.Image:
    w, h = size
    img = gradient(size, (238, 244, 240), (212, 226, 222))
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer, "RGBA")
    rnd = random.Random(seed)
    d.rounded_rectangle((28, 28, w - 28, h - 28), radius=22, fill=(255, 255, 255, 128), outline=(*accent, 74), width=2)
    for _ in range(30):
        r = rnd.randint(20, 100)
        x = rnd.randint(-20, w)
        y = rnd.randint(-20, h)
        d.ellipse((x - r, y - r, x + r, y + r), fill=(*accent, rnd.randint(12, 35)))
    d.rectangle((0, int(h * 0.65), w, h), fill=(5, 18, 25, 52))
    return Image.alpha_composite(img.convert("RGBA"), layer)


def product_shadow(d: ImageDraw.ImageDraw, cx: int, cy: int, rx: int, ry: int) -> None:
    d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=(0, 0, 0, 36))


def category_image(kind: str, size: tuple[int, int] = (900, 560)) -> Image.Image:
    accents = {
        "flower": HERB,
        "pre-rolls": COPPER,
        "vapes": TEAL,
        "edibles": (206, 88, 96),
        "concentrates": GOLD,
        "accessories": HARBOUR,
    }
    seed = sum(ord(c) for c in kind)
    img = category_base(size, seed, accents[kind])
    d = ImageDraw.Draw(img, "RGBA")
    w, h = size
    product_shadow(d, int(w * 0.55), int(h * 0.79), int(w * 0.28), 34)
    if kind == "flower":
        draw_bud(d, int(w * 0.40), int(h * 0.50), 1.75, 3)
        draw_bud(d, int(w * 0.58), int(h * 0.48), 1.28, 4)
        draw_bud(d, int(w * 0.68), int(h * 0.60), 1.05, 5)
    elif kind == "pre-rolls":
        for i in range(5):
            x = int(w * 0.34) + i * 58
            y = int(h * 0.35) + i * 12
            d.polygon([(x, y), (x + 330, y + 78), (x + 330, y + 110), (x, y + 34)], fill=(236, 225, 194, 255), outline=(184, 128, 74, 180))
            d.rectangle((x + 300, y + 74, x + 338, y + 112), fill=(219, 178, 118, 230))
        d.rounded_rectangle((int(w * 0.28), int(h * 0.66), int(w * 0.78), int(h * 0.75)), radius=16, fill=(6, 20, 30, 210), outline=(226, 184, 108, 130), width=2)
    elif kind == "vapes":
        colors = [TEAL, (38, 52, 68), COPPER, (228, 232, 230)]
        for i, c in enumerate(colors):
            x = int(w * 0.36) + i * 80
            d.rounded_rectangle((x, int(h * 0.26), x + 44, int(h * 0.76)), radius=18, fill=(*c, 245), outline=(255, 255, 255, 120), width=2)
            d.rectangle((x + 11, int(h * 0.21), x + 33, int(h * 0.29)), fill=(35, 42, 48, 255))
            d.rounded_rectangle((x + 8, int(h * 0.42), x + 36, int(h * 0.51)), radius=8, fill=(255, 255, 255, 62))
    elif kind == "edibles":
        colors = [(222, 84, 94), (238, 166, 62), (78, 174, 120), (116, 90, 168), (222, 206, 83)]
        for row in range(3):
            for col in range(5):
                x = int(w * 0.30) + col * 74 + (row % 2) * 22
                y = int(h * 0.30) + row * 64
                d.rounded_rectangle((x, y, x + 52, y + 42), radius=16, fill=(*colors[(row + col) % len(colors)], 245), outline=(255, 255, 255, 160), width=2)
        d.rounded_rectangle((int(w * 0.56), int(h * 0.56), int(w * 0.78), int(h * 0.72)), radius=12, fill=(91, 55, 39, 230))
        for i in range(4):
            d.line((int(w * 0.57), int(h * 0.59) + i * 20, int(w * 0.77), int(h * 0.59) + i * 20), fill=(166, 112, 74, 150), width=2)
    elif kind == "concentrates":
        d.ellipse((int(w * 0.33), int(h * 0.38), int(w * 0.72), int(h * 0.74)), fill=(18, 32, 39, 238), outline=(255, 255, 255, 120), width=4)
        d.ellipse((int(w * 0.38), int(h * 0.43), int(w * 0.67), int(h * 0.68)), fill=(235, 242, 238, 235), outline=(226, 184, 108, 140), width=3)
        for i in range(24):
            x = int(w * 0.45) + random.Random(i).randint(0, 110)
            y = int(h * 0.48) + random.Random(i + 22).randint(0, 70)
            d.ellipse((x, y, x + 28, y + 16), fill=(230, 169, 44, 210), outline=(255, 219, 109, 160))
    elif kind == "accessories":
        d.ellipse((int(w * 0.26), int(h * 0.36), int(w * 0.54), int(h * 0.70)), fill=(35, 49, 55, 245), outline=(226, 184, 108, 130), width=4)
        d.ellipse((int(w * 0.31), int(h * 0.42), int(w * 0.49), int(h * 0.62)), fill=(72, 88, 92, 235), outline=(255, 255, 255, 90), width=2)
        d.rounded_rectangle((int(w * 0.54), int(h * 0.38), int(w * 0.77), int(h * 0.46)), radius=12, fill=(7, 18, 31, 240), outline=(42, 183, 169, 150), width=2)
        d.rounded_rectangle((int(w * 0.57), int(h * 0.48), int(w * 0.76), int(h * 0.56)), radius=12, fill=(201, 135, 70, 235))
        d.line((int(w * 0.62), int(h * 0.30), int(w * 0.78), int(h * 0.72)), fill=(230, 230, 220, 230), width=10)
    d.rectangle((0, int(h * 0.74), w, h), fill=(5, 15, 25, 72))
    return img.filter(ImageFilter.UnsharpMask(radius=1.1, percent=120, threshold=3))


def support_banner(size: tuple[int, int], title: str, seed: int, mode: str) -> Image.Image:
    w, h = size
    img = gradient(size, (8, 18, 31), (10, 61, 70))
    img = add_noise(img, 10, seed)
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer, "RGBA")
    draw_bokeh(d, size, seed + 10, [TEAL, GOLD, COPPER])
    draw_skyline(d, w, h, int(h * 0.78), 70)
    draw_waterfront(d, w, h, int(h * 0.82), 80)
    if mode == "contact":
        d.rounded_rectangle((int(w * 0.58), int(h * 0.18), int(w * 0.88), int(h * 0.68)), radius=16, fill=(242, 247, 246, 34), outline=(226, 184, 108, 90), width=2)
        d.text((int(w * 0.62), int(h * 0.33)), "38", font=font(int(h * 0.18), True), fill=(242, 247, 246, 210))
        d.text((int(w * 0.62), int(h * 0.53)), "FORT YORK BLVD", font=font(int(h * 0.055), True), fill=(226, 184, 108, 210))
    elif mode == "faq":
        for i in range(4):
            x0 = int(w * 0.55)
            y0 = int(h * 0.20) + i * int(h * 0.13)
            d.rounded_rectangle((x0, y0, int(w * 0.88), y0 + int(h * 0.08)), radius=12, fill=(242, 247, 246, 28), outline=(42, 183, 169, 72), width=1)
    elif mode == "delivery":
        for i, label in enumerate(["MENU", "PICKUP", "DETAILS"]):
            x = int(w * 0.52) + i * int(w * 0.13)
            d.rounded_rectangle((x, int(h * 0.42), x + int(w * 0.11), int(h * 0.58)), radius=14, fill=(242, 247, 246, 32), outline=(42, 183, 169, 95), width=2)
            d.text((x + 18, int(h * 0.47)), label, font=font(max(14, int(h * 0.035)), True), fill=(242, 247, 246, 205))
    d.rounded_rectangle((int(w * 0.07), int(h * 0.24), int(w * 0.46), int(h * 0.66)), radius=14, fill=(3, 10, 18, 138), outline=(226, 184, 108, 110), width=2)
    d.text((int(w * 0.10), int(h * 0.35)), title, font=font(max(24, int(h * 0.11)), True), fill=(242, 247, 246, 225))
    return Image.alpha_composite(img.convert("RGBA"), layer).filter(ImageFilter.UnsharpMask(radius=1.1, percent=105, threshold=3))


def local_area(size: tuple[int, int]) -> Image.Image:
    w, h = size
    img = gradient(size, (232, 241, 239), (201, 224, 222))
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer, "RGBA")
    for i in range(8):
        y = int(h * 0.22) + i * 50
        d.line((0, y, w, y + random.Random(i).randint(-20, 20)), fill=(42, 183, 169, 70), width=4)
    draw_skyline(d, w, h, int(h * 0.56), 96)
    draw_waterfront(d, w, h, int(h * 0.64), 120)
    d.rounded_rectangle((int(w * 0.08), int(h * 0.12), int(w * 0.46), int(h * 0.34)), radius=14, fill=(7, 18, 31, 188), outline=(226, 184, 108, 125), width=2)
    d.text((int(w * 0.11), int(h * 0.18)), "FORT YORK", font=font(max(30, int(h * 0.07)), True), fill=(242, 247, 246, 230))
    d.text((int(w * 0.11), int(h * 0.27)), "CITYPLACE / WATERFRONT", font=font(max(14, int(h * 0.026)), True), fill=(226, 184, 108, 220))
    d.ellipse((int(w * 0.72) - 26, int(h * 0.52) - 26, int(w * 0.72) + 26, int(h * 0.52) + 26), fill=(201, 135, 70, 220), outline=(255, 255, 255, 180), width=4)
    d.line((int(w * 0.72), int(h * 0.52) + 24, int(w * 0.72), int(h * 0.72)), fill=(201, 135, 70, 190), width=5)
    return Image.alpha_composite(img.convert("RGBA"), layer).filter(ImageFilter.UnsharpMask(radius=1.1, percent=110, threshold=3))


def og_image() -> Image.Image:
    img = hero_image((1200, 630), "home")
    d = ImageDraw.Draw(img, "RGBA")
    d.rectangle((0, 0, 1200, 630), fill=(3, 10, 18, 80))
    d.rounded_rectangle((72, 96, 720, 454), radius=18, fill=(3, 10, 18, 158), outline=(226, 184, 108, 135), width=3)
    d.text((112, 150), "FORT YORK", font=font(72, True), fill=(242, 247, 246, 245))
    d.text((112, 230), "CANNABIS", font=font(72, True), fill=(226, 184, 108, 245))
    d.text((116, 335), "Cannabis Store Near Fort York & CityPlace", font=font(30, True), fill=(236, 246, 245, 226))
    d.text((116, 388), "38 Fort York Blvd, Toronto", font=font(24, True), fill=(118, 222, 213, 226))
    return img


def main() -> None:
    save(hero_image((1920, 1040), "home"), "hero-home-desktop.webp")
    save(hero_image((900, 1200), "home"), "hero-home-mobile.webp")
    save(hero_image((1600, 900), "gbp"), "hero-gbp-landing-desktop.webp")
    save(hero_image((900, 1100), "gbp"), "hero-gbp-landing-mobile.webp")
    for kind, name in [
        ("flower", "category-flower.webp"),
        ("pre-rolls", "category-pre-rolls.webp"),
        ("vapes", "category-vapes.webp"),
        ("edibles", "category-edibles.webp"),
        ("concentrates", "category-concentrates.webp"),
        ("accessories", "category-accessories.webp"),
    ]:
        save(category_image(kind), name)
    save(support_banner((1400, 560), "FAQ", 41, "faq"), "faq-info-banner.webp")
    save(support_banner((1400, 560), "ORDERING", 45, "delivery"), "delivery-ordering-banner.webp")
    save(local_area((1200, 760)), "local-area-waterfront.webp")
    save(support_banner((1200, 600), "VISIT", 51, "contact"), "visit-cta-banner.webp")
    save(og_image(), "og-fort-york-cannabis.webp")
    print("Generated Fort York reference-driven visual assets in", BRAND)


if __name__ == "__main__":
    main()
