"""ことのき's icons and its picture for links, drawn from the apps' own icons and the sisters' type.

    python scripts/make-images.py        (Pillow)

Writes src/app/icon.png (512, transparent corners), src/app/apple-icon.png (180, a full square: iOS rounds it), and
src/app/opengraph-image.png (1200 x 630, shown where the page is shared). The icon is a stand-in, 木 in the wordmark's
mincho: the apps' icons are pictures their maker chose (ことのみ's and ことのかげ's are still their own stand-ins), and
ことのき has none yet. The type (Google Fonts' repository, OFL) is fetched once into scripts/.fonts/, which git leaves
out.
"""

import pathlib
import urllib.request

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
APP_DIR = ROOT / "src" / "app"
FONTS = ROOT / "scripts" / ".fonts"
SOURCES = {
    "ShipporiMincho-Bold.ttf": "shipporimincho/ShipporiMincho-Bold.ttf",
    "IBMPlexSansJP-Medium.ttf": "ibmplexsansjp/IBMPlexSansJP-Medium.ttf",
}
# The sisters' colours (src/app/globals.css).
PAPER = (252, 251, 248)
INK = (23, 32, 51)
INK_2 = (59, 69, 88)
MUTED = (92, 101, 120)
LINE = (228, 231, 236)
ACCENT = (10, 100, 240)
# In the order of src/content/apps.ts (the tree as it grows), with their names.
APPS = [
    ("kotonoame", "ことのあめ"),
    ("kotonome", "ことのめ"),
    ("kotonoha", "ことのは"),
    ("kotonoeda", "ことのえだ"),
    ("kotonomi", "ことのみ"),
    ("kotonooto", "ことのおと"),
    ("kotonokage", "ことのかげ"),
    ("kotonone", "ことのね"),
]
NAME = "ことのき"
KANJI = "言の木"
LEAD = "外国語を「使う言葉」にしていく、8つのアプリ。"


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    path = FONTS / name
    if not path.exists():
        url = f"https://raw.githubusercontent.com/google/fonts/main/ofl/{SOURCES[name]}"
        FONTS.mkdir(parents=True, exist_ok=True)
        try:
            urllib.request.urlretrieve(url, path)
        except OSError as error:
            raise SystemExit(f"could not fetch {name} ({error}); save {url} as {path} and run again") from error
    return ImageFont.truetype(str(path), size)


def centred(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, face, fill) -> None:
    """`text` with its ink (not its line box) in the middle of `box`."""
    left, top, right, bottom = draw.textbbox((0, 0), text, font=face)
    x = box[0] + (box[2] - box[0] - (right - left)) / 2 - left
    y = box[1] + (box[3] - box[1] - (bottom - top)) / 2 - top
    draw.text((x, y), text, font=face, fill=fill)


def icon(size: int, rounded: bool) -> Image.Image:
    # Drawn four times larger and brought down, so the edges stay smooth.
    big = size * 4
    image = Image.new("RGBA", (big, big), (0, 0, 0, 0) if rounded else PAPER + (255,))
    draw = ImageDraw.Draw(image)
    if rounded:
        draw.rounded_rectangle((0, 0, big - 1, big - 1), radius=big * 0.22, fill=PAPER + (255,), outline=LINE + (255,), width=big // 64)
    centred(draw, (0, 0, big, big), "木", font("ShipporiMincho-Bold.ttf", int(big * 0.66)), ACCENT + (255,))
    return image.resize((size, size), Image.LANCZOS)


def share() -> Image.Image:
    width, height, margin = 1200, 630, 88
    image = Image.new("RGB", (width, height), PAPER)
    draw = ImageDraw.Draw(image)

    mincho = font("ShipporiMincho-Bold.ttf", 88)
    draw.text((margin, 78), NAME, font=mincho, fill=INK)
    name_right = draw.textbbox((margin, 78), NAME, font=mincho)[2]
    draw.text((name_right + 24, 120), KANJI, font=font("ShipporiMincho-Bold.ttf", 30), fill=MUTED)
    draw.text((margin, 214), LEAD, font=font("IBMPlexSansJP-Medium.ttf", 38), fill=INK_2)

    # The icons in a row, each with its name under it: as large as the row has room for, up to 128.
    side = min(128, (width - 2 * margin - (len(APPS) - 1) * 24) // len(APPS))
    gap = (width - 2 * margin - len(APPS) * side) / (len(APPS) - 1)
    top = 340
    label = font("ShipporiMincho-Bold.ttf", 21)
    for i, (app_id, name) in enumerate(APPS):
        x = round(margin + i * (side + gap))
        picture = Image.open(ROOT / "public" / "apps" / f"{app_id}.png").convert("RGBA").resize((side, side), Image.LANCZOS)
        image.paste(picture, (x, top), picture)
        centred(draw, (x - 20, top + side + 14, x + side + 20, top + side + 44), name, label, MUTED)

    draw.line((margin, height - 40, width - margin, height - 40), fill=LINE, width=2)
    return image


def main() -> None:
    icon(512, rounded=True).save(APP_DIR / "icon.png")
    icon(180, rounded=False).convert("RGB").save(APP_DIR / "apple-icon.png")
    share().save(APP_DIR / "opengraph-image.png")
    (APP_DIR / "opengraph-image.alt.txt").write_text(
        f"{NAME}（{KANJI}）。{LEAD}" + "、".join(name for _, name in APPS) + "のアイコン。", encoding="utf-8"
    )
    print("wrote icon.png, apple-icon.png, opengraph-image.png")


if __name__ == "__main__":
    main()
