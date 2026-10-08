import React from 'react';
import {useCurrentFrame} from 'remotion';
import type {GraphicOf} from '../schema';
import {colors, fonts, SAFE} from '../theme';
import {exitFade, reveal, wipe} from './anim';
import {Heart} from './Doodles';

// One short handwritten phrase near a bottom corner, with a heart and a line under it.
export const Tagline: React.FC<{g: GraphicOf<'tagline'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const right = g.anchor === 'bottomRight';
	const text = reveal(frame, 0, 22);
	return (
		<div
			style={{
				position: 'absolute',
				top: 780,
				...(right ? {right: SAFE.right + 10} : {left: SAFE.left}),
				width: 330,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				transform: 'rotate(-8deg)',
				opacity: exitFade(frame, durationInFrames),
			}}
		>
			<div
				style={{
					fontFamily: fonts.hand,
					fontWeight: 700,
					fontSize: 66,
					lineHeight: 0.95,
					textAlign: 'center',
					color: colors.dark,
					textShadow: '0 0 18px rgba(255,255,255,0.7)',
					clipPath: wipe(text),
				}}
			>
				{g.text}
			</div>
			<Heart size={54} color={colors.dark} strokeWidth={6} progress={reveal(frame, 18, 10)} style={{marginTop: 8}} />
			<div style={{height: 5, width: 200 * reveal(frame, 24, 8), background: colors.dark, borderRadius: 4, marginTop: 6}} />
		</div>
	);
};
