# Project: Koh Tao breakfast (first video)

Status: **Phase 1, GATE A. Waiting for owner approval. Nothing has been cut or rendered.**

## 1. Footage facts (Phase 0)

| | |
|---|---|
| File | `raw/source.mp4` (Google Drive id `1yJnvNYqQkm1k5CqjinY2mVJ39PxGXcWZ`, 92 MB, not committed) |
| Duration | 84.34 s |
| Video | HEVC Main 10, stored 1920x1080 with rotation -90, so it **plays as 1080x1920 portrait** |
| Frame rate | 29.97 fps (30000/1001), variable (avg 29.99) |
| Colour | **HDR HLG** (BT.2020, arib-std-b67, 10-bit). Must be tone-mapped to SDR BT.709 in the cut phase, or it looks washed out in Remotion and on most phones |
| Audio | 1 stream, AAC stereo 44.1 kHz, 192 kb/s |
| Loudness (source) | -20.5 LUFS integrated, LRA 10.6 LU, true peak -0.7 dBFS |
| Metadata | No creation date, GPS or device tags (stripped by Drive) |
| Burned-in text | None seen |
| Speakers | 2 Lithuanian voices: the woman on camera and a second adult (off camera, probably filming). They talk to each other and to the viewer |

**What is on screen** (stills every 2 s in `verify/intake/`, not committed):
a family breakfast on a red wooden deck of a thatched beach restaurant, over turquoise water,
granite boulders and a small green island. The woman (blonde, sunglasses, red swimsuit) sits on an
orange cushion on the right side of the frame; the sea and island fill the left half, sky on top.

| Source time | Shot |
|---|---|
| 0–9 s | Medium, woman talks to camera, fruit bowl, sea and island behind |
| 9.5–11.5 s | Close-up: carved wooden room key tag **"TAO THONG 2 / ROOM No 1"** |
| 12–19 s | Wide: woman, sandwich, papaya salad, sea |
| 20–23 s | Close-up: yogurt bowl (dragon fruit, banana, granola) held over the deck |
| 24–41 s | Medium: she eats and talks, island behind |
| 42–49 s | Close-ups: chicken sandwich, hand closes it |
| 50 s | Medium: she points |
| 52–55 s | Close-ups: papaya salad, eggs in egg cups, pan over the sea |
| 56 s | Sea and island, table |
| 58 s | She gestures to camera |
| 60 s | Daughter on a teal bean bag under the roof, trees behind |
| 62–84 s | Medium, same angle: she eats and talks (price talk) |

## 2. What the video is about

**LT:** Šeima pusryčiauja paplūdimio restorane Koh Tao saloje (Tailande) su vaizdu į jūrą ir salą.
Rodo jogurto dubenėlį su vaisiais ir granola (užsisako jau trečią dieną), vaiko vištienos sumuštinį,
papajos salotas, ir paskaičiuoja, kiek kainavo: apie 400 batų, tai yra 10–12 eurų keturiems.

**EN:** A family eats breakfast at a beach restaurant on Koh Tao, Thailand, looking out over turquoise
water and a small island. They show the fruit, granola and yogurt bowl they have ordered three days
running, the kid's chicken sandwich and a papaya salad, then work out the bill: about 400 baht,
roughly 10 to 12 euros for four people.

## 3. Full transcript and translation

Word-level Lithuanian transcript: `edit/transcripts/source.json` (faster-whisper large-v3, CPU int8,
VAD on, 163 s run). Readable version: `edit/transcripts/source.txt`.
Times are source seconds. `[cut]` = proposed for removal (section 4).

