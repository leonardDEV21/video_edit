# Project: Koh Tao breakfast (first video)

Status: **Phase 1, GATE A (revision 2, after owner answers). Waiting for approval. Nothing has been cut or rendered.**

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

## 1a. Location (confirmed)

* **Venue:** Tao Thong Villa 2 (owner confirmed; carved key tag at 10 s reads "TAO THONG 2 / ROOM No 1").
* **Where:** Laem Je Da Kang (Cape Jeda Kang), southwest tip of **Koh Tao**, Surat Thani province, **Thailand**.
  It is a short walk from Tao Thong beach, on the coastal path between Mae Haad and Sai Nuan.
* **Coordinates:** **10.06935 N, 99.81694 E**. Source: OpenStreetMap node "Tao Thong Villa 2".
  The TravelFish GPS listing (10.0701 N, 99.8170 E) agrees to within about 100 m.
  Tao Thong Villa 1 is a separate property about 60 m away.
* **Map stills** (OSM tiles, `© OpenStreetMap contributors`), not committed:
  `verify/map/map_1_thailand.jpg`, `map_2_koh_tao.jpg` and `map_3_villa.jpg` (1080x1920 each).

## 1b. Prices

They paid **400 baht** for breakfast for four.
* Rate: ECB reference rate on the shoot day, 7 Oct 2026 (via frankfurter.dev): **1 EUR = 37.661 THB**.
* **400 THB ≈ €10.62 for 4, so 100 THB ≈ €2.66 per person.**
* In the video they guess "10 euros, maybe 12". The captions keep their words; the price graphic shows the real conversion.

## 2. What the video is about

**LT:** Šeima pusryčiauja paplūdimio restorane Koh Tao saloje (Tailande) su vaizdu į jūrą ir salą.
Rodo jogurto dubenėlį su vaisiais ir granola (užsisako jau trečią dieną), sūnaus vištienos sumuštinį,
papajos salotas, ir paskaičiuoja, kiek kainavo: apie 400 batų, tai yra 10–12 eurų keturiems.

**EN:** A family eats breakfast at a beach restaurant on Koh Tao, Thailand, looking out over turquoise
water and a small island. They show the fruit, granola and yogurt bowl they have ordered three days
running, their son's chicken sandwich and a papaya salad, then work out the bill: about 400 baht,
about €10.62 for four people.

## 3. Full transcript and translation

Word-level Lithuanian transcript: `edit/transcripts/source.json` (faster-whisper large-v3, CPU int8,
VAD on, 163 s run). Readable version: `edit/transcripts/source.txt`.
Times are source seconds. = proposed for removal (section 4).

| Source | Lithuanian (as transcribed) | English |
|---|---|---|
| 0.43–6.09 | Nu ką, esame Kotau ir pradėjome rytą štai nuo tokių pusryčių. | So, we're on Koh Tao, and we started the morning with a breakfast like this. |
| 7.01–9.01 | Parodyk, kur esame. | Show them where we are. |
| 9.83–10.9 | Galit pasižymėt, | You can save this spot. |
| 12.19–12.9 | kam įdomu, | if you're interested, |
| 13.27–17.6 | labai faina, labai graži, tokių vaizdų, tokie pusryčiai | Really nice, so beautiful. Views like this, breakfasts like this. |
| 17.71–18.6 | ir čionais yra... | and here there's... |
| 18.61–23.93 | Mes jau trečią dieną [?] užsisakome šitą jogurtą, salotytės, mangas. | Third day in a row we've ordered this yogurt bowl. Fruit salad, mango. |
| 24.13–25.57 | Švieži vaisiai, nu. | Fresh fruit. |
| 25.75–27.57 | Švieži vaisiai, [papajos?]. | Fresh fruit, papaya. |
| 27.57–33.3 | Čia ir dragon fruitas yra, ir bananas sudėtas, ir biški riešutų, ir šito granolos, biški su jogurtu, | There's dragon fruit, banana, a few nuts, some granola, a bit of yogurt. |
| 33.5–35.47 | labai labai sotu iš tikrųjų, dieną užsotina, ne? | Really filling, honestly. Keeps you full all day, right? |
| 35.65–40.33 | Labai sotu ir energingas, laimingas, nepersivalgęs, ir [plaukiam] toliau, ane? | Really filling. You feel energised, happy, not stuffed, and off you go, right? |
| 40.33–41.5 | Jo, tokia vaizda, nu ir | Yeah, a view like this. And |
| 41.6–46.57 | vaiko, va, chicken'o sandwich'is. Vaiko chicken'as, jisai, galima užsidėti visokių ir padažų, bet jisai nesideda. | our son's chicken sandwich. You can add all kinds of sauces, but he doesn't. |
| 46.67–49.87 | Bet kai gražiai paruošta, viskas, [danytė?], viskas, nu. | But it's all so nicely made. |
| 49.87–50.4 | Valgo, | He's eating. |
| 50.51–56.0 | o čia tavo bus papajos salotos, labai labai skanu, | And this one is your papaya salad. Really, really tasty. |
| 56.13–56.87 | labai išraiškinga skonio paletė, jo. | Such a bold mix of flavours. |
| 56.87–58.1 | Labai išraiškingo skonio, | Really bold flavours. |
| 58.6–62.13 | jau dukra, žinokit, tą patį patiekalą. Jau baigia suvalgyti. | And our daughter, you know, the same dish. She's almost finished it. |
| 62.17–63.1 | Baigia suvalgyti, | Almost finished, |
| 63.17–66.11 | tai realiai kiek mes čia išleidome, šiaip, realiai? | So how much did we actually spend here? Honestly? |
| 66.53–70.75 | Kiek mes išleidome, ne, dabar nežinau, 400 batų, gal? 400 batų. | How much did we spend... I'm not sure, 400 baht maybe? 400 baht. |
| 70.89–76.37 | Tai čia 10 eurų, gal 12 eurų, kažkas tokio, gal? 12 eurų keturiems asmenims, ne? | So that's 10 euros, maybe 12, something like that? 12 euros for four people, right? |
| 76.39–78.09 | Nu, pusryčiai, čia dar porą kiaušinių [gavau?]. | Well, breakfast, plus a couple of eggs. |
| 78.19–80.19 | 400 batų? Nu, [pataisykit?] mane. | 400 baht? Well, correct me. |
| 80.33–82.81 | Na, super, gerai, skanu [?] labai. Ačiū. | Great, really good, so tasty. Thank you! |

