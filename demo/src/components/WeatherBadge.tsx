import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import type {GraphicOf} from '../schema';
import {colors, fonts, SAFE} from '../theme';
import {exitFade, pop, reveal} from './anim';
import {BrushStroke} from './BrushStroke';
import {Sun} from './Doodles';

// Top right: date on a pink brush stroke, sun, temperature with a pink underline.
export const WeatherBadge: React.FC<{g: GraphicOf<'weatherBadge'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const sun = pop(frame, 10, fps);
	const temp = reveal(frame, 14, 10);
	const underline = reveal(frame, 20, 8);
	return (
		<div
			style={{
				position: 'absolute',
				top: 520,
				right: SAFE.right + 10,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-end',
				opacity: exitFade(frame, durationInFrames),
			}}
		>
			<BrushStroke seed={`date-${g.date}`} progress={reveal(frame, 0, 10)} textProgress={reveal(frame, 6, 10)} rotate={-5}>
				<div style={{fontFamily: fonts.hand, fontWeight: 700, fontSize: 64, color: colors.dark, lineHeight: 1.1}}>{g.date}</div>
			</BrushStroke>
			<div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 4}}>
				<Sun size={78} color={colors.sun} rotation={frame * 0.8} scale={sun} />
				<div style={{position: 'relative'}}>
					<div
						style={{
							fontFamily: fonts.sans,
							fontWeight: 900,
							fontSize: 76,
							color: colors.white,
							opacity: temp,
							transform: `translateY(${(1 - temp) * 14}px)`,
							textShadow: '0 3px 10px rgba(0,0,0,0.35)',
						}}
					>
						{g.tempC}°C
					</div>
					<div
						style={{
							position: 'absolute',
							left: 0,
							bottom: -2,
							height: 9,
							width: `${underline * 100}%`,
							background: colors.pink,
							borderRadius: 6,
							transform: 'rotate(-2deg)',
						}}
					/>
				</div>
			</div>
		</div>
	);
};