| Source | Lithuanian (as transcribed) | English |
|---|---|---|
| 0.43–6.09 | Nu ką, esame Kotau ir pradėjome rytą štai nuo tokių pusryčių. | So, we're on Koh Tao, and we started the morning with a breakfast like this. |
| 7.01–9.01 `[cut]` | Parodyk, kur esame. | Show them where we are. |
| 9.83–10.9 | Galit pasižymėt, | You can save this spot. |
| 12.19–12.9 `[cut]` | kam įdomu, | if you're interested, |
| 13.27–17.6 | labai faina, labai graži, tokių vaizdų, tokie pusryčiai | Really nice, so beautiful. Views like this, breakfasts like this. |
| 17.71–18.6 `[cut]` | ir čionais yra... | and here there's... |
| 18.61–23.93 | Mes jau trečią dieną [?] užsisakome šitą jogurtą, salotytės, mangas. | Third day in a row we've ordered this yogurt bowl. Fruit salad, mango. |
| 24.13–25.57 | Švieži vaisiai, nu. | Fresh fruit. |
| 25.75–27.57 `[cut]` | Švieži vaisiai, [papajos?]. | Fresh fruit, papaya. (repeat) |
| 27.57–33.3 | Čia ir dragon fruitas yra, ir bananas sudėtas, ir biški riešutų, ir šito granolos, biški su jogurtu, | There's dragon fruit, banana, a few nuts, some granola, a bit of yogurt. |
| 33.5–35.47 `[cut]` | labai labai sotu iš tikrųjų, dieną užsotina, ne? | Really filling, keeps you full all day, right? (said again next line) |
| 35.65–40.33 | Labai sotu ir energingas, laimingas, nepersivalgęs, ir [plaukiam] toliau, ane? | Really filling. You feel energised, happy, not stuffed, and off you go, right? |
| 40.33–41.5 `[cut]` | Jo, tokia vaizda, nu ir | Yeah, a view like this. And |
| 41.6–46.57 | vaiko, va, chicken'o sandwich'is. Vaiko chicken'as, jisai, galima užsidėti visokių ir padažų, bet jisai nesideda. | the kid's chicken sandwich. You can add all kinds of sauces, but he skips them. |
| 46.67–49.87 `[cut]` | Bet kai gražiai paruošta, viskas, [danytė?], viskas, nu. | But it's all so nicely made. |
| 49.87–50.4 `[cut]` | Valgo, | Eat up. |
| 50.51–56.0 | o čia tavo bus papajos salotos, labai labai skanu, | And this one is your papaya salad. Really, really tasty. |
| 56.13–56.87 `[cut]` | labai išraiškinga skonio paletė, jo. | (said again next line) |
| 56.87–58.1 | Labai išraiškingo skonio, | Really bold flavours. |
| 58.6–62.13 | jau dukra, žinokit, tą patį patiekalą. Jau baigia suvalgyti. | And our daughter, you know, the same dish. She's almost finished it. |
| 62.17–63.1 `[cut]` | Baigia suvalgyti, | Almost finished, |
| 63.17–66.11 | tai realiai kiek mes čia išleidome, šiaip, realiai? | So how much did we actually spend here? Honestly? |
| 66.53–70.75 | Kiek mes išleidome, ne, dabar nežinau, 400 batų, gal? 400 batų. | How much did we spend... I'm not sure, 400 baht maybe? 400 baht. |
| 70.89–76.37 | Tai čia 10 eurų, gal 12 eurų, kažkas tokio, gal? 12 eurų keturiems asmenims, ne? | So that's 10 euros, maybe 12, something like that? 12 euros for four people, right? |
| 76.39–78.09 | Nu, pusryčiai, čia dar porą kiaušinių [gavau?]. | Well, breakfast, plus a couple of eggs. |
| 78.19–80.19 `[cut]` | 400 batų? Nu, [pataisykit?] mane. | 400 baht? Well, correct me. |
| 80.33–82.81 | Na, super, gerai, skanu [?] labai. Ačiū. | Great, really good, so tasty. Thank you! |

### Uncertain words (please check)

* **Kotau** (0.43 s, p=0.42): read as **Koh Tao**. The key tag "TAO THONG" agrees.
* **šeilės** (19.9 s): unclear, maybe "visi" or "čia". Left out of the English.
* **salatytės mangas** (21.8 s): read as "salotytės, mangas" (fruit salad, mango). No mango is clearly visible.
* **pavaugai** (26.8 s): maybe "papajos" (papaya). The line is cut anyway.
* **tie šeimi plaukai į toliau** (38.4 s): read as "ir plaukiam toliau" ("and off you go"), an idiom.
* **jisai** (43.5 s, 45.7 s): "he" (the child). The child at 60 s is called "dukra" (daughter); this may be a second child, or "jisai" may mean the sandwich. English uses "he"; I need to know who.
* **danytė** (48.5 s): unclear. The line is cut.
* **sponio paletį** (56.8 s): read as "skonio paletė" (flavour palette).
* **Ba** (68.8 s, 70.4 s, 78.3 s): read as **baht** (Thai currency).
* **asmenimui** (75 s): read as "asmenims" (people), so four people in total.
* **galau** (77.9 s): maybe "gavau" (I got) or "gale" (at the end). English: "plus a couple of eggs".
* **prašau mane** (79.3 s): maybe "pataisykit mane" (correct me). The line is cut.
* **skanau savo** (81.6 s): read as "skanu, labai" (very tasty).
* **Prices:** 400 baht is about €10–11 at current rates; they say "10, maybe 12 euros". Captions keep their words; the graphic says "≈ €12".

