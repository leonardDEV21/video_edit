"""Human-readable edit plan (CSV) from edit/edl.json + edit/timeline.json.
Columns follow the playbook EDL: output in/out, source in/out, track, content, sfx, note.
Usage: python3 scripts/export_edit_plan.py out/final/name_edit_plan.csv"""
import csv, json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
t = json.loads((ROOT / "edit/timeline.json").read_text())
edl = json.loads((ROOT / "edit/edl.json").read_text())
seg = edl["segments"][0]
off = seg["sourceStart"] - seg["outputStart"]
out = Path(sys.argv[1] if len(sys.argv) > 1 else ROOT / "out/edit_plan.csv")
out.parent.mkdir(parents=True, exist_ok=True)
src = lambda ms: f"{ms / 1000 + off:.2f}" if ms <= t["cutMs"] else "hold"
rows = []
for g in t["graphics"]:
    content = g.get("text") or g.get("title") or g.get("label") or ""
    if g["type"] == "priceTag":
        content = " | ".join(l["text"] for l in g["lines"])
    if g["type"] == "sideNotes":
        content = " | ".join(g["notes"])
    rows.append((g["startMs"], g["endMs"], "graphic:" + g["type"], content, ""))
for z in t["zooms"]:
    rows.append((z["atMs"], z["atMs"] + z["durationMs"], "zoom:" + z["style"], f"x{z['scale']} focus {z['focus']}", ""))
for b in t["broll"]:
    rows.append((b["startMs"], b["endMs"], "broll", f"{b['src']} from {b['trimMs']} ms", ""))
for s in t["sfx"]:
    rows.append((s["atMs"], s["atMs"], "sfx", "", f"{s['src']} {s['gainDb']} dB, lead {s['attackMs']} ms"))
rows.append((0, t["durationMs"], "music", t["music"]["src"], f"gain {t['music']['gainDb']} dB, duck {t['music']['duckDb']} dB; {t['music']['credit']}"))
rows.append((t["endCard"]["startMs"], t["durationMs"], "endCard", f"Follow {t['endCard']['handle']} {t['endCard']['text']}", f"holds frame {t['endCard']['holdMs']} ms"))
rows.sort(key=lambda r: (r[0], r[2]))
with out.open("w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["output_start_s", "output_end_s", "source_in_s", "source_out_s", "track", "content", "sfx_or_mix", "source_file"])
    for a, b, track, content, mix in rows:
        w.writerow([f"{a / 1000:.2f}", f"{b / 1000:.2f}", src(a), src(b), track, content, mix, edl["source"]])
print(f"{out}: {len(rows)} rows")
