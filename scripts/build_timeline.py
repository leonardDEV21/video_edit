"""Build edit/timeline.json from the word-level transcript and the plan in edit/project.md.

All times written are milliseconds on the output timeline (the cut starts at source 0.35 s).
All money values are computed here from one rate, never typed by hand.
Run: python3 scripts/build_timeline.py
"""
import json
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = json.loads((ROOT / "edit/transcripts/source.json").read_text())
EDL = json.loads((ROOT / "edit/edl.json").read_text())
OFFSET_S = EDL["segments"][0]["sourceStart"]  # 0.35
CUT_MS = 82700  # ffprobe of edit/cut.mp4: 2481 frames at 30 fps
END_CARD_MS = 2000
FPS = 30

# ---- Money: one source of truth --------------------------------------------
# ECB reference rate on the shoot day, 7 Oct 2026 (api.frankfurter.dev/v1/2026-10-07?from=EUR&to=THB)
EUR_THB = Decimal("37.661")
BILL_THB = Decimal("400")
PEOPLE = 4
bill_eur = (BILL_THB / EUR_THB).quantize(Decimal("0.01"), ROUND_HALF_UP)
each_thb = BILL_THB / PEOPLE
each_eur = (BILL_THB / EUR_THB / PEOPLE).quantize(Decimal("0.01"), ROUND_HALF_UP)
MONEY = {
    "rateEurThb": str(EUR_THB),
    "rateDate": "2026-10-07",
    "rateSource": "ECB reference rate via api.frankfurter.dev",
    "billThb": int(BILL_THB),
    "people": PEOPLE,
    "billEur": str(bill_eur),
    "eachThb": int(each_thb),
    "eachEur": str(each_eur),
}

# ---- Words ------------------------------------------------------------------
words = [w for s in SRC["segments"] for w in s["words"]]


def out_ms(t):
    return int(round((t - OFFSET_S) * 1000))


# Phrases: (first word source start, last word source start, English, emphasis words)
# The window is first word start -> last word end, from the transcript.
PHRASES = [
    (0.43, 1.63, "So, we're on Koh Tao,", {"Koh", "Tao"}),
    (2.35, 5.17, "and we started the morning with a breakfast like this.", {"breakfast"}),
    (7.01, 8.59, "Show them where we are.", set()),
    (9.83, 10.41, "You can save this spot,", {"save"}),
    (12.19, 12.73, "if you're interested.", set()),
    (13.27, 14.93, "Really nice, so beautiful.", {"beautiful"}),
    (15.41, 17.09, "Views like this, breakfasts like this.", {"Views"}),
    (17.71, 18.23, "And here there's...", set()),
    (18.61, 20.87, "Third day in a row we've ordered", {"Third", "day"}),
    (21.13, 23.35, "this yogurt bowl. Fruit salad, mango.", {"yogurt", "bowl"}),
    (24.13, 25.51, "Fresh fruit.", {"Fresh"}),
    (25.75, 26.83, "Fresh fruit, papaya.", set()),
    (27.57, 29.27, "There's dragon fruit, and banana,", {"dragon", "fruit"}),
    (30.05, 33.11, "a few nuts, some granola, a bit of yogurt.", {"granola"}),
    (33.51, 35.37, "Really filling, honestly. Keeps you full all day, right?", {"filling"}),
    (35.65, 37.31, "Really filling. You feel energised, happy, not stuffed,", {"energised", "happy"}),
    (38.23, 40.17, "and off you go, right?", set()),
    (40.33, 41.39, "Yeah, a view like this.", set()),
    (41.49, 42.85, "And our son's chicken sandwich.", {"chicken", "sandwich"}),
    (42.87, 45.15, "You can add all kinds of sauces,", {"sauces"}),
    (45.57, 45.99, "but he doesn't.", set()),
    (46.67, 49.73, "But it's all so nicely made.", {"nicely"}),
    (49.87, 49.87, "He's eating.", set()),
    (50.51, 52.91, "And this one is your papaya salad.", {"papaya", "salad"}),
    (54.07, 55.53, "Really, really tasty.", {"tasty"}),
    (55.87, 56.77, "Such a bold mix of flavours.", set()),
    (56.87, 57.75, "Really bold flavours.", {"bold"}),
    (58.17, 60.05, "And our daughter, you know, the same dish.", {"daughter"}),
    (60.91, 61.69, "She's almost finished it.", set()),
    (62.17, 62.49, "Almost finished.", set()),
    (63.17, 65.87, "So how much did we actually spend here? Honestly?", {"how", "much"}),
    (66.53, 68.03, "How much did we spend... I'm not sure,", set()),
    (68.39, 69.51, "400 baht maybe?", {"400", "baht"}),
    (69.91, 70.37, "400 baht.", {"400", "baht"}),
    (70.89, 73.55, "So that's 10 euros, maybe 12, something like that?", {"10", "euros"}),
    (73.77, 76.27, "12 euros for four people, right?", {"12", "euros", "four", "people"}),
    (76.39, 77.85, "Well, breakfast, plus a couple of eggs.", {"eggs"}),
    (78.19, 78.33, "400 baht?", {"400", "baht"}),
    (78.59, 79.99, "Well, correct me.", set()),
    (80.33, 82.09, "Great, really good, so tasty.", {"tasty"}),
    (82.45, 82.45, "Thank you!", {"Thank", "you"}),
]

