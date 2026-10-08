import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import type {GraphicOf} from '../schema';
import {colors, fonts} from '../theme';
import {exitFade, pop, reveal, wipe} from './anim';
import {BrushStroke} from './BrushStroke';
import {Flag, Heart, Palm} from './Doodles';

// Top center: script place name, island on a pink brush stroke, country with a flag.
export const PostcardTitle: React.FC<{g: GraphicOf<'postcardTitle'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const title = reveal(frame, 0, 18);
	const s = pop(frame, 0, fps);
	const brush = reveal(frame, 12, 10);
	const place = reveal(frame, 18, 10);
	const country = reveal(frame, 24, 10);
	return (
		<div
			style={{
				position: 'absolute',
				top: 262,
				left: 50,
				width: 800,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				opacity: exitFade(frame, durationInFrames),
			}}
		>
			<div style={{position: 'relative', transform: `rotate(-6deg) scale(${0.85 + 0.15 * s})`}}>
				<div
					style={{
						fontFamily: fonts.script,
						fontSize: 158,
						lineHeight: 1.05,
						color: colors.white,
						whiteSpace: 'nowrap',
						textShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.4)',
						clipPath: wipe(title),
						padding: '0 20px',
					}}
				>
					{g.title}
				</div>
				<Heart size={70} color={colors.pink} progress={reveal(frame, 16, 12)} style={{position: 'absolute', top: -34, right: 150}} />
				<Palm size={150} color={colors.white} progress={reveal(frame, 14, 20)} style={{position: 'absolute', top: -60, right: -110}} />
			</div>
			<div style={{marginTop: -6}}>
				<BrushStroke seed={`place-${g.place}`} progress={brush} textProgress={place}>
					<div style={{fontFamily: fonts.hand, fontWeight: 700, fontSize: 78, color: colors.dark, lineHeight: 1.1}}>{g.place}</div>
				</BrushStroke>
			</div>
			<div
				style={{
					marginTop: 14,
					display: 'flex',
					alignItems: 'center',
					gap: 14,
					opacity: country,
					transform: `translateY(${(1 - country) * 10}px)`,
				}}
			>
				<span
					style={{
						fontFamily: fonts.sans,
						fontWeight: 700,
						fontSize: 34,
						letterSpacing: 10,
						color: colors.white,
						textShadow: '0 2px 6px rgba(0,0,0,0.45)',
					}}
				>
					{g.country}
				</span>
				<Flag code={g.flag} width={46} />
			</div>
		</div>
	);
};
