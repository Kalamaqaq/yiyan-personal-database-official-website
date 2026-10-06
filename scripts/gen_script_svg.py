# -*- coding: utf-8 -*-
"""
把一段文本用系统脚本字体转成单条 SVG path（不依赖任何字体文件，零 Web 字体）。

关键点：viewBox 用「字形真实包围盒」而不是 hhea 的 ascender/descender ——
很多脚本字体（如 Segoe Script）hhea 上标值远超实际字形高度，
直接用字体度量会把内容裁到视口外，只剩几个笔画尖。

用法:
  python gen_script_svg.py <font_path> "<text>" <out.svg> [size] [letter_spacing] [pad]
"""
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

font_path = sys.argv[1]
text = sys.argv[2]
out = sys.argv[3]
size = float(sys.argv[4]) if len(sys.argv) > 4 else 100.0
ls = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0
pad = float(sys.argv[6]) if len(sys.argv) > 6 else 0.0

font = TTFont(font_path)
glyphset = font.getGlyphSet()
cmap = font.getBestCmap()
upm = font["head"].unitsPerEm
scale = size / upm
tx = Transform(scale, 0, 0, -scale, 0, 0)  # 翻转 y 轴，基线落在 y=0

kern = {}
if "kern" in font:
    for st in font["kern"].kernTables:
        kern.update(st.kernTable)

parts = []
x = 0.0
prev = None
missing = []
minx = miny = 1e9
maxx = maxy = -1e9

for ch in text:
    if ch == " ":
        gname = cmap.get(32)
    else:
        gname = cmap.get(ord(ch))
    if gname is None:
        missing.append(ch)
        gname = ".notdef"

    if prev is not None and (prev, gname) in kern:
        x += kern[(prev, gname)]

    glyph = glyphset[gname]

    spen = SVGPathPen(glyphset, ntos=lambda v: f"{v:.2f}")
    glyph.draw(TransformPen(spen, Transform(scale, 0, 0, -scale, x * scale, 0)))
    d = spen.getCommands()
    if d.strip():
        parts.append(f'<path d="{d}"/>')

    bpen = BoundsPen(glyphset)
    glyph.draw(TransformPen(bpen, tx))
    if bpen.bounds:
        bx0, by0, bx1, by1 = bpen.bounds
        minx = min(minx, bx0 + x * scale)
        maxx = max(maxx, bx1 + x * scale)
        miny = min(miny, by0)
        maxy = max(maxy, by1)

    x += glyph.width + ls
    prev = gname

if not parts:
    raise SystemExit("no glyphs drawn")

if minx > maxx:  # 全是空格之类的退化情况
    minx, maxx, miny, maxy = 0, 1, 0, 1

vb_x = minx - pad
vb_y = miny - pad
vb_w = (maxx - minx) + pad * 2
vb_h = (maxy - miny) + pad * 2

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb_x:.2f} {vb_y:.2f} {vb_w:.2f} {vb_h:.2f}"\n'
    f'     preserveAspectRatio="xMidYMid meet" role="img">\n'
    f'  <g fill="currentColor">\n    '
    + "\n    ".join(parts)
    + f'\n  </g>\n</svg>\n'
)
with open(out, "w", encoding="utf-8") as f:
    f.write(svg)

print(f"font={font_path} upm={upm} glyphs={len(parts)} missing={missing}")
print(f"viewBox={vb_x:.2f} {vb_y:.2f} {vb_w:.2f} {vb_h:.2f}  (w/h = {vb_w / vb_h:.2f})")