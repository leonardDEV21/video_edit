import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../theme';
import {pop, reveal} from './anim';
import {BrushStroke} from './BrushStroke';
import {Heart} from './Doodles';

// Subscribe call to action over the held last frame.
export const EndCard: React.FC<{handle: string; text: string}> = ({handle, text}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const dim = interpolate(frame, [0, 8], [0, 0.3], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const s = pop(frame, 4, fps);
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{background: `rgba(20,20,26,${dim})`}} />
			<div style={{position: 'absolute', top: 290, left: 36, width: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${0.8 + 0.2 * s})`, opacity: Math.min(1, s * 1.4)}}>
				<div style={{fontFamily: fonts.script, fontSize: 120, color: colors.white, transform: 'rotate(-6deg)', textShadow: '0 4px 14px rgba(0,0,0,0.4)'}}>Follow</div>
				<div style={{fontFamily: fonts.sans, fontWeight: 900, fontSize: 60, color: colors.white, marginTop: 6, textShadow: '0 4px 14px rgba(0,0,0,0.5)'}}>{handle}</div>
				<div style={{marginTop: 26, display: 'flex', alignItems: 'center', gap: 8}}>
					<BrushStroke seed="endcard" progress={reveal(frame, 12, 9)} textProgress={reveal(frame, 16, 10)}>
						<div style={{fontFamily: fonts.hand, fontWeight: 700, fontSize: 64, color: colors.dark, whiteSpace: 'nowrap'}}>{text}</div>
					</BrushStroke>
					<Heart size={70} color={colors.pink} strokeWidth={8} progress={reveal(frame, 24, 10)} />
				</div>
			</div>
		</AbsoluteFill>
	);
};
