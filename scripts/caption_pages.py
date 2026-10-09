"""Caption paging shared by the checks and exports. Mirrors KaraokeCaptions.toPages in
src/components/KaraokeCaptions.tsx: max 3 words, break at sentence ends, at a comma only when
2+ words follow before the sentence ends, 2+2 rather than 3+1, and on pauses of 300 ms or more."""
import re

SENTENCE_END = re.compile(r"[.?!]$")


def karaoke_pages(c):
    pages, cur = [], []
    for i, w in enumerate(c):
        prev = c[i - 1] if i else None
        rest = next((k - i + 1 for k in range(i, len(c)) if SENTENCE_END.search(c[k]["text"])), 1)
        brk = cur and (
            len(cur) == 3
            or (len(cur) == 2 and rest == 2)
            or (prev and SENTENCE_END.search(prev["text"]))
            or (prev and prev["text"].endswith(",") and len(cur) >= 2 and rest >= 2)
            or (prev and w["startMs"] - prev["endMs"] >= 300)
        )
        if brk:
            pages.append(cur)
            cur = []
        cur.append(w)
    if cur:
        pages.append(cur)
    return pages


def _chunks(words, max_chars, max_ms):
    """Split one sentence: whole if it fits, else at the comma nearest the middle, else at the middle word."""
    text = " ".join(w["text"] for w in words)
    if len(words) <= 1 or (len(text) <= max_chars and words[-1]["endMs"] - words[0]["startMs"] <= max_ms):
        return [words]
    commas = [k for k, w in enumerate(words[:-1]) if w["text"].endswith(",")]
    mid = len(words) / 2
    k = min(commas, key=lambda c: abs(c + 1 - mid)) + 1 if commas else int(mid)
    k = max(1, min(len(words) - 1, k))
    return _chunks(words[:k], max_chars, max_ms) + _chunks(words[k:], max_chars, max_ms)


def subtitle_cues(c, max_chars=84, max_ms=6000):
    """Cues for a sidecar SRT: one sentence per cue (2 lines of 42 chars max), long ones split at commas."""
    cues, cur = [], []
    for w in c:
        if cur and w["startMs"] - cur[-1]["endMs"] >= 700:
            cues += _chunks(cur, max_chars, max_ms)
            cur = []
        cur.append(w)
        if SENTENCE_END.search(w["text"]):
            cues += _chunks(cur, max_chars, max_ms)
            cur = []
    if cur:
        cues += _chunks(cur, max_chars, max_ms)
    return cues


def two_lines(words, width=42):
    """Format a cue as at most 2 lines, split at the space nearest the middle."""
    text = " ".join(w["text"] for w in words)
    if len(text) <= width:
        return text
    best = min((k for k in range(1, len(words))), key=lambda k: abs(len(" ".join(w["text"] for w in words[:k])) - len(text) / 2))
    return " ".join(w["text"] for w in words[:best]) + "\n" + " ".join(w["text"] for w in words[best:])
