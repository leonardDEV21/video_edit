import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {GraphicOf} from '../schema';
import {colors, fonts} from '../theme';
import {exitFade, pop} from './anim';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
// Frame plan (30 fps): button pops in, cursor taps SUBSCRIBE at CLICK1, then taps the bell at CLICK2.
export const CLICK1 = 30;
export const CLICK2 = 78;

const BellIcon: React.FC<{size: number; ring: number; filled: boolean}> = ({size, ring, filled}) => (
	<svg width={size} height={size} viewBox="0 0 100 100" style={{transform: `rotate(${ring}deg)`, transformOrigin: '50% 12%', overflow: 'visible'}}>
		<path
			d="M50 12 C 32 12, 24 28, 24 44 L 24 62 L 14 74 L 86 74 L 76 62 L 76 44 C 76 28, 68 12, 50 12 Z"
			fill={filled ? colors.pink : 'none'}
			stroke={colors.white}
			strokeWidth={7}
			strokeLinejoin="round"
		/>
		<path d="M40 80 C 42 90, 58 90, 60 80" fill="none" stroke={colors.white} strokeWidth={7} strokeLinecap="round" />
	</svg>
);

const Cursor: React.FC<{press: number}> = ({press}) => (
	<svg width={70} height={84} viewBox="0 0 70 84" style={{transform: `scale(${1 - 0.15 * press})`, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.45))'}}>
		<path d="M8 4 L 8 64 L 22 52 L 32 76 L 44 71 L 34 48 L 54 48 Z" fill={colors.white} stroke={colors.dark} strokeWidth={4} strokeLinejoin="round" />
	</svg>
);

const Check: React.FC = () => (
	<svg width={44} height={44} viewBox="0 0 40 40">
		<path d="M8 21 L 17 30 L 33 11" fill="none" stroke={colors.white} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

// Subscribe + bell call to action: a cursor taps SUBSCRIBE (turns SUBSCRIBED), then taps the bell (rings).
export const SubscribeBell: React.FC<{g: GraphicOf<'subscribe'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const enter = pop(frame, 0, fps);
	const subscribed = frame >= CLICK1;
	const belled = frame >= CLICK2;
	const tap1 = interpolate(frame, [CLICK1 - 3, CLICK1, CLICK1 + 4], [0, 1, 0], clamp);
	const tap2 = interpolate(frame, [CLICK2 - 3, CLICK2, CLICK2 + 4], [0, 1, 0], clamp);
	const pressScale = 1 - 0.06 * tap1;
	const flip = spring({frame: frame - CLICK1, fps, config: {damping: 12, stiffness: 200}});
	// Damped bell swing after the second tap.
	const t = Math.max(0, frame - CLICK2);
	const ring = belled ? 26 * Math.exp(-t / 9) * Math.sin(t * 1.3) : 0;
	// Cursor path: in from bottom right -> button -> bell -> out.
	const cx = interpolate(frame, [8, CLICK1 - 4, CLICK1 + 10, CLICK2 - 4, CLICK2 + 14, durationInFrames], [760, 300, 300, 610, 610, 700], clamp);
	const cy = interpolate(frame, [8, CLICK1 - 4, CLICK1 + 10, CLICK2 - 4, CLICK2 + 14, durationInFrames], [420, 70, 70, 60, 60, 260], clamp);
	const cursorOpacity = interpolate(frame, [8, 14, CLICK2 + 14, CLICK2 + 24], [0, 1, 1, 0], clamp);
	return (
		<div style={{position: 'absolute', top: 320, left: 56, width: 760, height: 360, opacity: exitFade(frame, durationInFrames), transform: 'scale(1.2)', transformOrigin: 'left top'}}>
			<div style={{fontFamily: fonts.hand, fontWeight: 700, fontSize: 52, color: colors.white, textShadow: '0 2px 8px rgba(0,0,0,0.6)', marginLeft: 10, opacity: Math.min(1, enter)}}>
				{g.handle}
			</div>
			<div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 6, transform: `scale(${(0.6 + 0.4 * enter) * pressScale})`, transformOrigin: 'left center'}}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						padding: '18px 40px',
						borderRadius: 60,
						background: subscribed ? colors.dark : colors.pink,
						boxShadow: '0 8px 22px rgba(0,0,0,0.35)',
						transform: `scale(${subscribed ? 0.94 + 0.06 * flip : 1})`,
					}}
				>
					{subscribed ? <Check /> : null}
					<span style={{fontFamily: fonts.sans, fontWeight: 900, fontSize: 56, letterSpacing: 2, color: colors.white}}>{subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}</span>
				</div>
				<div
					style={{
						width: 110,
						height: 110,
						borderRadius: 55,
						background: belled ? colors.dark : 'rgba(30,30,36,0.55)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 8px 22px rgba(0,0,0,0.35)',
						transform: `scale(${1 - 0.1 * tap2})`,
					}}
				>
					<BellIcon size={70} ring={ring} filled={belled} />
				</div>
			</div>
			<div style={{position: 'absolute', left: cx, top: cy + 60, opacity: cursorOpacity}}>
				<Cursor press={Math.max(tap1, tap2)} />
			</div>
		</div>
	);
};
