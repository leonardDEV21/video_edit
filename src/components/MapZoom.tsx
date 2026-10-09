import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import type {GraphicOf} from '../schema';
import {colors, fonts} from '../theme';
import {exitFade, reveal} from './anim';
import {BrushStroke} from './BrushStroke';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Fullscreen "where we are" map. Stage images are OSM renders centred on the pin, each at its own
// web-map zoom level. A continuous zoom value Z drives every stage's scale (2^(Z - stage.zoom)),
// so the stages line up, and each next stage fades in once it covers the frame.
export const MapZoom: React.FC<{g: GraphicOf<'mapZoom'>; durationInFrames: number}> = ({g, durationInFrames}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const stages = [...g.stages].sort((a, b) => a.zoom - b.zoom);
	const z0 = stages[0].zoom;
	const z1 = stages[stages.length - 1].zoom;
	const zoomStart = Math.round(durationInFrames * 0.16);
	const zoomEnd = Math.round(durationInFrames * 0.6);
	const Z = interpolate(frame, [zoomStart, zoomEnd], [z0, z1], {...clamp, easing: Easing.inOut(Easing.cubic)});
	const enter = interpolate(frame, [0, 5], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
	const pinDrop = spring({frame: frame - zoomEnd + 4, fps, config: {damping: 11, stiffness: 180, mass: 0.6}});
	const regionLabel = reveal(frame, 2, 8) * interpolate(frame, [zoomStart + 12, zoomStart + 18], [1, 0], clamp);
	const placeP = reveal(frame, zoomEnd, 9);
	return (
		<AbsoluteFill style={{opacity: enter * exitFade(frame, durationInFrames), backgroundColor: '#AAD3DF', overflow: 'hidden'}}>
			{stages.map((s, i) => {
				const scale = Math.pow(2, Z - s.zoom);
				const fadeIn = i === 0 ? 1 : interpolate(Z, [s.zoom, s.zoom + 0.35], [0, 1], clamp);
				if (fadeIn <= 0 || scale > 6) {
					return null;
				}
				return (
					<Img
						key={s.src}
						src={staticFile(s.src)}
						style={{
							position: 'absolute',
							left: 0,
							top: 0,
							width: 1080,
							height: 1920,
							objectFit: 'cover',
							transform: `scale(${scale})`,
							transformOrigin: '50% 50%',
							opacity: fadeIn,
						}}
					/>
				);
			})}
			<AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.28) 100%)'}} />
			{/* Pin: a dot during the zoom, then a dropped teardrop at the venue */}
			<div style={{position: 'absolute', left: 540, top: 960, transform: 'translate(-50%, -50%)'}}>
				<div style={{width: 34, height: 34, borderRadius: 17, background: colors.pink, border: '6px solid white', boxShadow: '0 3px 10px rgba(0,0,0,0.4)', opacity: 1 - pinDrop}} />
			</div>
			<svg
				width={110}
				height={140}
				viewBox="0 0 100 130"
				style={{position: 'absolute', left: 540 - 55, top: 960 - 132, transform: `translateY(${(1 - pinDrop) * -120}px)`, opacity: Math.min(1, pinDrop * 2), filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.35))'}}
			>
				<path d="M50 126 C 30 92, 8 70, 8 44 A 42 42 0 1 1 92 44 C 92 70, 70 92, 50 126 Z" fill={colors.pink} stroke="white" strokeWidth={6} />
				<circle cx={50} cy={44} r={15} fill="white" />
			</svg>
			{/* Region label at the wide view */}
			<div style={{position: 'absolute', left: 575, top: 880, opacity: regionLabel}}>
				<BrushStroke seed={`region-${g.region}`} progress={regionLabel} textProgress={regionLabel} rotate={-4}>
					<div style={{fontFamily: fonts.hand, fontWeight: 700, fontSize: 96, color: colors.dark, whiteSpace: 'nowrap'}}>{g.region}</div>
				</BrushStroke>
			</div>
			{/* Venue label once the pin lands */}
			<div style={{position: 'absolute', top: 1010, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
				<BrushStroke seed={`venue-${g.label}`} progress={placeP} textProgress={reveal(frame, zoomEnd + 4, 9)} rotate={-3}>
					<div style={{fontFamily: fonts.hand, fontWeight: 700, fontSize: 76, color: colors.dark, whiteSpace: 'nowrap'}}>{g.label}</div>
				</BrushStroke>
				<div
					style={{
						fontFamily: fonts.sans,
						fontWeight: 700,
						fontSize: 30,
						letterSpacing: 4,
						color: colors.white,
						textShadow: '0 2px 6px rgba(0,0,0,0.6)',
						opacity: reveal(frame, zoomEnd + 8, 8),
					}}
				>
					{`${g.lat.toFixed(3)}° N · ${g.lon.toFixed(3)}° E`}
				</div>
			</div>
			<div style={{position: 'absolute', left: 40, top: 1250, fontFamily: fonts.sans, fontWeight: 700, fontSize: 22, color: 'rgba(30,30,36,0.75)'}}>{g.attribution}</div>
		</AbsoluteFill>
	);
};