### Uncertain words (please check)

* **Kotau** (0.43 s, p=0.42): read as **Koh Tao**. The key tag "TAO THONG" agrees.
* **šeilės** (19.9 s): unclear, maybe "visi" or "čia". Left out of the English.
* **salatytės mangas** (21.8 s): read as "salotytės, mangas" (fruit salad, mango). No mango is clearly visible.
* **pavaugai** (26.8 s): maybe "papajos" (papaya). 
* **tie šeimi plaukai į toliau** (38.4 s): read as "ir plaukiam toliau" ("and off you go"), an idiom.
* **jisai** (43.5 s, 45.7 s): "he" = **their son** (owner confirmed; he is not in frame).
* **danytė** (48.5 s): unclear, left out of the English.
* **sponio paletį** (56.8 s): read as "skonio paletė" (flavour palette).
* **Ba** (68.8 s, 70.4 s, 78.3 s): read as **baht** (Thai currency).
* **asmenimui** (75 s): read as "asmenims" (people), so four people in total.
* **galau** (77.9 s): maybe "gavau" (I got) or "gale" (at the end). English: "plus a couple of eggs".
* **prašau mane** (79.3 s): maybe "pataisykit mane" (correct me).
* **skanau savo** (81.6 s): read as "skanu, labai" (very tasty).
* **Prices:** 400 baht ≈ €10.62 (section 1b); they say "10, maybe 12 euros". Captions keep their words; the graphic shows the real rate.

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
* **To build:** `HookTitle`, `MapZoom`, `Callout` (dish labels and price tag), `BRoll` (cutaways from the same
  source), `ProgressBar`, `Watermark`, `EndCard`, `SfxTrack`, `MusicBed`, the `Short` composition and its zod schema.

### 4.2 Outputs

* **One vertical video, 1080x1920, 30 fps**, for Instagram Reels, TikTok and YouTube Shorts.
* **No 16:9 version.** The source is portrait.
* Cover: 1080x1920 (`out/thumb-short-1.jpg`).
* Cut phase: tone-map HDR HLG to SDR BT.709, conform 29.97 fps to 30, no text.

### 4.3 Length: full video, no skipping (owner decision)

The owner asked to show the whole video. **Every line and every shot stays.**
Only the silent lead-in (0–0.35 s) and the tail after "Ačiū" (82.9–84.3 s) are trimmed.
That gives **about 82.5 s of footage plus a 2.5 s end card, so about 85 s**.
Repeated lines are kept, and the energy comes from zooms, graphics, the map insert and the music instead of cuts.

### 4.4 Story structure (full video, output ≈ source time − 0.35 s)

