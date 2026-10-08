import React from 'react';
import {Easing, Freeze, interpolate, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Zoom} from '../schema';
import {msToFrame} from '../theme';

// Plays the cut and applies zooms (scale + origin) to it. Snap = instant spring on the word,
// push = slow eased push in. Each zoom eases back out over its last 6 frames.
// After the cut ends (end card), the last frame is held.
export const BaseVideo: React.FC<{src: string; cutMs: number; zooms: Zoom[]}> = ({src, cutMs, zooms}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const cutFrames = msToFrame(cutMs, fps);
	const z = zooms.find((zz) => frame >= msToFrame(zz.atMs, fps) && frame < msToFrame(zz.atMs + zz.durationMs, fps));
	let scale = 1;
	let origin = '50% 50%';
	if (z) {
		const start = msToFrame(z.atMs, fps);
		const end = msToFrame(z.atMs + z.durationMs, fps);
		const inP =
			z.style === 'snap'
				? spring({frame: frame - start, fps, config: {damping: 18, stiffness: 400}})
				: interpolate(frame, [start, end - 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin)});
		const outP = interpolate(frame, [end - 6, end], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
		scale = 1 + (z.scale - 1) * inP * outP;
		origin = `${z.focus[0] * 100}% ${z.focus[1] * 100}%`;
	}
	if (frame >= cutFrames) {
		// End card: slow push on the held last frame so the picture never sits dead still.
		scale = interpolate(frame, [cutFrames, cutFrames + 2 * fps], [1, 1.06], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.sin)});
		origin = '35% 30%';
	}
	const fill = {width: '100%', height: '100%', objectFit: 'cover'} as const;
	const video = <OffthreadVideo src={staticFile(src)} style={fill} />;
	return (
		<div style={{position: 'absolute', inset: 0, transform: `scale(${scale})`, transformOrigin: origin}}>
			{frame < cutFrames ? video : <Freeze frame={cutFrames - 1}>{video}</Freeze>}
		</div>
	);
};
