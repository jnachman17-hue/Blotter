"""Read jon-real-ib-tracker.xlsx with the stdlib only (no openpyxl available).

Dumps every sheet's cells, plus per-cell style/fill information, so the
'was the state layer ever maintained' question can be answered from the file.
"""
import zipfile, re, sys, json
from xml.etree import ElementTree as ET

NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
PATH = 'blotter-ib-ws1/research/jon-real-ib-tracker.xlsx'

z = zipfile.ZipFile(PATH)

# shared strings
shared = []
if 'xl/sharedStrings.xml' in z.namelist():
    root = ET.fromstring(z.read('xl/sharedStrings.xml'))
    for si in root.findall('m:si', NS):
        shared.append(''.join(t.text or '' for t in si.iter('{%s}t' % NS['m'])))

# workbook sheets -> rels
wb = ET.fromstring(z.read('xl/workbook.xml'))
rels = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
relmap = {r.get('Id'): r.get('Target') for r in rels}
sheets = []
for sh in wb.find('m:sheets', NS):
    rid = sh.get('{%s}id' % NS['r'])
    target = relmap[rid]
    if not target.startswith('xl/'):
        target = 'xl/' + target.lstrip('/')
    sheets.append((sh.get('name'), target))

# styles: map cellXf index -> fill fgColor
styles = ET.fromstring(z.read('xl/styles.xml'))
fills = []
for f in styles.find('m:fills', NS):
    pf = f.find('m:patternFill', NS)
    color = None
    if pf is not None:
        pt = pf.get('patternType')
        fg = pf.find('m:fgColor', NS)
        if fg is not None:
            color = fg.get('rgb') or ('theme%s' % fg.get('theme') if fg.get('theme') else None)
        if pt in (None, 'none'):
            color = None
    fills.append(color)
xf_fill = []
for xf in styles.find('m:cellXfs', NS):
    fid = int(xf.get('fillId') or 0)
    xf_fill.append(fills[fid] if fid < len(fills) else None)

def colname(ref):
    return re.match(r'([A-Z]+)', ref).group(1)
def rownum(ref):
    return int(re.search(r'(\d+)', ref).group(1))

out = {}
for name, target in sheets:
    root = ET.fromstring(z.read(target))
    rows = {}
    for row in root.iter('{%s}row' % NS['m']):
        rn = int(row.get('r'))
        cells = {}
        for c in row.findall('m:c', NS):
            ref = c.get('r'); col = colname(ref)
            t = c.get('t'); s = c.get('s')
            v = c.find('m:v', NS)
            isel = c.find('m:is', NS)
            val = None
            if t == 's' and v is not None:
                val = shared[int(v.text)]
            elif t == 'inlineStr' and isel is not None:
                val = ''.join(x.text or '' for x in isel.iter('{%s}t' % NS['m']))
            elif v is not None:
                val = v.text
            fill = xf_fill[int(s)] if s is not None and int(s) < len(xf_fill) else None
            if val is None and fill is None:
                continue
            cells[col] = {'v': val, 'fill': fill}
        if cells:
            rows[rn] = cells
    out[name] = rows

json.dump(out, open('blotter-ib-ws1/research/scripts/tracker_raw.json', 'w'), indent=1)
print("sheets:", [s[0] for s in sheets])
for name, rows in out.items():
    print(name, "rows:", len(rows), "max row:", max(rows) if rows else 0)
