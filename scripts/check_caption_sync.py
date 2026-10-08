"""Section 10.4: sample 10 caption pages and confirm each sits inside its spoken phrase window."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
t = json.loads((ROOT / "edit/timeline.json").read_text())
src = json.loads((ROOT / "edit/transcripts/source.json").read_text())
off = 350
words = [(round(w["start"] * 1000) - off, round(w["end"] * 1000) - off) for s in src["segments"] for w in s["words"]]
# speech windows: Lithuanian words merged across gaps < 300 ms
win = []
for a, b in words:
    if win and a - win[-1][1] < 300:
        win[-1][1] = max(win[-1][1], b)
    else:
        win.append([a, b])
# pages, same rules as KaraokeCaptions.toPages
c = t["captions"]; pages = []; cur = []
for i, w in enumerate(c):
    prev = c[i - 1] if i else None
    rest = next((k - i + 1 for k in range(i, len(c)) if re.search(r"[.?!]$", c[k]["text"])), 1)
    brk = cur and (len(cur) == 3 or (len(cur) == 2 and rest == 2) or (prev and re.search(r"[.?!]$", prev["text"])) or (prev and prev["text"].endswith(",") and len(cur) >= 2 and next((k - i + 1 for k in range(i, len(c)) if re.search(r"[.?!]$", c[k]["text"])), 1) >= 2) or (prev and w["startMs"] - prev["endMs"] >= 300))
    if brk:
        pages.append(cur); cur = []
    cur.append(w)
pages.append(cur)
step = max(1, len(pages) // 10)
bad = 0
for p in pages[::step][:10]:
    s, e = p[0]["startMs"], p[-1]["endMs"]
    ok = any(a - 60 <= s and e <= b + 60 for a, b in win) or any(a - 60 <= s <= b for a, b in win)
    inside = any(a - 60 <= s and e <= b + 60 for a, b in win)
    print(f"{'OK  ' if inside else 'WARN'} {s:6d}-{e:6d} ms  {' '.join(w['text'] for w in p)}")
    bad += not inside
print(f"{len(pages)} pages total, sampled 10, {bad} outside a single speech window")
