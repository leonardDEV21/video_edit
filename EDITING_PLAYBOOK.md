> **How this fits our setup (added 2026-10-09).** This playbook is the creative reference: story, rhythm,
> transitions, sound cues, colour and the quality gate. `CLAUDE.md` is the operating spec and **wins on any
> conflict** (brand, gates, `timeline.json` contract, caption style, owner preferences).
> Folder mapping: the playbook's `work/` = our `edit/`, `previews/` = `out/`, `deliverables/` = `out/final/`.
> Known, deliberate differences:
> - Karaoke captions are 2 to 3 words per page (vertical, word-highlighted). The SRT sidecar uses full sentences.
> - Length follows the owner's brief. For example, the first video kept the whole clip on request, instead of the 15 to 45 s default.
> - Playful graphics are allowed when each one is tied to a real line or visual (owner preference). A row of unrelated memes is still out.
> - Music sits about 15 to 18 dB under speech, which matches this playbook's 15 to 20 dB and the owner's "a bit lower".

# Professional Claude Code Video Editing Playbook

This is an original creative direction document intended to supplement an installed video editing engine (e.g., video-use) and the official Remotion Agent Skills. It is not itself a video renderer. Numerical timings are working defaults, not universal social platform rules.

## 1. First decide what the viewer should feel

Never begin by randomly applying transitions. Identify who the video serves, what question it poses, why the viewer stays, and where the emotional reward happens. Write the one-sentence idea and choose one real sequence that proves it.

* For adventure: obstacle or uncertainty -> action -> discovery -> payoff.
* For funny moments: expectation -> escalating attempts -> reaction/punchline.
* For product/tips: result first -> problem -> useful demonstration -> conclusion.
* For travel recaps: unusual moment first -> brief location context -> movement/exploration -> best scene -> memorable end.
* For interviews: exceptional quote first -> context -> most persuasive answer -> final insight.

Avoid chronological lists of every activity. Sequence shots based on cause and effect, unless chronology is necessary for truth.

## 2. The first seconds: make a true hook

First 0 to 2 seconds: strongest genuine visual, line, movement, sound or question. Skip logos and greetings unless the greeting itself is remarkable. Start just before an action so the viewer immediately sees motion and expects the outcome.

Hooks to use only where supported by the real footage:
* Surprise: reveal a strange feature or outcome before explaining it.
* Contrast: visually juxtapose expectation versus reality.
* Stakes: 'I wasn't sure I could do this' followed by real attempt and real outcome.
* Sensory: compelling water splash, crisp footsteps, crowd cheer or a surprising natural ambience.
* Question: show evidence and ask a question answered in the final act.

Never fake a dangerous incident, reaction or statement to create drama.

## 3. Make a shot map before editing

For every video source, use ffprobe for technical metadata and extract representative stills where possible. Transcribe intelligible speech with word timestamps, noting uncertainty. Record each source's action, scene, emotional value, sharpness, orientation, usable in/out and notable ambient sound.

Build an EDL with: output_start_sec, output_end_sec, source_file, source_in_sec, source_out_sec, framing, dialogue, caption, motion, transition, SFX, music, voice_level, rationale.

Select useful visuals for wide establishing, medium action, close reaction, detail/texture and payoff. For travel, look for hands, facial reaction, underwater view, landscape reveal, moving camera, footsteps, tickets/boats and ambient nature, but only if those are present in supplied media.

## 4. Editing rhythm: alternate, don't metronome

A suggested starting point for energetic vertical shorts is a mix of 0.5 to 1.2 second inserts, 1 to 3 second standard shots and occasional 3 to 6 second hero moments. Adjust to what happens in the frame; never impose an exact cut interval. Fast pacing is driven by new information, not merely fast cuts.

Change something meaningful at major beats: shot scale, action, location, question, camera perspective, sound texture or overlay. When nothing changes, consider trimming. When a real scene is beautiful or emotional, let it breathe.

