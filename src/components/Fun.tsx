import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {GraphicOf} from '../schema';
import {colors, fonts} from '../theme';
import {exitFade, pop, reveal, wipe} from './anim';
import {Heart} from './Doodles';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Four-point twinkle star.
const Sparkle: React.FC<{x: number; y: number; size: number; s: number; color: string}> = ({x, y, size, s, color}) => (
	<svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', left: x - size / 2, top: y - size / 2, transform: `scale(${s}) rotate(${s * 45}deg)`, opacity: Math.min(1, s * 1.4), filter: `drop-shadow(0 0 ${size / 6}px rgba(255,255,255,0.9))`}}>
		<path d="M50 0 C 54 38, 62 46, 100 50 C 62 54, 54 62, 50 100 C 46 62, 38 54, 0 50 C 38 46, 46 38, 50 0 Z" fill={color} />
	</svg>
);

// "Hero shot": a light band sweeps across the subject, sparkles twinkle around it, a soft glow blooms.
export const HeroShine: React.FC<{g: GraphicOf<'heroShine'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const cx = g.focus[0] * 1080;
	const cy = g.focus[1] * 1920;
	const sweep = interpolate(frame % 40, [2, 24], [-0.6, 1.6], clamp);
	const ring = interpolate(frame % 20, [0, 20], [0, 1], clamp);
	const glow = interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], clamp);
	const stars = useMemo(
		() =>
			Array.from({length: 26}).map((_, i) => ({
				x: cx + (random(`sx${i}`) - 0.5) * g.radius * 2,
				y: cy + (random(`sy${i}`) - 0.5) * g.radius * 1.4,
				size: 70 + random(`ss${i}`) * 110,
				start: Math.floor(random(`st${i}`) * (durationInFrames - 24)),
				color: i % 3 === 0 ? colors.pink : colors.white,
			})),
		[cx, cy, g.radius, durationInFrames],
	);
	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			<AbsoluteFill style={{background: `radial-gradient(circle at ${cx}px ${cy}px, rgba(255,248,225,${0.5 * glow}) 0%, rgba(255,250,235,0) ${g.radius * 1.2}px)`, mixBlendMode: 'screen'}} />
			<AbsoluteFill
				style={{
					background: `linear-gradient(115deg, rgba(255,255,255,0) ${sweep * 100 - 12}%, rgba(255,255,255,0.8) ${sweep * 100}%, rgba(255,255,255,0) ${sweep * 100 + 12}%)`,
					mixBlendMode: 'screen',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: cx - g.radius * (0.6 + 0.6 * ring),
					top: cy - g.radius * (0.6 + 0.6 * ring),
					width: g.radius * 2 * (0.6 + 0.6 * ring),
					height: g.radius * 2 * (0.6 + 0.6 * ring),
					borderRadius: '50%',
					border: `10px solid rgba(255,255,255,${0.6 * (1 - ring) * glow})`,
					boxShadow: `0 0 40px rgba(247,142,189,${0.6 * (1 - ring) * glow})`,
				}}
			/>
			{stars.map((st, i) => {
				const local = frame - st.start;
				const s = interpolate(local, [0, 6, 12, 18], [0, 1, 0.7, 0], clamp);
				if (s <= 0) return null;
				return <Sparkle key={i} x={st.x} y={st.y} size={st.size} s={s} color={st.color} />;
			})}
		</AbsoluteFill>
	);
};

// Handwritten sticker with a quote line and a hand-drawn arrow.
export const NoteSticker: React.FC<{g: GraphicOf<'note'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = pop(frame, 0, fps);
	const arrow = reveal(frame, 10, 10);
	return (
		<div style={{position: 'absolute', top: 330, left: 60, transform: `rotate(-5deg) scale(${0.8 + 0.2 * s})`, transformOrigin: 'left top', opacity: exitFade(frame, durationInFrames)}}>
			<div style={{position: 'absolute', left: -30, top: -16, width: 620, height: 210, background: 'rgba(30,30,36,0.42)', borderRadius: 60, filter: 'blur(18px)'}} />
			<div style={{position: 'relative', fontFamily: fonts.hand, fontWeight: 700, fontSize: 92, color: colors.white, lineHeight: 1, textShadow: '0 3px 10px rgba(0,0,0,0.6)', clipPath: wipe(reveal(frame, 0, 12)), whiteSpace: 'nowrap'}}>{g.text}</div>
			<div style={{position: 'relative', fontFamily: fonts.hand, fontWeight: 600, fontSize: 54, color: colors.white, marginTop: 6, marginLeft: 30, textShadow: '0 2px 8px rgba(0,0,0,0.6)', opacity: reveal(frame, 8, 8), whiteSpace: 'nowrap'}}>{g.by}</div>
			<svg width={200} height={180} viewBox="0 0 200 180" style={{marginLeft: 120, overflow: 'visible'}}>
				<path d="M20 10 C 60 60, 120 70, 150 150" fill="none" stroke={colors.pink} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - arrow} />
				<path d="M120 140 L 152 156 L 160 120" fill="none" stroke={colors.pink} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={arrow > 0.95 ? 1 : 0} />
			</svg>
		</div>
	);
};

