"""Checks edit/timeline.json before any render. Exits non-zero on the first class of failure.

Money is recomputed independently from the rate and the bill, and every euro/baht figure that
appears in any graphic text must match it.
"""
import json, re, subprocess, sys
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
t = json.loads((ROOT / "edit/timeline.json").read_text())
errors, notes = [], []

# ---- money
m = t["money"]
rate, bill, people = Decimal(m["rateEurThb"]), Decimal(m["billThb"]), m["people"]
q = lambda d: d.quantize(Decimal("0.01"), ROUND_HALF_UP)
expect = {"billEur": q(bill / rate), "eachEur": q(bill / rate / people), "eachThb": bill / people}
for k, v in expect.items():
    if Decimal(str(m[k])) != v:
        errors.append(f"money.{k} = {m[k]}, recomputed {v}")
# reverse check: the euro figure converts back to the bill within rounding
if abs(Decimal(m["billEur"]) * rate - bill) > rate * Decimal("0.005"):
    errors.append("billEur * rate does not return the bill")
allowed_eur = {str(expect["billEur"]), str(expect["eachEur"])}
allowed_thb = {str(int(bill)), str(int(expect["eachThb"]))}
texts = []
for g in t["graphics"]:
    for key in ("text", "highlight", "title", "place"):
        if key in g:
            texts.append(g[key])
    for l in g.get("lines", []):
        texts.append(l["text"])
for s in texts:
    for e in re.findall(r"€\s?(\d+(?:\.\d+)?)", s):
        if e not in allowed_eur:
            errors.append(f"graphic text '{s}': €{e} is not a computed value {sorted(allowed_eur)}")
    for b in re.findall(r"(\d+)\s?(?:baht|THB|฿)", s, re.I):
        if b not in allowed_thb:
            errors.append(f"graphic text '{s}': {b} baht is not a computed value")
    if re.search(r"for (\d+)", s) and re.search(r"for (\d+)", s).group(1) != str(people):
        errors.append(f"graphic text '{s}': people count differs from money.people")
    for ch in "฿≈":
        if ch in s:
            errors.append(f"graphic text '{s}' uses '{ch}', which the bundled fonts do not have")
notes.append(f"money OK: {int(bill)} THB / {rate} = €{expect['billEur']} for {people}, €{expect['eachEur']} ({int(expect['eachThb'])} THB) each")

# ---- cut duration
fr = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-count_packets", "-show_entries", "stream=nb_read_packets,r_frame_rate",
                     "-of", "csv=p=0", str(ROOT / "public" / t["cut"])], capture_output=True, text=True).stdout.strip().split(",")
num, den = map(int, fr[0].split("/"))
cut_ms = round(int(fr[1]) * 1000 * den / num)
if cut_ms != t["cutMs"]:
    errors.append(f"cutMs {t['cutMs']} but public/{t['cut']} is {cut_ms} ms")
if t["durationMs"] != t["endCard"]["startMs"] + 2000 or t["endCard"]["startMs"] != t["cutMs"]:
    errors.append("durationMs / endCard do not line up with cutMs")

# ---- captions
c = t["captions"]
for a, b in zip(c, c[1:]):
    if b["startMs"] < a["endMs"]:
        errors.append(f"caption overlap {a['text']} / {b['text']} at {b['startMs']}")
for w in c:
    if w["endMs"] - w["startMs"] < 120:
        errors.append(f"caption word '{w['text']}' shorter than 120ms")
    if w["endMs"] > t["cutMs"]:
        errors.append(f"caption '{w['text']}' runs past the cut")

# ---- zooms
z = sorted(t["zooms"], key=lambda x: x["atMs"])
for a, b in zip(z, z[1:]):
    if b["atMs"] - a["atMs"] < 1500:
        errors.append(f"zooms at {a['atMs']} and {b['atMs']} are closer than 1.5 s")
    if b["atMs"] < a["atMs"] + a["durationMs"]:
        errors.append(f"zoom at {a['atMs']} still running when {b['atMs']} starts")
for x in z:
    if not 1.08 <= x["scale"] <= 1.2:
        errors.append(f"zoom at {x['atMs']} scale {x['scale']} outside 1.08-1.2 (1080p source)")
    for g in t["graphics"]:
        if g["type"] == "mapZoom" and g["startMs"] <= x["atMs"] < g["endMs"]:
            errors.append(f"zoom at {x['atMs']} lands under the fullscreen map")
    for b in t["broll"]:
        if b["startMs"] <= x["atMs"] < b["endMs"]:
            errors.append(f"zoom at {x['atMs']} lands under B-roll")

# ---- graphics: one new element at a time, hold >= 1 s
gs = sorted(t["graphics"], key=lambda g: g["startMs"])
for a, b in zip(gs, gs[1:]):
    if 0 <= b["startMs"] - a["startMs"] < 300:
        errors.append(f"{a['type']} and {b['type']} enter within 300ms")
for g in gs:
    if g["endMs"] - g["startMs"] < 1500:
        errors.append(f"{g['type']} at {g['startMs']} is on screen under 1.5 s")
    if g["endMs"] > t["durationMs"]:
        errors.append(f"{g['type']} runs past the end")

# ---- sfx spacing (rough limit one per 2 s)
sf = sorted(x["atMs"] for x in t["sfx"])
close = [(a, b) for a, b in zip(sf, sf[1:]) if b - a < 1500]
if close:
    errors.append(f"sound effects closer than 1.5 s: {close}")
for x in t["sfx"]:
    if not (ROOT / "public" / x["src"]).exists():
        errors.append(f"missing {x['src']}")
if not (ROOT / "public" / t["music"]["src"]).exists():
    errors.append(f"missing {t['music']['src']}")

for n in notes:
    print("OK  ", n)
print(f"OK   {len(c)} caption words, {len(z)} zooms, {len(gs)} graphics, {len(sf)} sfx, cut {cut_ms} ms")
for e in errors:
    print("FAIL", e)
sys.exit(1 if errors else 0)