## 4. GATE A plan

The brief from the owner: **"professional, interesting, live, energetic edit".**

### 4.1 Tools in this session

Installed in this container: **no** video-use, Remotion or editor-pro-max skills. Only
`session-start-hook` and generic skills. Used instead:
* Transcription: faster-whisper large-v3 (in place of video-use / ElevenLabs).
* Cut: ffmpeg from an `edl.json`, unless video-use is installed on the owner's machine.
* Remotion: the repo's own `demo/` project already has `BaseVideo` (zooms), `KaraokeCaptions`,
  `PostcardTitle`, `WeatherBadge`, `SideNotes`, `Tagline`, `BrushStroke`, `Doodles`, plus bundled fonts
  (Great Vibes, Caveat, Montserrat). These get reused.
* **To build:** `HookTitle`, `Callout` (dish labels and price tag), `BRoll` (cutaways from the same
  source), `ProgressBar`, `Watermark`, `EndCard`, `SfxTrack`, `MusicBed`, the `Short` composition and its zod schema.

### 4.2 Outputs

* **One vertical video, 1080x1920, 30 fps**, for Instagram Reels, TikTok and YouTube Shorts.
* **No 16:9 version.** The source is portrait and only 84 s long.
* Cover: 1080x1920 (`out/thumb-short-1.jpg`).
* Cut phase: tone-map HDR HLG to SDR BT.709, conform 29.97 fps to 30, clean cut, no text.

### 4.3 Target length

**About 61 s of speech plus a 2.5 s end card, so about 63–64 s.** 16 kept segments, average shot
about 3.8 s, pauses over 300 ms removed. If the owner wants it under 45 s, drop segments 5, 10, 15 and 3,
and trim 7.

### 4.4 Story structure (keep and cut)

Output times are approximate until the cut is made.

| # | Source keep | Output | Beat | Content |
|---|---|---|---|---|
| 1 | 0.35–6.15 | 0.00–5.80 | **Hook + postcard** | "So, we're on Koh Tao, and we started the morning with a breakfast like this." |
| — | 6.15–9.60 | cut | | "Show them where we are", camera moves |
| 2 | 9.60–10.95 | 5.80–7.15 | Place reveal | key tag close-up, "You can save this spot." |
| — | 10.95–13.20 | cut | | pause, "if you're interested" |
| 3 | 13.20–17.65 | 7.15–11.60 | View | "Really nice, so beautiful. Views like this, breakfasts like this." |
| 4 | 18.55–23.95 | 11.60–17.00 | Dish 1 | yogurt bowl close-up, "third day in a row" |
| 5 | 24.10–25.05 | 17.00–17.95 | | "Fresh fruit." |
| — | 25.05–27.55 | cut | | repeated line |
| 6 | 27.55–33.35 | 17.95–23.75 | Ingredients | dragon fruit, banana, nuts, granola, yogurt |
| — | 33.35–35.60 | cut | | "really filling" (said twice) |
| 7 | 35.60–40.25 | 23.75–28.40 | Payoff 1 | "energised, happy, not stuffed, and off you go" |
| — | 40.25–41.55 | cut | | filler |
| 8 | 41.55–46.60 | 28.40–33.45 | Dish 2 | chicken sandwich close-ups |
| — | 46.60–50.45 | cut | | "nicely made", filler |
| 9 | 50.45–56.05 | 33.45–39.05 | Dish 3 | papaya salad close-up, "really, really tasty" |
| 10 | 56.85–58.15 | 39.05–40.35 | | "Really bold flavours." |
| 11 | 58.60–62.15 | 40.35–43.90 | Family | daughter shot, "almost finished it" |
| — | 62.15–63.10 | cut | | repeat |
| 12 | 63.10–66.15 | 43.90–46.95 | **Price question** | "So how much did we actually spend?" |
| 13 | 66.50–70.80 | 46.95–51.25 | | "400 baht maybe? 400 baht." |
| 14 | 70.85–76.38 | 51.25–56.78 | **Punchline** | "…12 euros for four people, right?" |
| 15 | 76.38–78.10 | 56.78–58.50 | | "plus a couple of eggs" |
| — | 78.10–80.30 | cut | | "400 baht? correct me" |
| 16 | 80.30–82.85 | 58.50–61.05 | Outro | "Great, so tasty. Thank you!" |
| End card | freeze or hold on last frame | 61.05–63.55 | CTA | Follow @badiesflowers |