MIN_WORD_MS = 120


def window(first_start, last_start):
    ws = [w for w in words if first_start - 0.005 <= w["start"] <= last_start + 0.005]
    assert ws, (first_start, last_start)
    return out_ms(ws[0]["start"]), out_ms(ws[-1]["end"])


phrases = []
for a, b, en, emph in PHRASES:
    s, e = window(a, b)
    phrases.append({"startMs": s, "endMs": e, "text": en, "emph": emph})

# Merge a phrase into the next when it is too short for its English words.
merged = []
i = 0
while i < len(phrases):
    p = dict(phrases[i])
    while len(p["text"].split()) * MIN_WORD_MS > p["endMs"] - p["startMs"] and i + 1 < len(phrases):
        n = phrases[i + 1]
        # Only stretch into the gap before the next phrase first.
        gap_end = n["startMs"]
        if gap_end - p["startMs"] >= len(p["text"].split()) * MIN_WORD_MS:
            p["endMs"] = p["startMs"] + len(p["text"].split()) * MIN_WORD_MS
            break
        p = {"startMs": p["startMs"], "endMs": n["endMs"], "text": p["text"] + " " + n["text"], "emph": p["emph"] | n["emph"]}
        i += 1
    merged.append(p)
    i += 1

captions = []
for p in merged:
    toks = p["text"].split()
    dur = p["endMs"] - p["startMs"]
    weights = [max(len(t.strip(".,!?")), 2) for t in toks]
    total = sum(weights)
    t = p["startMs"]
    for k, (tok, wt) in enumerate(zip(toks, weights)):
        d = max(MIN_WORD_MS, round(dur * wt / total))
        end = p["endMs"] if k == len(toks) - 1 else min(t + d, p["endMs"])
        captions.append({"text": tok, "startMs": t, "endMs": max(end, t + MIN_WORD_MS), "emphasis": tok.strip(".,!?") in p["emph"]})
        t = captions[-1]["endMs"]

# ---- Zooms (output ms). Snap on the word, push for slow moves. Never inside map / B-roll.
Z = lambda at, dur, sc, style, fx, fy: {"atMs": at, "durationMs": dur, "scale": sc, "style": style, "focus": [fx, fy]}
zooms = [
    Z(out_ms(1.63), 1500, 1.15, "snap", 0.72, 0.32),   # Koh Tao
    Z(out_ms(3.85), 1900, 1.08, "push", 0.62, 0.40),   # morning
    Z(out_ms(14.93), 1500, 1.12, "snap", 0.72, 0.42),  # beautiful
    Z(out_ms(19.70), 2900, 1.08, "push", 0.50, 0.55),  # bowl close-up
    Z(out_ms(24.13), 1300, 1.12, "snap", 0.62, 0.38),  # Fresh fruit
    Z(out_ms(27.85), 2400, 1.10, "push", 0.66, 0.38),  # dragon fruit
    Z(out_ms(31.99), 1300, 1.10, "snap", 0.64, 0.40),  # granola
    Z(out_ms(34.03), 1300, 1.12, "snap", 0.66, 0.38),  # filling
    Z(out_ms(35.83), 2000, 1.10, "push", 0.64, 0.40),  # energised
    Z(out_ms(42.27), 3000, 1.08, "push", 0.50, 0.50),  # sandwich close-up
    Z(out_ms(51.75), 2700, 1.08, "push", 0.50, 0.55),  # papaya close-up
    Z(out_ms(58.85), 1300, 1.10, "snap", 0.62, 0.36),  # daughter
    Z(out_ms(63.33), 1300, 1.12, "snap", 0.66, 0.36),  # actually
    Z(out_ms(68.39), 1500, 1.15, "snap", 0.66, 0.36),  # 400 baht
    Z(out_ms(71.51), 1800, 1.10, "push", 0.64, 0.38),  # 10 euros
    Z(out_ms(73.77), 1400, 1.15, "snap", 0.66, 0.36),  # 12 euros for four
    Z(out_ms(80.59), 1400, 1.10, "snap", 0.64, 0.38),  # super
    Z(out_ms(82.45), CUT_MS - out_ms(82.45), 1.12, "snap", 0.64, 0.38),  # Thank you
]