| Source | Beat | What happens on top |
|---|---|---|
| 0.35–6.1 | **Hook + postcard** | Hook title, snap zoom, then the postcard opener |
| 6.1–9.6 | **"Show them where we are" → MAP** | Fullscreen animated map insert (section 4.7a), voice continues |
| 9.6–12.0 | Key tag close-up | "You can save this spot", label "Tao Thong Villa 2 · Room 1" |
| 12.0–18.6 | View | Side notes on the sea side |
| 18.6–27.6 | Dish 1: yogurt bowl | Label "Day 3: Yogurt Bowl", push-in on the bowl |
| 27.6–40.3 | Ingredients → "off you go" | Ingredient doodles, tagline |
| 40.3–49.9 | Dish 2: son's chicken sandwich | Label "Son's Chicken Sandwich", close-ups |
| 49.9–58.5 | Dish 3: papaya salad | Label "Papaya Salad" |
| 58.5–63.1 | Daughter (owner OK to show) | Small pink heart doodle |
| 63.1–78.1 | **Price talk** | Price tag build, plus 2–3 s food cutaways over the fixed angle |
| 78.1–82.9 | Outro: "correct me… great, so tasty. Thank you!" | Captions only, then the end card |
| 82.9–85.4 | End card | Follow @badiesflowers |

Segments 63–78 s are one fixed camera angle. To keep them lively there are cutaways
from the same footage (voice continues): bowl 20.0–22.5, papaya and eggs 52.2–55.0, sandwich 43.5–46.0.
These are B-roll overlays, not cuts, so no audio is skipped.

### 4.5 The 2-second hook

* **0.0–1.8 s:** HookTitle **"Breakfast for 4 = 400 ฿"**, with "400 ฿" on a pink brush stroke.
  This is information the voice gives only at 66 s.
* Snap zoom 1.15 on "Koh Tao" (about 1.3 s), with a whoosh on the title.

### 4.6 Zooms

About 16 zooms over 82 s (one every 4–6 s, never two within 1.5 s), at 1.08–1.18x. They alternate snap and slow push-in, land on emphasis words and reset at each scene change.
Planned spots: "Koh Tao", "beautiful", "third day", "fresh fruit", "dragon fruit", "really filling", "energised",
"chicken sandwich", "really, really tasty", "bold flavours", "daughter", "how much", "400 baht", "12 euros",
"four people", "Thank you". The food close-ups get only a slow 1.05x push-in.

### 4.7 Postcard graphics (section 6a)

* **PostcardTitle** (top centre, 1.6–6.0 s): script **"Koh Tao"** with a pink heart and a palm doodle,
  pink brush stroke **"Tao Thong Villa 2"**, then **THAILAND 🇹🇭**.
* **WeatherBadge** (top right, 2.0–6.0 s): **"October 7"** on a pink stroke, yellow sun, **30°C** (owner confirmed).
* **SideNotes** (left edge, over sea and sky, 12.0–17.5 s, 350 ms apart):
  "Turquoise Water ♡", "Island View ♡", "Fresh Fruit Bowls ♡", "Breakfast by the Sea ♡".
* **Tagline** (bottom right, 36.0–40.0 s): "Happy, Full & Off We Go ♡".
* **Dish labels** (`Callout`, Caveat on pink): "Tao Thong Villa 2 · Room 1" (9.8 s), "Day 3: Yogurt Bowl" (19.0 s),
  "Son's Chicken Sandwich" (42.0 s), "Papaya Salad" (51.5 s).
* **Price tag** (`Callout`):
  * "400 ฿" pops in at 68.4 s ("400 baht").
  * "≈ €10.62 for 4" builds at 72.3 s.
  * "≈ €2.66 each" appears at 75.0 s ("for four people").
  * The rate (1 EUR = 37.661 THB, ECB, 7 Oct 2026) goes in the project notes, not on screen.
* **Watermark** "@badiesflowers", **ProgressBar** and **EndCard** "Follow @badiesflowers for more Koh Tao".
* All text stays inside the 9:16 safe areas; the notes go left, away from her face.

### 4.7a Map insert ("Show them where we are", 6.2–9.6 s)

This is a new `MapZoom` component, fullscreen 1080x1920, while the voice continues.
* 6.2–7.2 s: map of Thailand with a pink pin and "Koh Tao".
* 7.2–8.3 s: smooth zoom (eased, from `useCurrentFrame`) into Koh Tao. The pin moves to the southwest cape.
* 8.3–9.6 s: close map with "Tao Thong Villa 2" on a pink stroke and a tiny "10.069° N, 99.817° E" in Caveat. A soft pop plays when the pin lands.
* It hands off on a hard cut to the real key-tag shot at 9.6 s.
* Built from three prerendered OSM map stills (`public/map/`) with a crossfade-zoom between them, with attribution
  "© OpenStreetMap contributors" in small text, as the OSM licence requires.