// Phone-style battery charging to 100%.
export const BatteryMeter: React.FC<{g: GraphicOf<'battery'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = pop(frame, 0, fps);
	const fill = interpolate(frame, [8, 44], [0.08, 1], {...clamp});
	const full = frame >= 44;
	const fullPop = spring({frame: frame - 44, fps, config: {damping: 9, stiffness: 220}});
	const pct = Math.round(fill * 100);
	return (
		<div style={{position: 'absolute', top: 330, left: 60, transform: `scale(${0.8 + 0.2 * s})`, transformOrigin: 'left top', opacity: exitFade(frame, durationInFrames)}}>
			<div style={{fontFamily: fonts.sans, fontWeight: 900, fontSize: 44, letterSpacing: 3, color: colors.white, textShadow: '0 2px 8px rgba(0,0,0,0.55)'}}>{g.label}</div>
			<div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 14}}>
				<div style={{position: 'relative', width: 300, height: 130, border: '10px solid white', borderRadius: 26, boxShadow: '0 6px 18px rgba(0,0,0,0.35)', background: 'rgba(30,30,36,0.35)'}}>
					<div style={{position: 'absolute', left: 8, top: 8, bottom: 8, width: `calc(${fill * 100}% - 16px)`, borderRadius: 14, background: colors.pink}} />
					<div style={{position: 'absolute', right: -30, top: 34, width: 18, height: 42, borderRadius: 6, background: 'white'}} />
					<svg width={70} height={90} viewBox="0 0 70 90" style={{position: 'absolute', left: 115, top: 10, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))'}}>
						<path d="M42 4 L 10 50 L 32 50 L 26 86 L 60 36 L 38 36 Z" fill="white" />
					</svg>
				</div>
				<div style={{fontFamily: fonts.sans, fontWeight: 900, fontSize: 92, color: colors.white, marginLeft: 20, textShadow: '0 3px 10px rgba(0,0,0,0.55)', transform: `scale(${full ? 1 + 0.15 * (1 - fullPop) + 0.0 : 1})`}}>{pct}%</div>
			</div>
			<div style={{fontFamily: fonts.hand, fontWeight: 700, fontSize: 60, color: colors.white, marginTop: 6, textShadow: '0 2px 8px rgba(0,0,0,0.6)', clipPath: wipe(reveal(frame, 44, 12))}}>{g.done}</div>
		</div>
	);
};

// Semicircle gauge; the needle swings from the left label to the right label.
export const TasteMeter: React.FC<{g: GraphicOf<'gauge'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = pop(frame, 0, fps);
	const swing = spring({frame: frame - 10, fps, config: {damping: 7, stiffness: 90, mass: 0.8}});
	const angle = -90 + 172 * swing; // degrees, -90 = left, +90 = right
	const R = 170;
	return (
		<div style={{position: 'absolute', top: 330, left: 60, width: 420, transform: `scale(${0.8 + 0.2 * s})`, transformOrigin: 'left top', opacity: exitFade(frame, durationInFrames)}}>
			<div style={{fontFamily: fonts.hand, fontWeight: 700, fontSize: 70, color: colors.white, textShadow: '0 2px 8px rgba(0,0,0,0.6)', textAlign: 'center'}}>{g.title}</div>
			<svg width={420} height={230} viewBox="0 0 420 230" style={{overflow: 'visible', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.45))'}}>
				<path d={`M ${210 - R} 210 A ${R} ${R} 0 0 1 ${210 + R} 210`} fill="rgba(30,30,36,0.45)" stroke="white" strokeWidth={10} />
				<path d={`M ${210 + R * Math.cos(Math.PI * 0.25)} ${210 - R * Math.sin(Math.PI * 0.25)} A ${R} ${R} 0 0 1 ${210 + R} 210`} fill="none" stroke={colors.pink} strokeWidth={18} />
				{Array.from({length: 9}).map((_, i) => {
					const a = Math.PI - (i / 8) * Math.PI;
					return <line key={i} x1={210 + (R - 16) * Math.cos(a)} y1={210 - (R - 16) * Math.sin(a)} x2={210 + (R - 40) * Math.cos(a)} y2={210 - (R - 40) * Math.sin(a)} stroke="white" strokeWidth={6} strokeLinecap="round" />;
				})}
				<g transform={`rotate(${angle} 210 210)`}>
					<line x1={210} y1={210} x2={210} y2={210 - R + 30} stroke={colors.pink} strokeWidth={12} strokeLinecap="round" />
				</g>
				<circle cx={210} cy={210} r={18} fill="white" />
				<text x={210 - R - 6} y={260} fill="white" fontFamily="Caveat" fontWeight={700} fontSize={46} textAnchor="middle">{g.low}</text>
				<text x={210 + R + 6} y={260} fill="white" fontFamily="Montserrat" fontWeight={900} fontSize={46} textAnchor="middle" opacity={swing > 0.8 ? 1 : 0.4}>{g.high}</text>
			</svg>
		</div>
	);
};

