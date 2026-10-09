"""Write a sidecar SRT from edit/timeline.json captions (English).
Usage: python3 scripts/export_srt.py out/final/name.srt"""
import json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from caption_pages import subtitle_cues, two_lines

ROOT = Path(__file__).resolve().parent.parent
t = json.loads((ROOT / "edit/timeline.json").read_text())
out = Path(sys.argv[1] if len(sys.argv) > 1 else ROOT / "out/captions.srt")
out.parent.mkdir(parents=True, exist_ok=True)


def ts(ms):
    h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


cues = subtitle_cues(t["captions"])
lines = []
for n, cue in enumerate(cues, 1):
    end = cue[-1]["endMs"]
    if n < len(cues):
        end = min(end + 300, cues[n][0]["startMs"])  # short linger, never into the next cue
    lines += [str(n), f"{ts(cue[0]['startMs'])} --> {ts(end)}", two_lines(cue), ""]
out.write_text("\n".join(lines), encoding="utf-8")
print(f"{out}: {len(cues)} cues")