Use hard cuts by default. Apply a J-cut (next scene's sound begins before its picture) to pull viewers forward, or an L-cut (earlier sound continues over the next picture) to preserve continuity. Place B-roll over speech instead of endlessly cutting talking head to talking head.

Preserve continuity of direction, eye line and spatial orientation. Avoid two identical talking-head framings back to back when a reaction, insert or punch-in can make the cut intentional.

## 5. Professional transitions and motion

| Technique | Appropriate use | Example direction | Avoid |
| --- | --- | --- | --- |
| Hard cut | Default; most dialogue and montage | Cut on movement or change of idea | Overdecorating every edit |
| Match cut | Similar shape or motion between real shots | Hand moving -> boat moving | Forcing unrelated shots |
| J-cut / L-cut | Conversation, exploration, scene handover | Hear waves before seeing the bay | Audio jumps or missing context |
| Whip pan | Both shots share direction/movement | Pan right through a scene change | Digital spins on still scenes |
| Speed ramp | A brief burst of real travel/action footage | Ease from 1x to 2x then back to 1x | Warping speech and faces |
| Punch-in | Key word, realization, comedic beat | 100% to ~107% with eased motion | 150% crops on 1080p footage |
| Push/pull | Scenic reveal or emotional emphasis | Slow 100% to 104% across the hold | Artificial jitter/constant zoom |
| Snap zoom + impact | One large surprise | Quick crop and a restrained impact | Repeating on every sentence |
| Freeze frame | Joke/explanation/annotation | 0.4s freeze with a small title | Mistaking the freeze for a glitch |
| White flash | Rare high-energy visual punctuation | 2-3 frames, only if tasteful | Frequent flash/strobe sequences |
| Light fade/dissolve | Passage of time or calm closing | A very short fade to the final view | Using dissolves to hide bad edits |

Use nonlinear easing (spring or cubic/ease-out) for kinetic animations. Keep camera pushes subtle and independent from low-resolution face details. Only slow footage according to captured frame rate, e.g. 60fps to 30fps permits clean 50% speed without inventing frames; optical-flow interpolation needs human QA.

## 6. Motion graphics and captions

Use one visual system per video: one primary modern sans font, one optional contrast style, a small palette, consistent drop shadow/stroke, consistent easing and corner style. Captions should not resemble a full screen of flying text.

If there is dialogue, use word-accurate timings and two to five words per displayed group as a useful default. Highlight one important word occasionally; don't bold every word. Let captions appear close to speech, not a second ahead, and allow enough reading time. Place text where it does not cover faces, action or interface controls. The usable safe area varies by platform and app UI; preview on the target phone and adjust.

Examples of deliberate treatment:
* Soft upward pop for a surprising word or number.
* Scale 0.92 to 1.0 with fade and eased settling for a heading.
* Small lower third for a location name, shown once at its first relevant appearance.
* An occasional large 2 to 4 word statement at the reveal.
* No permanent watermark/title if the brief asks for natural footage.

For landscape, underwater or wildlife footage, prefer sparse captions and let the images remain unobstructed. Provide sidecar SRT/VTT if the user wants an editable subtitle track. Proofread all place names and multilingual speech.

## 7. Sound design: the difference between average and polished

Use at most a few motivating audio layers at once:
1. Primary speech or important original location audio.
2. A licensed music bed chosen for narrative energy.
3. Authentic ambience or subtle recreated foley where permitted.
4. Specific accents (whoosh, pop, impact, riser, reverse, click) at significant edit beats.

Keep speech first. Clean low rumble and hiss conservatively, use gentle EQ and compression only when needed, and do not remove natural vocal texture. During speech, start with music perceptibly well below the voice (often around 15 to 20 dB lower in level, then adjust by ear); fade music back up during montage or non-dialogue scenes. Avoid hard gain changes; use volume curves.

| Effect / cue | Trigger | Suggested timing | Mixing rule |
| --- | --- | --- | --- |
| Small pop or click | Important caption or icon arriving | On visual contact | Quiet, not every word |
| Short whoosh | Real pan, object move, camera push | Slightly leads the motion | Do not layer over speech consonants |
| Reverse whoosh / swell | Precedes a significant reveal | 0.2 to 0.8s before impact | End exactly at reveal |
| Low impact / bass thump | Strong visual reveal or scene climax | Exactly on reveal | Use sparingly |
| Camera shutter | Photo or deliberate freeze | At freeze | Only when concept fits |
| Water splash/bubbles | Visible splash or dive | On observable action | Prefer original recorded sound |
| Footsteps, leaves, waves | Location establishes texture | Under the action | Match visual location, don't fabricate events |
| Riser | Suspense building to a moment | Last 0.5 to 2s before payoff | Don't prolong falsely |
| Tiny silence/dropout | Just before a comedic or dramatic payoff | Brief 0.1 to 0.4s | Deliberate, not a technical mute |
| Soft bell/chime | Discovery, positive solution, calm transition | At meaning change | Avoid cartoonish repetition |

Do NOT use a loud 'vine boom' or whoosh at every cut by default. Effects should be audible because they belong, not because the editor is showing off. Use rights-cleared audio; check every music/SFX file's license and avoid reusing unlicensed audio from someone else's reel.

Work with musical phrasing. Find downbeats and phrase boundaries, then synchronize selected hero cuts/impacts to them. Not every cut must hit a beat. Let speech and emotional pacing override the grid.

Target controlled consistent perceived loudness and avoid digital clipping. As a starting mastering target, consider about -14 to -16 LUFS integrated and true peaks under -1 dBTP, but requirements differ by platform and content; test the actual deliverable by ear and with loudness tools. Avoid compressing music so aggressively that scenery feels lifeless.

## 8. Visual treatment and authentic color

First correct exposure, white balance, highlight/shadow balance and consistency across adjacent shots. Then add restrained contrast and saturation. Restore naturally white skies, natural skin and truthful water color; do not force unreal turquoise water, fake sunsets or sharp halo edges. Avoid plastic skin and excessive clarity. Stabilize distracting handheld motion when possible, preserving intentional camera movement and avoiding crop stretch.

Add restrained grain/vignette only if the genre benefits; never automatically add them to all clips. Smooth noise reduction on poorly lit footage may erase detail, so compare before/after.

## 9. Example 30-second travel Reel beat map

| Output time | Story purpose | Visual strategy | Text / effects | Sound |
| --- | --- | --- | --- | --- |
| 0.0-1.5s | Immediate hook | Most extraordinary real frame or movement | 3-5 word question only if useful; micro punch-in | Authentic impact/splash, music in |
| 1.5-4.5s | Tiny context | Reaction followed by location wide shot | One location label; hard cut | Real short line/voice, bed ducked |
| 4.5-10.0s | Discovery | Two or three distinct camera distances | Simple cut on motion | Ambient sound + restrained music |
| 10.0-14.0s | Complication/curiosity | Real effort or unexpected detail | One emphasized keyword, not a paragraph | Small riser if warranted |
| 14.0-22.0s | Payoff | Best uninterrupted shot; optional close reaction | Minimal text; let image breathe | Music swell, authentic natural sound |
| 22.0-27.5s | Emotional resolution | Reflection, laughter, second beautiful shot | One short summary line or none | Return to gentle bed |
| 27.5-30.0s | Memorable ending | Clean concluding image or intentional loop | Optional short CTA, no forced logo | Natural tail / music resolve |

Use this structure only when the footage supports every narrative beat. Never invent a complication. It is fine to cut a 20s video if that tells the story better.

## 10. Different genres need different editing choices

### Travel and family footage
Let environmental audio carry at least one sequence. A real person's genuine reaction can be stronger than a decorative transition. Use fewer text layers, natural grading and wider scenic shots. If the source contains children, preserve context and privacy: do not fabricate dialogue or make misleading cuts.

### Comedy and challenges
The edit creates the punchline: setup, one anticipatory pause, reaction, sharp cut. Occasional snap zoom, tasteful freeze and one impact can work; a row of unrelated memes usually weakens the gag.

### Educational / talking head
Remove repeated takes and dead air; keep speech cadence intelligible. Add B-roll only when it demonstrates a spoken claim. Use captions, selective key words, a relevant on-screen example, and occasional framing changes. Keep facts and numbers source-verified.

### Product or gaming
Make the outcome visible quickly. Use cursor emphasis, screen crops, stat highlights, reaction inserts and impact cues only tied to actual in-game or on-screen events. Don't imply a feature/result that isn't present.

### Long YouTube vlog
Preserve narrative chapters and character. Build A-roll/speech moments first, then cover with action and atmosphere. Use a first 15 to 30 seconds teaser only if it genuinely represents what happens later. Don't sustain short-form 'one shot per second' energy for minutes.

## 11. Actual rendered-video quality gate

Verify the exported file, not just the timeline source. At minimum:

1. Media opens and decodes to the final frame, with the intended duration, dimensions, frame rate, H.264/yuv420p and AAC where requested.
2. First frame is compelling, correct, not a black frame or a blank title.
3. All source cut boundaries have sound crossfade or clean silence with no clicks, repeated frames or unexpected freeze.
4. All spoken words and facts remain accurate; captions match real audio and sit safely within the target platform UI area.
5. Motion graphics arrive and leave smoothly. No cropped faces, masked eyes, UI overlaps, jitter, distorted stills or unsafe flashes.
6. Music has a legitimate license and does not compete with speech. Levels do not clip. Ambient sound isn't drowned everywhere.
7. Color matches shot to shot and looks natural on a phone-sized preview as well as a desktop display.
8. Ending is deliberate, not an abrupt cutoff. Thumbnails and captions are consistent with the final cut.
9. Preserve `raw/`, EDL, versioned project, captions and final master. Export at least a review MP4 and the requested delivery file.
10. Record which checks were actually run. Never state 'all checks passed' merely because a render command returned successfully.

## 12. Deliverable naming

Use `deliverables/<project>_vertical_v01.mp4` or `deliverables/<project>_horizontal_v01.mp4`. Provide `deliverables/<project>.srt` when speech captions exist, and `work/edit_plan.csv` and `deliverables/edit_report.md` documenting decisions and checks. Increment version numbers for revisions rather than overwriting approved versions.