Segments 12–14 are one fixed angle. To hide those jump cuts, they get 2–3 s B-roll cutaways from the
same footage (voice continues): bowl 20.0–22.5, papaya and eggs 52.2–55.0, sandwich 43.5–46.0.

### 4.5 The 2-second hook

* **0.0–1.8 s:** HookTitle **"€12 breakfast for 4?"** (Montserrat 800, white with dark shadow, "€12" on a
  pink brush stroke). It adds information the voice does not give until 56 s.
* Snap zoom 1.15 on "Koh Tao" (about 1.3 s), focus on her face.
* A whoosh plays on the title entrance.
* **Option B** (owner choice): cold-open with 1.5 s of segment 14 ("12 euros for four people, right?"),
  then cut to the intro. This hooks harder but is less "postcard".

### 4.6 Zooms

About 14 zooms in 61 s (one every 3–5 s, never two within 1.5 s), scale 1.08–1.18 (source is
1080-wide, so 1.2 is the maximum). They alternate snap and slow push-in, land on emphasis words and reset at every cut.
Planned spots: "Koh Tao", "beautiful", "third day", "dragon fruit", "energised", "chicken sandwich",
"really, really tasty", "daughter", "how much", "400 baht", "12 euros", "four people", "Thank you".
No zooms on the close-up food shots, which are already tight; those get a slow 1.05 push-in at most.

### 4.7 Postcard graphics (section 6a)

Only from what is said or seen:
* **PostcardTitle** (top centre, 1.6–6.0 s): script title **"Koh Tao"** (said at 1.6 s) with a pink heart and a white palm doodle;
  pink brush stroke underneath: **"Breakfast at Tao Thong"** (from the key tag); then **THAILAND 🇹🇭** in spaced caps
  (inferred from "baht" and Koh Tao; not said).
* **WeatherBadge** (top right): **date and temperature are needed from the owner.** The file has no date. Without them, the badge is dropped.
* **SideNotes** (left edge, over sea and sky, 7.2–11.6 s, 350 ms apart):
  "Turquoise Water ♡", "Island View ♡", "Fresh Fruit Bowls ♡", "Breakfast by the Sea ♡". The first is white with no patch, over the sky.
* **Tagline** (bottom right, 24.5–28.0 s): "Happy, Full & Off We Go ♡" (from her line at 38 s).
* **Doodles:** palm by the title, small sun on the badge.
* **Dish labels** (`Callout`, Caveat on a pink stroke, near the dish): "Day 3: Yogurt Bowl" (12.0 s),
  "Kid's Chicken Sandwich" (28.6 s), "Papaya Salad" (33.6 s).
* **Price tag** (`Callout`, punchline, 47–57 s): "400 ฿" pops in at 47.2 s, then "≈ €12 for 4" at 52.5 s.
* **Watermark** "@badiesflowers", low opacity, top left inside the safe area.
* **ProgressBar**, thin, top edge.
* **EndCard** 61.0–63.5 s: "Follow @badiesflowers for more Koh Tao".
* All text stays inside the 9:16 safe areas (not in the top 250 px, bottom 450 px or right 130 px). Her face sits right of centre, so the notes go left.

### 4.8 Captions

