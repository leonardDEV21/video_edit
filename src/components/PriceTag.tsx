import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import type {GraphicOf} from '../schema';
import {colors, fonts, msToFrame} from '../theme';
import {exitFade, pop, reveal, wipe} from './anim';
import {BrushStroke} from './BrushStroke';

// The bill, built line by line as it is said. Values come from timeline.money (computed, not typed).
export const PriceTag: React.FC<{g: GraphicOf<'priceTag'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const base = msToFrame(g.startMs, fps);
	return (
		<div
			style={{
				position: 'absolute',
				top: 268,
				left: 56,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				gap: 10,
				opacity: exitFade(frame, durationInFrames),
			}}
		>
			{g.lines.map((l, i) => {
				const at = msToFrame(l.atMs, fps) - base;
				if (frame < at) {
					return null;
				}
				const s = pop(frame, at, fps);
				if (l.style === 'big') {
					return (
						<div key={i} style={{transform: `scale(${0.7 + 0.3 * s})`, transformOrigin: 'left center'}}>
							<BrushStroke seed={`price-${l.text}`} progress={reveal(frame, at, 8)} textProgress={reveal(frame, at + 4, 8)} padding="6px 38px 12px">
								<div style={{fontFamily: fonts.sans, fontWeight: 900, fontSize: 92, color: colors.dark, lineHeight: 1.05, whiteSpace: 'nowrap', textTransform: 'uppercase'}}>{l.text}</div>
							</BrushStroke>
						</div>
					);
				}
				if (l.style === 'note') {
					return (
						<div key={i} style={{marginLeft: 22, marginBottom: -10, fontFamily: fonts.hand, fontWeight: 700, fontSize: 50, color: colors.white, textShadow: '0 2px 8px rgba(0,0,0,0.6)', clipPath: wipe(reveal(frame, at, 10)), whiteSpace: 'nowrap'}}>
							{l.text}
						</div>
					);
				}
				return (
					<div key={i} style={{position: 'relative', padding: '6px 24px 10px', marginLeft: 14, transform: `translateX(${(1 - s) * -40}px) rotate(-3deg)`, opacity: Math.min(1, s * 1.5)}}>
						<div style={{position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.78)', borderRadius: 26, filter: 'blur(5px)'}} />
						<div style={{position: 'relative', fontFamily: fonts.sans, fontWeight: 900, fontSize: 54, color: colors.dark, whiteSpace: 'nowrap'}}>{l.text}</div>
					</div>
				);
			})}
		</div>
	);
};
