"""Regenera os tamanhos de ícone a partir do master do projeto (requer Pillow)."""
import base64
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'icons'
master = Image.open(ROOT / 'src' / 'brand' / 'q-assinatura-master.png').convert('RGB')
OUT.mkdir(exist_ok=True)
for size in (16, 24, 32, 48, 64, 70, 96, 120, 128, 144, 150, 152, 167, 180, 192, 256, 310, 384, 512, 1024):
    master.resize((size, size), Image.Resampling.LANCZOS).save(OUT / f'icon-{size}.png', optimize=True)
master.resize((256, 256), Image.Resampling.LANCZOS).save(ROOT / 'favicon.ico', format='ICO', sizes=[(s, s) for s in (16, 24, 32, 48, 64, 128, 256)])
master.resize((180, 180), Image.Resampling.LANCZOS).save(ROOT / 'apple-touch-icon.png', optimize=True)
for size in (192, 512):
    padded = Image.new('RGB', (size, size), '#05090a')
    inset = round(size * .10)
    padded.paste(master.resize((size - 2 * inset, size - 2 * inset), Image.Resampling.LANCZOS), (inset, inset))
    padded.save(OUT / f'icon-maskable-{size}.png', optimize=True)
# Mantém compatibilidade com o caminho do favicon antigo.
encoded = base64.b64encode((OUT / 'icon-96.png').read_bytes()).decode()
(ROOT / 'assets' / 'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><image width="96" height="96" href="data:image/png;base64,' + encoded + '"/></svg>\n')
print('Ícones PNG, ICO e maskable gerados.')