MAP = (out_ms(6.2), out_ms(9.6))
BROLL = []  # Critic: inserts replayed shots and hid footage; owner wants the whole video

fmt_eur = lambda d: f"€{d}"
graphics = [
    {"type": "hookTitle", "startMs": 0, "endMs": 1550, "text": "Breakfast for 4", "highlight": f"{MONEY['billThb']} baht"},
    {"type": "postcardTitle", "startMs": 1650, "endMs": MAP[0], "title": "Koh Tao", "place": "Tao Thong Villa 2", "country": "THAILAND", "flag": "TH"},
    {"type": "weatherBadge", "startMs": 2300, "endMs": MAP[0], "date": "October 7", "tempC": 30, "icon": "sun"},
    {"type": "mapZoom", "startMs": MAP[0], "endMs": MAP[1], "lat": 10.06935, "lon": 99.81694, "label": "Tao Thong Villa 2", "region": "Koh Tao",
     "stages": [{"src": f"map/z{z}.jpg", "zoom": z} for z in (7, 9, 10, 12, 13, 15, 16)],
     "attribution": "© OpenStreetMap contributors"},
    {"type": "callout", "startMs": out_ms(9.85), "endMs": out_ms(12.1), "text": "Tao Thong Villa 2 · Room 1", "anchor": "topLeft"},
    {"type": "sideNotes", "startMs": out_ms(12.4), "endMs": out_ms(17.9), "side": "left", "notes": ["Turquoise Water", "Island View", "Fresh Fruit Bowls", "Breakfast by the Sea"]},
    {"type": "callout", "startMs": out_ms(18.95), "endMs": out_ms(22.4), "text": "Day 3 of the Same Bowl", "anchor": "topLeft"},
    {"type": "subscribe", "startMs": 23000, "endMs": 27000, "handle": "@indre.Grazuliene"},
    {"type": "callout", "startMs": out_ms(27.85), "endMs": out_ms(31.4), "text": "Dragon Fruit · Banana · Granola", "anchor": "topLeft"},
    {"type": "battery", "startMs": out_ms(35.65), "endMs": out_ms(40.1), "label": "BREAKFAST CHARGE", "done": "happy · not stuffed"},
    {"type": "heroShine", "startMs": out_ms(42.05), "endMs": out_ms(45.0), "focus": [0.45, 0.6], "radius": 360},
    {"type": "callout", "startMs": out_ms(42.6), "endMs": out_ms(45.5), "text": "Son's Chicken Sandwich", "anchor": "topLeft"},
    {"type": "note", "startMs": out_ms(45.75), "endMs": out_ms(49.0), "text": "Sauce? Never.", "by": "— every kid ever"},
    {"type": "callout", "startMs": out_ms(51.8), "endMs": out_ms(54.3), "text": "Papaya Salad", "anchor": "topLeft"},
    {"type": "gauge", "startMs": out_ms(54.6), "endMs": out_ms(58.3), "title": "Taste-o-meter", "low": "meh", "high": "WOW"},
    {"type": "badge", "startMs": 59900, "endMs": 61700, "title": "Clean Plate Club", "subtitle": "our daughter"},
    {"type": "stamp", "startMs": out_ms(78.62), "endMs": out_ms(80.9), "text": "FACT-CHECKED"},
    {"type": "hearts", "startMs": out_ms(82.45), "endMs": out_ms(82.45) + 1800},
    {"type": "priceTag", "startMs": out_ms(68.39), "endMs": out_ms(80.1),
     "lines": [
         {"atMs": out_ms(68.39), "text": f"{MONEY['billThb']} baht", "style": "big"},
         {"atMs": out_ms(76.30), "text": "Real rate on 7 Oct:", "style": "note"},
         {"atMs": out_ms(76.45), "text": f"about {fmt_eur(bill_eur)} for {PEOPLE}", "style": "pill"},
         {"atMs": out_ms(77.40), "text": f"about {fmt_eur(each_eur)} each", "style": "pill"},
     ]},
]

