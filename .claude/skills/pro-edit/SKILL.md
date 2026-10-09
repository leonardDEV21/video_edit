---
name: pro-edit
description: Director-led workflow for turning real footage in raw/ into a finished Short or YouTube video with this repo's pipeline (video-use or ffmpeg cut, one timeline.json, one Remotion pass, gates A and B, automated QC). Use when asked to edit, re-edit or improve a video, or when the user types /pro-edit.
---

# Pro Edit

1. Read `CLAUDE.md` (operating spec, wins on conflicts), `EDITING_PLAYBOOK.md` (creative reference) and
   `edit/project.md` if it exists (decisions and owner preferences so far). If `EDIT_REQUEST.md` exists, read it too.
2. **Phase 0, intake:** probe `raw/`; transcribe locally (faster-whisper large-v3, word timestamps) unless the
   owner approved a cloud service; extract stills to `verify/intake/`; write `edit/shot_map.csv`
   (source in/out, shot, action, audio, usable, notes). Say what you actually inspected.
3. **Phase 1, GATE A:** write the plan into `edit/project.md`:
   - one-sentence idea and story shape (playbook section 1);
   - the true hook (section 2);
   - keep/cut table, captions, graphics, sound, music and thumbnail candidates;
   - open questions.
   Stop and wait for approval.
4. **Phase 2 to 4, build:**
   - cut to `edit/cut.mp4` with `edit/edl.json`, copied to `public/cut.mp4`;
   - generate `edit/timeline.json` with `scripts/build_timeline.py`. All numbers and money are computed there, never typed;
   - components go in `src/components/`.
5. **Phase 5, verify:**
   - `npm run check` (schema, money, glyphs, timing, caption sync);
   - stills at events (`scripts/stills.mjs`);
   - `npm run preview` (render, then master, then `qc_render.py`);
   - a Critic subagent on the rendered file. Fix the top issues, at most 3 passes.
6. **Phase 6, GATE B:** show the 720p preview, the cover and the QC report. Apply feedback as edits to the
   timeline data, not by rewriting components.
7. **Final, only after approval:** `scripts/finalize.sh <project>` writes a new version in `out/final/`
   (mp4, srt, edit plan, QC report and thumbnail) and never overwrites an earlier one.
8. **Phase 7:** append decisions, owner changes and learned preferences to `edit/project.md`; copy durable
   preferences into `CLAUDE.md` section 13.

Never: modify `raw/`, invent events, quotes or numbers, upload footage to a cloud service without approval,
publish or schedule posts, or call something verified that was not checked. Report which checks actually ran.
