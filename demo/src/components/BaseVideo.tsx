import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Zoom} from '../schema';
import {msToFrame} from '../theme';

// Applies zooms (scale + origin) to the footage layer. Snap = instant spring on the word,
// push = slow eased push in. Each zoom eases back out over its last 6 frames.
export const BaseVideo: React.FC<{zooms: Zoom[]; children: React.ReactNode}> = ({zooms, children}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
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
	return <div style={{position: 'absolute', inset: 0, transform: `scale(${scale})`, transformOrigin: origin}}>{children}</div>;
};