sfx = [
    {"src": "sfx/whoosh.wav", "atMs": 0, "gainDb": -16, "attackMs": 0},
    {"src": "sfx/swish.wav", "atMs": 1650 + 400, "gainDb": -20, "attackMs": 60},
    {"src": "sfx/whoosh.wav", "atMs": MAP[0], "gainDb": -16, "attackMs": 120},
    {"src": "sfx/pop.wav", "atMs": MAP[1] - 1200, "gainDb": -15, "attackMs": 20},
    {"src": "sfx/charge.wav", "atMs": out_ms(35.65) + 270, "gainDb": -18, "attackMs": 0},
    {"src": "sfx/pop.wav", "atMs": out_ms(9.85) + 100, "gainDb": -18, "attackMs": 20},
    {"src": "sfx/pop.wav", "atMs": out_ms(18.95) + 100, "gainDb": -18, "attackMs": 20},
    {"src": "sfx/click.wav", "atMs": 23000 + 1000, "gainDb": -14, "attackMs": 10},
    {"src": "sfx/bell.wav", "atMs": 23000 + 2600, "gainDb": -15, "attackMs": 10},
    {"src": "sfx/shine.wav", "atMs": out_ms(42.05), "gainDb": -15, "attackMs": 80},
    {"src": "sfx/pop.wav", "atMs": out_ms(45.75) + 60, "gainDb": -18, "attackMs": 20},
    {"src": "sfx/pop.wav", "atMs": out_ms(51.8) + 100, "gainDb": -18, "attackMs": 20},
    {"src": "sfx/swish.wav", "atMs": out_ms(54.6) + 330, "gainDb": -18, "attackMs": 60},
    {"src": "sfx/bell.wav", "atMs": 59900 + 100, "gainDb": -18, "attackMs": 10},
    {"src": "sfx/kaching.wav", "atMs": out_ms(68.39) + 100, "gainDb": -16, "attackMs": 30},
    {"src": "sfx/pop.wav", "atMs": out_ms(76.45) + 100, "gainDb": -17, "attackMs": 20},
    {"src": "sfx/stamp.wav", "atMs": out_ms(78.62) + 130, "gainDb": -14, "attackMs": 10},
    {"src": "sfx/whoosh.wav", "atMs": CUT_MS, "gainDb": -16, "attackMs": 120},
]

timeline = {
    "fps": FPS,
    "cut": "cut.mp4",
    "cutMs": CUT_MS,
    "durationMs": CUT_MS + END_CARD_MS,
    "cuts": [0, MAP[0], MAP[1]],
    "money": MONEY,
    "captions": captions,
    "zooms": zooms,
    "graphics": graphics,
    "broll": BROLL,
    "sfx": sfx,
    # Bed B (owner can switch to "music/island-meet-and-greet.mp3", gainDb -6.5).
    # gainDb: level between phrases; duckDb: extra cut under speech, so music sits ~12 dB under the voice.
    "music": {"src": "music/life-of-riley.mp3", "gainDb": -5.6, "duckDb": -12, "fadeOutMs": 1800, "credit": "\"Life of Riley\" Kevin MacLeod (incompetech.com), CC BY 4.0"},
    "watermark": {"handle": "@indre.Grazuliene"},
    "endCard": {"startMs": CUT_MS, "handle": "@indre.Grazuliene", "text": "for more Koh Tao", "holdMs": 1800, "focus": [0.82, 0.36]},  # owner: hold the 1.8 s frame (turned to the sea, smiling)
}

(ROOT / "edit/timeline.json").write_text(json.dumps(timeline, ensure_ascii=False, indent=1))
print(f"captions {len(captions)} words, {len(zooms)} zooms, {len(graphics)} graphics, duration {timeline['durationMs']} ms")
print("money", MONEY)
