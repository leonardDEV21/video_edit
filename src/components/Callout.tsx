import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import type {GraphicOf} from '../schema';
import {colors, fonts, SAFE} from '../theme';
import {exitFade, pop, reveal} from './anim';
import {BrushStroke} from './BrushStroke';
import {Heart} from './Doodles';

// Handwritten label on a pink brush stroke: names a dish or a place.
export const Callout: React.FC<{g: GraphicOf<'callout'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = pop(frame, 0, fps);
	const left = g.anchor === 'topLeft';
	return (
		<div
			style={{
				position: 'absolute',
				top: 340,
				...(left ? {left: 60} : {right: SAFE.right + 10}),
				display: 'flex',
				alignItems: 'center',
				gap: 6,
				opacity: exitFade(frame, durationInFrames),
				transform: `scale(${0.85 + 0.15 * s})`,
				transformOrigin: left ? 'left center' : 'right center',
			}}
		>
			<BrushStroke seed={`callout-${g.text}`} progress={reveal(frame, 0, 9)} textProgress={reveal(frame, 5, 10)} rotate={-4}>
				<div style={{fontFamily: fonts.hand, fontWeight: 700, fontSize: 70, color: colors.dark, lineHeight: 1.1, whiteSpace: 'nowrap'}}>{g.text}</div>
			</BrushStroke>
			<Heart size={60} color={colors.pink} strokeWidth={8} progress={reveal(frame, 12, 10)} />
		</div>
	);
};
