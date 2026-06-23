"""Optimise the two secretary studio photos for the web (resize + compress).
Backgrounds are already clean, so no processing is needed — just sizing."""
from PIL import Image

JOBS = [
    ('Ghita.jpeg', 'public/images/ghita.jpg'),
    ('Maymouna.jpeg', 'public/images/maymouna.jpg'),
]
TARGET_W = 760

for src, out in JOBS:
    im = Image.open(src).convert('RGB')
    w, h = im.size
    if w > TARGET_W:
        im = im.resize((TARGET_W, round(h * TARGET_W / w)), Image.LANCZOS)
    im.save(out, quality=86, subsampling=1, progressive=True)
    print('saved', out, im.size)
