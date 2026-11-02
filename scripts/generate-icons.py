"""Renderiza o master SVG em todos os formatos (Pillow e CairoSVG)."""
from io import BytesIO
from pathlib import Path
import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'icons'
svg = (ROOT / 'src' / 'brand' / 'q-icon.svg').read_text()
OUT.mkdir(exist_ok=True)
# Navegadores recebem o vetor real, sem PNG embutido.
(ROOT / 'assets' / 'favicon.svg').write_text(svg)

def render(size, full_bleed=False):
    source = svg.replace('rx="64"', 'rx="0"') if full_bleed else svg
    png = cairosvg.svg2png(bytestring=source.encode(), output_width=size * 3, output_height=size * 3)
    return Image.open(BytesIO(png)).convert('RGBA').resize((size, size), Image.Resampling.LANCZOS)

for size in (16, 24, 32, 48, 64, 70, 96, 120, 128, 144, 150, 152, 167, 180, 192, 256, 310, 384, 512, 1024):
    render(size).save(OUT / f'icon-{size}.png', optimize=True)
render(256).save(ROOT / 'favicon.ico', format='ICO', sizes=[(s, s) for s in (16, 24, 32, 48, 64, 128, 256)])
# iOS e launchers Android aplicam sua própria máscara. O fundo cobre todo o quadrado.
for size in (120, 152, 167, 180):
    render(size, full_bleed=True).convert('RGB').save(OUT / f'apple-touch-icon-{size}.png', optimize=True)
render(180, full_bleed=True).convert('RGB').save(ROOT / 'apple-touch-icon.png', optimize=True)
for size in (192, 512):
    render(size, full_bleed=True).convert('RGB').save(OUT / f'icon-maskable-{size}.png', optimize=True)
print('SVG vetorial, PNG arredondados, ICO, Apple Touch e Android maskable gerados.')
