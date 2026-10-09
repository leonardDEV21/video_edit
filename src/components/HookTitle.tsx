import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import type {GraphicOf} from '../schema';
import {colors, fonts} from '../theme';
import {exitFade, pop, reveal} from './anim';
import {BrushStroke} from './BrushStroke';

// First 2 seconds: big bold line, the key number on a pink brush stroke.
export const HookTitle: React.FC<{g: GraphicOf<'hookTitle'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = pop(frame, 0, fps);
	return (
		<div
			style={{
				position: 'absolute',
				top: 300,
				left: 56,
				width: 600,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				opacity: exitFade(frame, durationInFrames),
				transform: `scale(${0.8 + 0.2 * s})`,
				transformOrigin: 'left top',
			}}
		>
			<div
				style={{
					fontFamily: fonts.sans,
					fontWeight: 900,
					fontSize: 88,
					lineHeight: 1.02,
					textAlign: 'left',
					textTransform: 'uppercase',
					color: colors.white,
					textShadow: '0 5px 18px rgba(0,0,0,0.55), 0 2px 3px rgba(0,0,0,0.5)',
				}}
			>
				{g.text}
			</div>
			<div style={{marginTop: 18}}>
				<BrushStroke seed={`hook-${g.highlight}`} progress={reveal(frame, 4, 8)} textProgress={reveal(frame, 8, 8)} padding="8px 44px 14px">
					<div style={{fontFamily: fonts.sans, fontWeight: 900, fontSize: 92, color: colors.dark, lineHeight: 1.05, whiteSpace: 'nowrap', textTransform: 'uppercase'}}>
						{g.highlight}
					</div>
				</BrushStroke>
			</div>
		</div>
	);
};