* Drafts are in `verify/map/`.

### 4.8 Captions

English karaoke (section 7): Montserrat 800, white with a black outline; the active word is yellow `#FFD400` with a pop;
2–3 words per page, lower middle above the 450 px bottom safe area. Emphasis words stay yellow.
Captions fade while the map, a dish label or the price tag animates in.

Full English caption text:

> So, we're on Koh Tao, and we started the morning with a breakfast like this.
> Show them where we are.
> You can save this spot, if you're interested. Really nice, so beautiful. Views like this, breakfasts like this. And here there's…
> Third day in a row we've ordered this yogurt bowl. Fruit salad, mango.
> Fresh fruit. Fresh fruit, papaya.
> There's dragon fruit, banana, a few nuts, some granola, a bit of yogurt.
> Really filling, honestly. Keeps you full all day, right?
> Really filling. You feel energised, happy, not stuffed, and off you go, right?
> Yeah, a view like this. And our son's chicken sandwich. You can add all kinds of sauces, but he doesn't.
> But it's all so nicely made.
> He's eating. And this one is your papaya salad. Really, really tasty. Such a bold mix of flavours.
> Really bold flavours. And our daughter, you know, the same dish. She's almost finished it.
> Almost finished. So how much did we actually spend here? Honestly?
> How much did we spend… I'm not sure, 400 baht maybe? 400 baht.
> So that's 10 euros, maybe 12, something like that? 12 euros for four people, right?
> Well, breakfast, plus a couple of eggs. 400 baht? Well, correct me.
> Great, really good, so tasty. Thank you!

### 4.9 Sound

* **Effects** (about 11): whoosh on the hook, brush swish on the postcard stroke, whoosh into the map, pop on the map pin,
  4 label pops, "ka-ching" on "400 ฿", pop on "≈ €10.62", whoosh into the end card. Each sits about -14 to -18 dB below the voice.
* **Music:** two options. A is sunny acoustic or ukulele at about 105 BPM. B is upbeat tropical house at about 120 BPM, which I recommend for "energetic".
  The bed is ducked about 13 dB under speech, sits at about -22 dB and fades out before the end-card CTA. It needs a licence-safe track.
* **Master:** two-pass loudnorm to -14 LUFS, true peak ≤ -1 dBTP (source is -20.5 LUFS, peak -0.7).
* I cannot listen to audio, so I'll report measured numbers only.

### 4.10 Thumbnail candidates

1. **2.0 s:** looking at the camera, with sea and island. Her mouth is open mid-word; a nearby frame with the mouth closed can be found if this one wins.
2. **15.0 s:** wide shot of the deck, island and turquoise water.
3. **20.5 s:** the yogurt bowl over the sea.

**Owner picked frame 2 (15.0 s).** The cover is that frame dressed up in the postcard style, as a Remotion still from the timeline:
* script **"Koh Tao"** large, white, tilted, top centre over the sky, with a pink heart and a palm doodle;
* pink brush stroke **"Breakfast for 4 = 400 ฿"**;
* small spaced caps **"TAO THONG VILLA 2 · THAILAND 🇹🇭"**;
* a light 1.05 crop centred on her and the island. The face stays clear, the bottom-right corner stays free, and there are no captions.
Readability will be checked on a 320 px wide copy. Output: `out/thumb-short-1.jpg` (1080x1920).

### 4.11 Assumptions

* The whole video is kept ("show all video, no skipping"), with trims only of silence at the very start and end.
* The date is 7 October 2026 and the temperature 30°C (owner confirmed).
* Four people: two adults, a daughter (in frame at 60 s) and a son (not in frame).
* The price graphic uses the ECB rate of the shoot day (7 Oct 2026).

### 4.12 Open questions for the owner

1. Music A or B, and do you have a track or a library?
2. Is the map insert at "show them where we are" OK (3.4 s fullscreen, voice continues)?

## 5. Decisions log

* 2026-10-08: intake done, plan proposed. Waiting for GATE A.
* 2026-10-08, owner answers: the venue is Tao Thong Villa 2 (confirmed on OSM, 10.06935 N, 99.81694 E); add a map visual;
  show prices in baht and EUR; date "9/10", 30°C; "he" = son, not in frame; **show the whole video, no skipping**.
  Plan revised to rev 2.
* 2026-10-08: the owner corrected the date to **7 October** (30°C). The price rate is now the ECB rate of 7 Oct (37.661 THB/EUR). Thumbnail stills shown; the owner picked 15.0 s, dressed in the postcard style.
* Style rule learned: this owner prefers keeping the full talk; get energy from graphics, zooms and music, not cuts.
