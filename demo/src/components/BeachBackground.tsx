import React from 'react';
import {random, useCurrentFrame} from 'remotion';

// Stand-in for public/cut.mp4: a drawn tropical beach (sky, jungle, rocks, sea, sand),
// lightly animated. Replace with <OffthreadVideo src={staticFile('cut.mp4')} /> for real footage.
const W = 1080;
const H = 1920;

export const BeachBackground: React.FC = () => {
	const f = useCurrentFrame();
	const shore = (x: number) => 1080 + x * 0.62 + Math.sin(x / 140 + f / 22) * 10;
	const shorePath = Array.from({length: 28}, (_, i) => {
		const x = (i / 27) * W;
		return `${x.toFixed(0)},${shore(x).toFixed(0)}`;
	});
	return (
		<svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
			<defs>
				<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#1E7FD8" />
					<stop offset="1" stopColor="#A9DCF7" />
				</linearGradient>
				<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#1590B6" />
					<stop offset="0.45" stopColor="#22C3CF" />
					<stop offset="1" stopColor="#8BEDE3" />
				</linearGradient>
				<linearGradient id="sand" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0" stopColor="#E9D8B8" />
					<stop offset="1" stopColor="#F6EDDD" />
				</linearGradient>
				<radialGradient id="rock" cx="0.35" cy="0.3" r="0.8">
					<stop offset="0" stopColor="#A5A9AB" />
					<stop offset="1" stopColor="#575D61" />
				</radialGradient>
				<radialGradient id="vignette" cx="0.5" cy="0.5" r="0.75">
					<stop offset="0.6" stopColor="#000" stopOpacity="0" />
					<stop offset="1" stopColor="#000" stopOpacity="0.28" />
				</radialGradient>
				<filter id="soft"><feGaussianBlur stdDeviation="18" /></filter>
			</defs>
			<rect width={W} height={760} fill="url(#sky)" />
			{[0, 1, 2].map((i) => (
				<ellipse key={i} cx={((200 + i * 380 + f * (0.4 + i * 0.15)) % 1300) - 100} cy={140 + i * 70} rx={170} ry={38} fill="#fff" opacity={0.55} filter="url(#soft)" />
			))}
			{/* sea */}
			<rect y={700} width={W} height={H - 700} fill="url(#sea)" />
			{Array.from({length: 60}).map((_, i) => {
				const y = 720 + random(`wy${i}`) * 900;
				const x = (random(`wx${i}`) * W + f * (0.6 + random(`ws${i}`))) % W;
				const len = 30 + random(`wl${i}`) * 70;
				return <line key={i} x1={x} y1={y} x2={x + len} y2={y} stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.18 + 0.2 * Math.sin(f / 9 + i)} />;
			})}
			{/* jungle headland, left */}
			<path d="M0,330 C 120,300 260,360 330,470 C 380,560 420,640 470,760 L 0,900 Z" fill="#1F5A2A" />
			{Array.from({length: 26}).map((_, i) => (
				<circle key={i} cx={random(`jx${i}`) * 400} cy={360 + random(`jy${i}`) * 450} r={40 + random(`jr${i}`) * 50} fill={i % 3 ? '#2E7A36' : '#3F9446'} opacity={0.9} />
			))}
			{Array.from({length: 14}).map((_, i) => (
				<circle key={i} cx={20 + random(`fx${i}`) * 140} cy={620 + random(`fy${i}`) * 200} r={9} fill="#E2457A" />
			))}
			{/* rocks */}
			{[
				[560, 690, 150, 80],
				[720, 640, 120, 110],
				[860, 700, 190, 90],
				[1010, 680, 120, 100],
				[300, 860, 230, 130],
				[110, 980, 200, 120],
			].map(([cx, cy, rx, ry], i) => (
				<ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#rock)" />
			))}
			{/* sand and foam */}
			<path d={`M0,${H} L0,${shore(0)} L ${shorePath.join(' L ')} L ${W},${H} Z`} fill="url(#sand)" />
			<path d={`M ${shorePath.join(' L ')}`} fill="none" stroke="#fff" strokeWidth={14} opacity={0.75} strokeLinecap="round" />
			<path d={`M ${shorePath.map((p) => p.replace(/,(\d+)/, (_, y) => `,${Number(y) + 26}`)).join(' L ')}`} fill="none" stroke="#D8C3A0" strokeWidth={30} opacity={0.5} />
			<rect width={W} height={H} fill="url(#vignette)" />
		</svg>
	);
};
