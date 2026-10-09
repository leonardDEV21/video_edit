"""Two-pass loudnorm master (CLAUDE.md section 10: about -14 LUFS, true peak <= -1 dBTP).
Video is copied untouched; audio is measured, normalised, resampled to 48 kHz AAC and trimmed to the video length.
Usage: python3 scripts/master.py in.mp4 out.mp4"""
import json, re, subprocess, sys

src, dst = sys.argv[1], sys.argv[2]
I, TP, LRA = -14, -1.5, 11
p1 = subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", "-nostats", "-i", src, "-af", f"loudnorm=I={I}:TP={TP}:LRA={LRA}:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
m = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", p1, re.S).group(0))
vdur = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=duration", "-of", "csv=p=0", src], capture_output=True, text=True).stdout.strip().strip(",")
af = (f"loudnorm=I={I}:TP={TP}:LRA={LRA}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
      f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=48000")
subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", src, "-t", vdur, "-c:v", "copy", "-af", af, "-c:a", "aac", "-b:a", "256k", "-movflags", "+faststart", dst], check=True)
print(f"mastered {dst}: input {m['input_i']} LUFS / {m['input_tp']} dBTP -> target {I} LUFS / {TP} dBTP (re-measure with qc_render.py)")
