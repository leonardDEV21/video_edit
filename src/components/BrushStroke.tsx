import React, {useMemo} from 'react';
import {random} from 'remotion';
import {colors} from '../theme';
import {wipe} from './anim';

// Rough-edged paint stroke behind a label. Wipes in left to right, then the text appears.
const W = 400;
const H = 100;

const strokePath = (seed: string) => {
	const r = (i: number, s: string) => random(`${seed}-${s}-${i}`);
	const steps = 14;
	const top: string[] = [];
	const bottom: string[] = [];
	for (let i = 0; i <= steps; i++) {
		const x = 14 + (i / steps) * (W - 28);
		top.push(`${x.toFixed(1)},${(8 + r(i, 't') * 10).toFixed(1)}`);
		bottom.push(`${x.toFixed(1)},${(H - 8 - r(i, 'b') * 10).toFixed(1)}`);
	}
	const left = `M 4,${H * 0.3} L ${top.join(' L ')}`;
	// Ragged right end: bristle tips.
	const tips = [0.2, 0.38, 0.55, 0.72, 0.88]
		.map((f, i) => `L ${W - 2 - r(i, 'tip') * 22},${H * f}`)
		.join(' ');
	return `${left} ${tips} L ${bottom.reverse().join(' L ')} L 2,${H * 0.75} Z`;
};

export const BrushStroke: React.FC<{
	seed: string;
	progress: number;
	textProgress: number;
	padding?: string;
	rotate?: number;
	color?: string;
	children: React.ReactNode;
}> = ({seed, progress, textProgress, padding = '6px 34px 10px', rotate = -3, color = colors.pink, children}) => {
	const d = useMemo(() => strokePath(seed), [seed]);
	const streaks = useMemo(
		() =>
			[0.3, 0.5, 0.68].map((f, i) => ({
				y: H * f + random(`${seed}-s-${i}`) * 6,
				x1: 30 + random(`${seed}-x1-${i}`) * 60,
				x2: W - 40 - random(`${seed}-x2-${i}`) * 80,
			})),
		[seed],
	);
	return (
		<div style={{position: 'relative', display: 'inline-block', padding, transform: `rotate(${rotate}deg)`}}>
			<svg
				viewBox={`0 0 ${W} ${H}`}
				preserveAspectRatio="none"
				style={{position: 'absolute', inset: 0, width: '100%', height: '100%', clipPath: wipe(progress), overflow: 'visible'}}
			>
				<path d={d} fill={color} />
				{streaks.map((s, i) => (
					<line key={i} x1={s.x1} y1={s.y} x2={s.x2} y2={s.y} stroke="rgba(255,255,255,0.22)" strokeWidth={2} strokeLinecap="round" />
				))}
			</svg>
			<div style={{position: 'relative', clipPath: wipe(textProgress)}}>{children}</div>
		</div>
	);
};