English karaoke (section 7): Montserrat 800, white with black outline; the active word is yellow `#FFD400` with a small scale pop; 2–3 words per page;
lower middle, above the 450 px bottom safe area. Emphasis words stay yellow: Koh Tao, beautiful, third day,
dragon fruit, energised, chicken sandwich, tasty, bold, 400 baht, 12 euros, four people.
The caption steps aside (fades) while a dish label or the price tag is on screen, so only one new element appears at a time.

Full English caption text (in order of the cut):

> So, we're on Koh Tao, and we started the morning with a breakfast like this.
> You can save this spot.
> Really nice, so beautiful. Views like this, breakfasts like this.
> Third day in a row we've ordered this yogurt bowl. Fruit salad, mango.
> Fresh fruit.
> There's dragon fruit, banana, a few nuts, some granola, a bit of yogurt.
> Really filling. You feel energised, happy, not stuffed, and off you go, right?
> The kid's chicken sandwich. You can add all kinds of sauces, but he skips them.
> And this one is your papaya salad. Really, really tasty.
> Really bold flavours.
> And our daughter, you know, the same dish. She's almost finished it.
> So how much did we actually spend here? Honestly?
> How much did we spend… I'm not sure, 400 baht maybe? 400 baht.
> So that's 10 euros, maybe 12, something like that? 12 euros for four people, right?
> Well, breakfast, plus a couple of eggs.
> Great, really good, so tasty. Thank you!

### 4.9 Sound

* **Effects** (about 9, each tied to a visible event, about -14 to -18 dB under the voice): whoosh on the hook title,
  soft brush swish on the postcard stroke, a light pop on each dish label (3), a "ka-ching" on "400 ฿",
  a pop on "≈ €12 for 4", a whoosh into the end card. No effects on side notes or zooms.
* **Music**, two contrasting beds for the owner to choose:
  **A)** sunny acoustic or ukulele with a light beat, about 100–110 BPM (warm, travel-diary feel);
  **B)** upbeat tropical house, about 118–124 BPM (more "live and energetic", matches the brief).
  The bed is ducked about 13 dB under speech, sits at about -22 dB, and fades out over 1.5 s before the end-card CTA.
  Needs a licence-safe track (YouTube Audio Library or the owner's licensed library); none is in the repo yet.
* **Master:** two-pass loudnorm to -14 LUFS integrated, true peak ≤ -1 dBTP (source is -20.5 LUFS, peak -0.7).
* I cannot listen to audio. I will report measured numbers only.

### 4.10 Thumbnail candidates (3 source timecodes)

1. **2.0 s:** woman smiling at the camera in the clear middle, sea and island behind. Strongest face-plus-place frame.
2. **15.0 s:** wide shot with deck, island, turquoise water and her in profile. Best scenery.
3. **20.5 s:** yogurt bowl held over the deck with sea behind (food hero, no face).

Title on the cover: **"Koh Tao"** (script), with "€12 breakfast for 4" on a pink stroke. The bottom-right corner stays free.
She wears sunglasses in every frame, so "eyes open" cannot be checked.

### 4.11 Assumptions

* One vertical deliverable only; no Shorts split, because the source is already a single 84 s short.
* "Energetic" means tight cuts (every 3–4 s), the medium-high end of zoom density and bed B as the
  recommendation, while keeping the warm postcard look from CLAUDE.md.
* Country (Thailand) and the venue name (Tao Thong) come from the key tag and "baht", not from the speech.
* The two adults are a couple and the child is their daughter (from "dukra"); four people at the table.

### 4.12 Open questions for the owner

1. **Date and temperature** for the WeatherBadge (or drop the badge)?
2. Is the restaurant/hotel name **"Tao Thong"** (Tao Thong Villa?) correct and OK to show?
3. Hook: **A** (title over the intro, recommended) or **B** (cold-open with the "€12 for four" line)?
4. Music: bed **A** (acoustic) or **B** (tropical house)? Do you have a track or library?
5. "jisai" at 43–46 s: is the sandwich for a son (a second child) or for the daughter?
6. Is about 63 s right, or do you want a tighter version under 45 s?
7. Show the face of the daughter (60 s) or skip that shot?
8. Thumbnail: which of the 3 frames?

## 5. Decisions log

* 2026-10-08: intake done, plan proposed (this file). Waiting for GATE A.
