# Style demo: Crystal Beach postcard + yellow karaoke

A 10 second, 1080x1920 Remotion demo of the look described in `../CLAUDE.md`
sections 6a, 6b and 7. Everything is driven by `timeline.json`.

The background is set in `timeline.json`:

* photo: put it in `public/photos/` and set `"background": { "type": "image", "src": "photos/beach.jpg" }`
* video: put the cut in `public/` and set `"background": { "type": "video", "src": "cut.mp4" }`
* `{ "type": "drawn" }` is the drawn stand-in beach used when no footage is available.

```bash
npm install
npm run studio   # live preview, every timeline value editable
npm run render   # out/demo.mp4
npm run thumb    # out/thumb.jpg (cover, no captions)
```

Components in `src/components/` (copy them into editor-pro-max's `src/components/`):
`PostcardTitle`, `WeatherBadge`, `SideNotes`, `Tagline`, `BrushStroke`, `Doodles`,
`KaraokeCaptions`, `BaseVideo` (zooms).

Fonts (Great Vibes, Caveat, Montserrat) ship in `public/fonts` under the SIL Open
Font License, so renders do not need internet access.
