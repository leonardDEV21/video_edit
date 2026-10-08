import React from 'react';
import {useCurrentFrame} from 'remotion';
import type {GraphicOf} from '../schema';
import {colors, fonts, SAFE} from '../theme';
import {exitFade, reveal, wipe} from './anim';
import {Heart} from './Doodles';

const STAGGER = 11; // about 360ms at 30fps

// Short handwritten notes on soft frosted patches, written in one by one.
export const SideNotes: React.FC<{g: GraphicOf<'sideNotes'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const left = g.side === 'left';
	return (
		<div
			style={{
				position: 'absolute',
				top: 900,
				...(left ? {left: SAFE.left} : {right: SAFE.right + 10}),
				display: 'flex',
				flexDirection: 'column',
				alignItems: left ? 'flex-start' : 'flex-end',
				gap: 22,
				opacity: exitFade(frame, durationInFrames),
			}}
		>
			{g.notes.map((note, i) => {
				const start = i * STAGGER;
				const patch = reveal(frame, start, 8);
				const text = reveal(frame, start + 3, 12);
				return (
					<div key={note} style={{position: 'relative', padding: '10px 26px 12px 22px', transform: `rotate(${i % 2 ? -3 : -6}deg)`}}>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background: 'rgba(255,255,255,0.62)',
								borderRadius: 26,
								filter: 'blur(6px)',
								opacity: patch,
							}}
						/>
						<div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 10, clipPath: wipe(text)}}>
							<span style={{fontFamily: fonts.hand, fontWeight: 600, fontSize: 50, color: colors.dark, lineHeight: 1}}>{note}</span>
							<Heart size={34} color={colors.dark} strokeWidth={7} progress={reveal(frame, start + 10, 8)} />
						</div>
					</div>
				);
			})}
		</div>
	);
};
