import React, {useMemo} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Caption} from '../schema';
import {colors, fonts} from '../theme';

const MAX_WORDS = 3;
const GAP_BREAK_MS = 300;

type Page = {words: Caption[]; startMs: number; endMs: number};

// 2 to 3 words per page; a new page on a pause of 300ms or more.
export const toPages = (captions: Caption[]): Page[] => {
	const pages: Page[] = [];
	let current: Caption[] = [];
	captions.forEach((w, i) => {
		const prev = captions[i - 1];
		const endsSentence = prev && /[.?!]$/.test(prev.text);
		// Break at a comma only when the clause after it has at least 2 words before the sentence ends.
		const restOfSentence = (() => {
			let n = 0;
			for (let k = i; k < captions.length; k++) {
				n++;
				if (/[.?!]$/.test(captions[k].text)) break;
			}
			return n;
		})();
		const endsClause = prev && /,$/.test(prev.text) && current.length >= 2 && restOfSentence >= 2;
		// 2 + 2 rather than 3 + 1 at the end of a sentence.
		const balance = current.length === 2 && restOfSentence === 2;
		if (current.length && (current.length === MAX_WORDS || balance || endsSentence || endsClause || (prev && w.startMs - prev.endMs >= GAP_BREAK_MS))) {
			pages.push({words: current, startMs: current[0].startMs, endMs: current[current.length - 1].endMs});
			current = [];
		}
		current.push(w);
	});
	if (current.length) {
		pages.push({words: current, startMs: current[0].startMs, endMs: current[current.length - 1].endMs});
	}
	// A page stays up until the next one starts (max 400ms after its last word).
	return pages.map((p, i) => ({...p, endMs: Math.min(pages[i + 1]?.startMs ?? Infinity, p.endMs + 400)}));
};

// White words with a black outline; the spoken word turns yellow with a small pop.
export const KaraokeCaptions: React.FC<{captions: Caption[]; top: number}> = ({captions, top}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const ms = (frame / fps) * 1000;
	const pages = useMemo(() => toPages(captions), [captions]);
	const page = pages.find((p) => ms >= p.startMs && ms < p.endMs);
	if (!page) {
		return null;
	}
	const pageFrame = frame - Math.round((page.startMs / 1000) * fps);
	const enter = interpolate(pageFrame, [0, 4], [0.88, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<div
			style={{
				position: 'absolute',
				top,
				left: 140,
				right: 140,
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignContent: 'flex-start',
				columnGap: 34,
				transform: `scale(${enter})`,
			}}
		>
			{page.words.map((w) => {
				const active = ms >= w.startMs && ms < w.endMs;
				const spoken = ms >= w.endMs;
				const yellow = active || (spoken && w.emphasis);
				const p = spring({frame: frame - Math.round((w.startMs / 1000) * fps), fps, config: {damping: 10, stiffness: 220, mass: 0.5}});
				const scale = active ? 1 + 0.12 * p : 1;
				return (
					<span
						key={`${w.startMs}-${w.text}`}
						style={{
							fontFamily: fonts.sans,
							fontWeight: 900,
							fontSize: 82,
							lineHeight: 1.15,
							textTransform: 'uppercase',
							color: yellow ? colors.captionActive : colors.white,
							WebkitTextStroke: '14px #000',
							paintOrder: 'stroke fill',
							textShadow: '0 6px 14px rgba(0,0,0,0.45)',
							display: 'inline-block',
							transform: `scale(${scale})`,
						}}
					>
						{w.text}
					</span>
				);
			})}
		</div>
	);
};
