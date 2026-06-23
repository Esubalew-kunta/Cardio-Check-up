"""Replace Dr Leslie Berdah Sadaoui's concrete-wall background with a warm cream
studio backdrop (#EDE8E0 -> #D8D2C8), preserving hair edges via alpha matting."""
from rembg import remove, new_session
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

SRC = 'Dr Leslie Berdah Sadaoui.jpeg'
OUT = 'public/images/leslie-berdah-sadaoui.jpg'

img = Image.open(SRC).convert('RGB')
W0, H0 = img.size
# 0) Trim the dark/teal frame bars on the edges so they can't contaminate the
#    matte (they were leaving a blue fringe on the white coat and a dark blob up
#    top). Conservative crop — her shoulders still reach the edges.
lr = round(W0 * 0.018)
top = round(H0 * 0.025)
img = img.crop((lr, top, W0 - lr, H0))
W, H = img.size

# 1) Cut out the subject. Alpha matting + a firmer erode give clean, faithful
#    hair edges without a coloured halo.
session = new_session('isnet-general-use')
cut = remove(
    img,
    session=session,
    alpha_matting=True,
    alpha_matting_foreground_threshold=250,
    alpha_matting_background_threshold=20,
    alpha_matting_erode_size=24,
    post_process_mask=True,
)

# 1b) Colour decontamination — strip the cool/purple fringe the old teal
#     background left on the coat and cardigan edges. Skin stays warm (b < g),
#     so neither pass touches it.
arr = np.array(cut).astype(np.int16)
r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
mx_rg = np.maximum(r, g)
blue = b > mx_rg + 6                       # blue spill
purple = (r > g + 6) & (b > g + 6)         # magenta/purple fringe
arr[..., 2] = np.where(blue, mx_rg, b)      # pull blue down
g2 = g
arr[..., 0] = np.where(purple, np.minimum(r, g2 + 10), r)
arr[..., 2] = np.where(purple, np.minimum(arr[..., 2], g2 + 10), arr[..., 2])
cut = Image.fromarray(np.clip(arr, 0, 255).astype('uint8'), 'RGBA')

# 2) Warm cream vertical gradient backdrop.
top = (0xED, 0xE8, 0xE0)
bot = (0xD8, 0xD2, 0xC8)
col = Image.new('RGB', (1, H))
for y in range(H):
    t = y / max(1, H - 1)
    col.putpixel((0, y), tuple(round(top[i] + (bot[i] - top[i]) * t) for i in range(3)))
bg = col.resize((W, H))

# 3) Soft studio glow behind the upper centre (where the head sits) for realism.
light = Image.new('L', (W, H), 0)
d = ImageDraw.Draw(light)
cx, cy, rad = W // 2, int(H * 0.30), int(W * 0.55)
d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=70)
light = light.filter(ImageFilter.GaussianBlur(rad * 0.5))
hi = Image.new('RGB', (W, H), (0xF3, 0xEF, 0xE8))
bg = Image.composite(hi, bg, light)

# 4) Composite subject over the backdrop.
out = Image.alpha_composite(bg.convert('RGBA'), cut).convert('RGB')

# 5) Keep it crisp but web-friendly.
maxw = 1000
if W > maxw:
    out = out.resize((maxw, round(H * maxw / W)), Image.LANCZOS)

out.save(OUT, quality=92, subsampling=0, progressive=True)
print('saved', OUT, out.size)
