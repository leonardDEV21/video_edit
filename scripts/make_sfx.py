"""Synthesize the small sound-effect set into public/sfx/ (no third-party samples)."""
import wave
from pathlib import Path
import numpy as np

SR = 48000
OUT = Path(__file__).resolve().parent.parent / "public/sfx"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(7)


def save(name, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.89  # peak about -1 dBFS
    with wave.open(str(OUT / name), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def sweep_noise(dur, f0, f1, q=0.25):
    n = int(dur * SR); t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    spec = np.fft.rfft(noise); freqs = np.fft.rfftfreq(n, 1 / SR)
    # time-varying band-pass via short overlapping FFT blocks
    out = np.zeros(n); hop = 512; win = np.hanning(2048)
    for s in range(0, n - 2048, hop):
        fc = f0 + (f1 - f0) * (s / n)
        blk = noise[s:s + 2048] * win
        B = np.fft.rfft(blk); fr = np.fft.rfftfreq(2048, 1 / SR)
        B *= np.exp(-0.5 * ((fr - fc) / (fc * q + 1)) ** 2)
        out[s:s + 2048] += np.fft.irfft(B)
    return out, t


w, t = sweep_noise(0.55, 300, 2400)
env = np.sin(np.pi * np.clip(t / 0.55, 0, 1)) ** 1.5
save("whoosh.wav", w * env)

s, t = sweep_noise(0.32, 1800, 5200, 0.35)
save("swish.wav", s * np.sin(np.pi * np.clip(t / 0.32, 0, 1)) ** 2)

t = np.arange(int(0.12 * SR)) / SR
f = 900 * np.exp(-t * 18) + 280
pop = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 38)
save("pop.wav", pop)

t = np.arange(int(0.9 * SR)) / SR
bell = sum(a * np.sin(2 * np.pi * fr * t) for fr, a in [(2093, 1), (2637, 0.6), (4186, 0.35), (5274, 0.2)])
bell2 = np.roll(bell, int(0.09 * SR)); bell2[: int(0.09 * SR)] = 0
clank = rng.standard_normal(len(t)) * np.exp(-t * 60) * 0.5
save("kaching.wav", (bell + 0.8 * bell2) * np.exp(-t * 5) + clank)
t = np.arange(int(0.06 * SR)) / SR
save("click.wav", rng.standard_normal(len(t)) * np.exp(-t * 160) + 0.6 * np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 90))

t = np.arange(int(1.4 * SR)) / SR
ding = sum(a * np.sin(2 * np.pi * fr * t) * np.exp(-t * d) for fr, a, d in [(1318.5, 1, 3), (2637, 0.5, 4.5), (3951, 0.25, 6), (1975.5, 0.3, 3.5)])
save("bell.wav", ding * (1 - np.exp(-t * 400)))
print(sorted(p.name for p in OUT.iterdir()))
