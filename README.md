# video_edit

Orchestrator for Claude Code video edits: Lithuanian speech, English karaoke captions,
punch-in zooms, sound effects, one `timeline.json` driving a single Remotion pass.

This repo holds config only. Never commit footage, renders or `.env`.

## Setup (on your own computer)

```bash
git clone https://github.com/Hainrixz/editor-pro-max.git
cd editor-pro-max
claude            # then run /start
```

In Claude Code: `Set up https://github.com/browser-use/video-use for me` (it asks for the ElevenLabs key and stores it in `.env`).

Then append this repo's CLAUDE.md to editor-pro-max's (do not overwrite):

```bash
cat ../video_edit/CLAUDE.md >> CLAUDE.md
```

Read the third-party SKILL.md files and scripts before running them.

## Use

Put footage in `raw/`, then:

> Edit raw/myvideo.mp4. Lithuanian speech, English karaoke captions. One YouTube version, three Shorts.

Approve the plan (gate A), review the preview (gate B), approve finals.
