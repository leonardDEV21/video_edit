import React from 'react';

// Line drawings revealed with stroke-dashoffset: progress 0 = hidden, 1 = fully drawn.
type DoodleProps = {size: number; color: string; progress: number; strokeWidth?: number; style?: React.CSSProperties};

const drawn = (progress: number) => ({
	pathLength: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1 - progress,
});

export const Heart: React.FC<DoodleProps> = ({size, color, progress, strokeWidth = 5, style}) => (
	<svg width={size} height={size} viewBox="0 0 100 100" style={style}>
		<path
			d="M50 86 C 18 62, 6 44, 14 28 C 22 12, 44 14, 50 32 C 56 14, 78 12, 86 28 C 94 44, 82 62, 50 86 Z"
			fill="none"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...drawn(progress)}
		/>
	</svg>
);

export const Palm: React.FC<DoodleProps> = ({size, color, progress, strokeWidth = 3, style}) => {
	const paths = [
		'M52 96 C 50 76, 52 56, 58 36', // trunk
		'M58 36 C 44 24, 28 24, 14 34',
		'M58 36 C 50 18, 36 10, 22 10',
		'M58 36 C 62 18, 74 8, 88 8',
		'M58 36 C 72 26, 88 28, 96 40',
		'M58 36 C 68 40, 74 52, 74 64',
		'M58 36 C 46 42, 40 54, 42 66',
		'M30 96 C 46 92, 62 92, 80 96', // ground
	];
	return (
		<svg width={size} height={size} viewBox="0 0 100 100" style={style}>
			{paths.map((d, i) => {
				const p = Math.min(1, Math.max(0, progress * paths.length - i * 0.6));
				return <path key={i} d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" {...drawn(p)} />;
			})}
		</svg>
	);
};

export const Sun: React.FC<{size: number; color: string; rotation: number; scale: number}> = ({size, color, rotation, scale}) => (
	<svg width={size} height={size} viewBox="0 0 100 100" style={{transform: `rotate(${rotation}deg) scale(${scale})`}}>
		<circle cx={50} cy={50} r={20} fill={color} />
		{Array.from({length: 12}).map((_, i) => {
			const a = (i / 12) * Math.PI * 2;
			return (
				<line
					key={i}
					x1={50 + Math.cos(a) * 28}
					y1={50 + Math.sin(a) * 28}
					x2={50 + Math.cos(a) * 42}
					y2={50 + Math.sin(a) * 42}
					stroke={color}
					strokeWidth={6}
					strokeLinecap="round"
				/>
			);
		})}
	</svg>
);

export const Flag: React.FC<{code: 'TH' | 'LT'; width: number}> = ({code, width}) => {
	const stripes =
		code === 'TH'
			? [['#A51931', 1], ['#F4F5F8', 1], ['#2D2A4A', 2], ['#F4F5F8', 1], ['#A51931', 1]]
			: [['#FDB913', 1], ['#006A44', 1], ['#C1272D', 1]];
	const total = stripes.reduce((s, [, n]) => s + (n as number), 0);
	return (
		<div style={{width, height: width * 0.66, display: 'flex', flexDirection: 'column', borderRadius: 3, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.35)'}}>
			{stripes.map(([c, n], i) => (
				<div key={i} style={{background: c as string, flex: (n as number) / total}} />
			))}
		</div>
	);
};