// Medal badge, e.g. "Clean Plate Club".
export const MedalBadge: React.FC<{g: GraphicOf<'badge'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = pop(frame, 0, fps);
	const spin = interpolate(s, [0, 1], [-25, -6]);
	return (
		<div style={{position: 'absolute', top: 330, left: 60, display: 'flex', alignItems: 'center', gap: 18, transform: `scale(${0.6 + 0.4 * s}) rotate(${spin}deg)`, transformOrigin: 'left center', opacity: exitFade(frame, durationInFrames)}}>
			<svg width={150} height={190} viewBox="0 0 150 190" style={{filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.4))'}}>
				<path d="M40 0 L 70 70 L 50 80 L 20 10 Z" fill={colors.pink} />
				<path d="M110 0 L 80 70 L 100 80 L 130 10 Z" fill={colors.pink} />
				<circle cx={75} cy={120} r={60} fill="white" stroke={colors.pink} strokeWidth={10} />
				<path d="M75 85 L 85 108 L 110 110 L 91 126 L 97 151 L 75 138 L 53 151 L 59 126 L 40 110 L 65 108 Z" fill={colors.pink} />
			</svg>
			<div>
				<div style={{fontFamily: fonts.sans, fontWeight: 900, fontSize: 60, color: colors.white, lineHeight: 1.05, textShadow: '0 3px 10px rgba(0,0,0,0.55)', textTransform: 'uppercase', whiteSpace: 'nowrap'}}>{g.title}</div>
				<div style={{fontFamily: fonts.hand, fontWeight: 700, fontSize: 56, color: colors.white, textShadow: '0 2px 8px rgba(0,0,0,0.6)', clipPath: wipe(reveal(frame, 8, 10))}}>{g.subtitle}</div>
			</div>
		</div>
	);
};

// Rubber stamp that slams down.
export const Stamp: React.FC<{g: GraphicOf<'stamp'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const scale = interpolate(frame, [0, 4], [2.4, 1], {...clamp});
	const shake = frame >= 4 && frame < 10 ? Math.sin(frame * 3) * 4 : 0;
	return (
		<div style={{position: 'absolute', top: 650, left: 50, transform: `translateX(${shake}px) rotate(-12deg) scale(${scale})`, transformOrigin: 'center', opacity: Math.min(1, frame / 2) * exitFade(frame, durationInFrames)}}>
			<div style={{border: `9px solid ${colors.pink}`, borderRadius: 18, padding: 6, background: 'rgba(255,255,255,0.9)', boxShadow: '0 8px 22px rgba(0,0,0,0.35)'}}>
				<div style={{border: `4px solid ${colors.pink}`, borderRadius: 10, padding: '10px 28px', display: 'flex', alignItems: 'center', gap: 14}}>
					<svg width={54} height={54} viewBox="0 0 40 40">
						<path d="M7 21 L 16 30 L 34 10" fill="none" stroke={colors.pink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					<span style={{fontFamily: fonts.sans, fontWeight: 900, fontSize: 52, letterSpacing: 3, color: colors.pink, whiteSpace: 'nowrap'}}>{g.text}</span>
				</div>
			</div>
		</div>
	);
};

// Hearts floating up.
export const HeartsBurst: React.FC<{g: GraphicOf<'hearts'>; durationInFrames: number}> = ({durationInFrames}) => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			{Array.from({length: 10}).map((_, i) => {
				const start = Math.floor(random(`h${i}`) * 12);
				const local = frame - start;
				if (local < 0) return null;
				const x = 120 + random(`hx${i}`) * 560;
				const rise = interpolate(local, [0, durationInFrames], [0, 520], clamp);
				const op = interpolate(local, [0, 4, durationInFrames - 14, durationInFrames - 4], [0, 1, 1, 0], clamp);
				const size = 50 + random(`hs${i}`) * 50;
				return <Heart key={i} size={size} color={i % 2 ? colors.pink : colors.white} strokeWidth={9} progress={1} style={{position: 'absolute', left: x + Math.sin(local / 5 + i) * 20, top: 1180 - rise, opacity: op}} />;
			})}
		</AbsoluteFill>
	);
};
