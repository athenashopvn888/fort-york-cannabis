from pathlib import Path
from PIL import Image

root_dir = Path(__file__).resolve().parent
source_path = root_dir / "public" / "brand" / "fort-york-logo.png"

sizes = [16, 32, 48, 64, 128, 180, 192, 512]
with Image.open(source_path) as img:
    img = img.convert("RGBA")
    for size in sizes:
        img.resize((size, size)).save(root_dir / f"favicon-{size}x{size}.png")
    img.resize((32, 32)).save(root_dir / "favicon.ico")
    img.resize((32, 32)).save(root_dir / "app" / "favicon.ico")
    img.resize((180, 180)).save(root_dir / "app" / "apple-icon.png")
