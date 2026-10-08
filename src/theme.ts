import {loadFont} from '@remotion/fonts';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';

// Fonts ship in public/fonts (SIL Open Font License), so renders work offline.
// The render waits for them and fails if any font does not load.
const FONT_FILES = [
	{family: 'Great Vibes', weight: '400', file: 'great-vibes-latin-400-normal.woff2'},
	{family: 'Caveat', weight: '600', file: 'caveat-latin-600-normal.woff2'},
	{family: 'Caveat', weight: '700', file: 'caveat-latin-700-normal.woff2'},
	{family: 'Montserrat', weight: '700', file: 'montserrat-latin-700-normal.woff2'},
	{family: 'Montserrat', weight: '900', file: 'montserrat-latin-900-normal.woff2'},
];

const fontHandle = delayRender('Loading fonts');
Promise.all(FONT_FILES.map((f) => loadFont({family: f.family, weight: f.weight, url: staticFile(`fonts/${f.file}`)})))
	.then(() => continueRender(fontHandle))
	.catch((err) => cancelRender(err));

export const fonts = {
	script: "'Great Vibes', cursive",
	hand: "'Caveat', cursive",
	sans: "'Montserrat', sans-serif",
};

export const colors = {
	white: '#FFFFFF',
	dark: '#1E1E24',
	pink: '#F78EBD',
	captionActive: '#FFD400',
	sun: '#FFC93C',
};

export const SAFE = {top: 250, bottom: 450, right: 130, left: 40};

export const msToFrame = (ms: number, fps: number) => Math.round((ms / 1000) * fps);
