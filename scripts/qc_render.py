"""Quality gate on the RENDERED file (playbook section 11, CLAUDE.md section 10).
Checks what can be measured; writes a report that says which checks ran and what a human must still review.
Usage: python3 scripts/qc_render.py <video.mp4> [report.md]"""
import json, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
video = Path(sys.argv[1])
report = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / "verify" / f"qc_{video.stem}.md"
shots = ROOT / "verify" / f"qc_{video.stem}"
shots.mkdir(parents=True, exist_ok=True)
t = json.loads((ROOT / "edit/timeline.json").read_text())
rows = []  # (status, check, detail)


def run(args):
    return subprocess.run(args, capture_output=True, text=True)


def ff(filters, extra=()):
    return run(["ffmpeg", "-nostdin", "-hide_banner", "-nostats", "-i", str(video), *extra, "-vf" if filters[0] == "v" else "-af", filters[1], "-f", "null", "-"]).stderr


# 1. technical parameters
probe = json.loads(run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(video)]).stdout)
v = next(s for s in probe["streams"] if s["codec_type"] == "video")
a = next((s for s in probe["streams"] if s["codec_type"] == "audio"), None)
num, den = map(int, v["r_frame_rate"].split("/"))
fps = num / den
want = {"codec": "h264", "pix_fmt": "yuv420p", "fps": t["fps"]}
dur_ms = float(v.get("duration", probe["format"]["duration"])) * 1000
ok = v["codec_name"] == want["codec"] and v["pix_fmt"] == want["pix_fmt"] and abs(fps - want["fps"]) < 0.01
rows.append(("PASS" if ok else "FAIL", "video stream", f"{v['codec_name']} {v['pix_fmt']} {v['width']}x{v['height']} {fps:.3f} fps"))
frame_ms = 1000 / t["fps"]
rows.append(("PASS" if abs(dur_ms - t["durationMs"]) <= frame_ms else "FAIL", "duration", f"{dur_ms:.0f} ms, timeline {t['durationMs']} ms"))
if a:
    ok = a["codec_name"] == "aac" and a["sample_rate"] == "48000"
    rows.append(("PASS" if ok else "WARN", "audio stream", f"{a['codec_name']} {a['sample_rate']} Hz {a.get('channels')} ch"))
else:
    rows.append(("FAIL", "audio stream", "none"))

# 2. loudness
e = ff(("a", "ebur128=peak=true"))
I = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", e)[-1]); tp = float(re.findall(r"Peak:\s+(-?[\d.]+) dBFS", e)[-1])
rows.append(("PASS" if -16 <= I <= -13 else "WARN", "integrated loudness", f"{I} LUFS (target about -14)"))
rows.append(("PASS" if tp <= -1.0 else "FAIL", "true peak", f"{tp} dBTP (max -1)"))

# 3. black frames, frozen picture, silence
blacks = re.findall(r"black_start:([\d.]+) black_end:([\d.]+)", ff(("v", "blackdetect=d=0.1:pix_th=0.10")))
rows.append(("PASS" if not blacks else "FAIL", "black frames", ", ".join(f"{float(s):.2f}-{float(e):.2f}s" for s, e in blacks) or "none"))
fr = ff(("v", "freezedetect=n=0.002:d=0.7"))
fs = [float(x) for x in re.findall(r"freeze_start: ([\d.]+)", fr)]; fe = [float(x) for x in re.findall(r"freeze_end: ([\d.]+)", fr)]
freezes = [(s, fe[i] if i < len(fe) else dur_ms / 1000) for i, s in enumerate(fs)]
rows.append(("PASS" if not freezes else "WARN", "frozen picture (>0.7 s)", ", ".join(f"{s:.2f}-{e:.2f}s" for s, e in freezes) or "none") )
si = ff(("a", "silencedetect=n=-45dB:d=1.0"))
ss = [float(x) for x in re.findall(r"silence_start: (-?[\d.]+)", si)]; se = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", si)]
sil = [(s, se[i] if i < len(se) else dur_ms / 1000) for i, s in enumerate(ss)]
rows.append(("PASS" if not sil else "WARN", "silence (>1 s below -45 dB)", ", ".join(f"{s:.2f}-{e:.2f}s" for s, e in sil) or "none"))

# 4. clipping: count samples at full scale
vd = ff(("a", "volumedetect"))
mx = float(re.search(r"max_volume: (-?[\d.]+) dB", vd).group(1))
rows.append(("PASS" if mx < -0.1 else "FAIL", "sample peak", f"{mx} dBFS"))

# 5. first frame, last frame and a 1 s contact sheet for human review
run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(video), "-frames:v", "1", str(shots / "first_frame.jpg")])
run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-sseof", "-0.1", "-i", str(video), "-frames:v", "1", str(shots / "last_frame.jpg")])
run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(video), "-vf", "fps=1,scale=180:-2,tile=10x9", "-frames:v", "1", str(shots / "contact_1s.jpg")])
ymean = run(["ffmpeg", "-nostdin", "-v", "error", "-i", str(shots / "first_frame.jpg"), "-vf", "signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-", "-f", "null", "-"]).stdout
y = float(re.search(r"YAVG=([\d.]+)", ymean).group(1)) if "YAVG" in ymean else -1
rows.append(("PASS" if y > 30 else "FAIL", "first frame not black", f"mean luma {y:.0f}; {shots / 'first_frame.jpg'}"))

fails = sum(r[0] == "FAIL" for r in rows); warns = sum(r[0] == "WARN" for r in rows)
md = [f"# QC report: {video.name}", "", f"Automated checks run: {len(rows)}. FAIL: {fails}. WARN: {warns} (WARN = a human must look; may be intentional).", "",
      "| Status | Check | Detail |", "|---|---|---|"] + [f"| {s} | {c} | {d} |" for s, c, d in rows] + [
      "", "## Not automated: a human or a review pass must still check", "",
      "* Captions match the audio, proofread names and numbers (run `scripts/check_caption_sync.py`).",
      "* Faces and action not covered; text inside the platform safe areas (review stills, see section 10.1).",
      "* Colour continuity and natural skin/water on a phone-sized view.",
      "* Music and effects by ear (the agent cannot listen; levels above are measurements only).",
      "* Ending deliberate; cover matches the opening.",
      f"", f"Review images: `{shots.relative_to(ROOT)}/` (first_frame.jpg, last_frame.jpg, contact_1s.jpg)."]
report.write_text("\n".join(md) + "\n")
print("\n".join(f"{s:4} {c}: {d}" for s, c, d in rows))
print(f"report: {report}")
sys.exit(1 if fails else 0)
