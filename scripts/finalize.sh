#!/usr/bin/env bash
# Final delivery after GATE B approval. Never overwrites an earlier version.
# Usage: scripts/finalize.sh <project-name>      e.g. scripts/finalize.sh koh-tao-breakfast
# Writes out/final/<project>_vertical_vNN.{mp4,srt}, _edit_plan.csv, _qc.md and thumb, then prints the QC table.
set -euo pipefail
cd "$(dirname "$0")/.."
name="${1:?project name}"
mkdir -p out/final
n=1; while [ -e "out/final/${name}_vertical_v$(printf %02d $n).mp4" ]; do n=$((n+1)); done
base="out/final/${name}_vertical_v$(printf %02d $n)"
export REMOTION_BROWSER="${REMOTION_BROWSER:-$(ls -d /opt/pw-browsers/chromium_headless_shell-*/*/headless_shell 2>/dev/null | head -1)}"
python3 scripts/build_timeline.py
npm run -s check
npx remotion render Short "${base}_unmastered.mp4" --crf=18 --log=error
python3 scripts/master.py "${base}_unmastered.mp4" "${base}.mp4"
rm -f "${base}_unmastered.mp4"
npx remotion still ShortThumb "${base}_thumb.jpg" --log=error
python3 scripts/export_srt.py "${base}.srt"
python3 scripts/export_edit_plan.py "${base}_edit_plan.csv"
python3 scripts/check_caption_sync.py | tail -1
python3 scripts/qc_render.py "${base}.mp4" "${base}_qc.md"
echo "Delivered: ${base}.mp4 (+ .srt, _edit_plan.csv, _qc.md, _thumb.jpg)"
