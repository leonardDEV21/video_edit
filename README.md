# video_edit

Orchestrator for Claude Code video edits: Lithuanian speech, English karaoke captions,
punch-in zooms, sound effects, one `timeline.json` driving a single Remotion pass.

Never commit footage, renders, music or `.env`. Code, timelines, transcripts and notes are fine.

## What is where

| File | Role |
|---|---|
| `CLAUDE.md` | Operating spec: phases, gates, brand, `timeline.json` contract, checks, owner preferences. Wins on conflicts. |
| `EDITING_PLAYBOOK.md` | Creative reference: story shapes, hooks, rhythm, transitions, sound cues, colour, quality gate. |
| `.claude/skills/pro-edit/SKILL.md` | `/pro-edit`: step-by-step runbook for this pipeline. |
| `EDIT_REQUEST_TEMPLATE.md` | Copy to `EDIT_REQUEST.md` and fill in before a new video. |
| `src/` | Remotion project (`Short`, `ShortThumb`), components in `src/components/`. |
| `scripts/` | Timeline builder, checks, stills, mastering, QC, SRT and edit-plan export, final delivery. |
| `edit/` | Per-project data: `project.md` (decisions), `shot_map.csv`, `edl.json`, `timeline.json`, transcripts. |
| `demo/` | The original 10 s postcard style demo. |

## Setup

Cloud session: nothing to install beyond `npm install`; ffmpeg and Chromium are present; transcription uses local
faster-whisper (`pip install faster-whisper`).

Your own computer (optional engines):

```bash
git clone https://github.com/Hainrixz/editor-pro-max.git    # optional component library
npx skills add remotion-dev/skills                           # official Remotion agent skills
```

`video-use` (https://github.com/browser-use/video-use) sends speech audio to ElevenLabs and needs an API key.
Use it only after the owner agrees to the upload and the cost. Read third-party SKILL.md files and scripts before running them.

## Use

Put footage in `raw/`, fill in `EDIT_REQUEST.md` (optional), then run `/pro-edit` or say:

> Edit raw/myvideo.mp4. Lithuanian speech, English karaoke captions.

Approve the plan (gate A), review the preview (gate B), approve the final.

```bash
npm run timeline     # rebuild edit/timeline.json from scripts/build_timeline.py
npm run check        # types, schema, money recomputation, glyphs, spacing, caption sync
npm run studio       # live preview, every value editable
npm run preview      # render 1080p, master to -14 LUFS, run the QC report
npm run final -- koh-tao-breakfast   # after approval: out/final/<name>_vertical_vNN.{mp4,srt} + edit plan + QC + cover
```

Set `REMOTION_BROWSER` to a local Chromium headless shell if Remotion cannot download its own.
