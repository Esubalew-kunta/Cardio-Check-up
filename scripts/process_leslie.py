"""Web-optimise Dr Leslie Berdah Sadaoui's portrait.

The client supplied a final image that already has a clean warm backdrop
("Dr. Leslie Berdah Sadaoui.png"), so no background removal is needed — we just
flatten any alpha onto the image's own backdrop colour, downscale and compress
to a web JPG. (An earlier version of this script removed a concrete-wall
background with rembg; kept here for reference if a raw photo is supplied again.)
"""
from PIL import Image

SRC = 'Dr. Leslie Berdah Sadaoui.png'
OUT = 'public/images/leslie-berdah-sadaoui.jpg'

im = Image.open(SRC).convert('RGBA')
W, H = im.size

# Flatten onto the picture's own backdrop (sampled from a corner) so a JPG
# conversion never introduces a black or white halo where alpha is present.
r, g, b, a = im.getpixel((4, 4))
flat = (r, g, b) if a > 200 else (0xEA, 0xE4, 0xDB)
bg = Image.new('RGB', (W, H), flat)
bg.paste(im, mask=im.split()[3])

# Web-friendly size.
maxw = 1000
if W > maxw:
    bg = bg.resize((maxw, round(H * maxw / W)), Image.LANCZOS)

bg.save(OUT, quality=90, subsampling=0, progressive=True)
print('saved', OUT, bg.size)
