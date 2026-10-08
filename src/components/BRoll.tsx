import React from 'react';
import {interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import type {BRollItem} from '../schema';
import {msToFrame} from '../theme';

// Cutaway insert. The voice keeps playing from the main cut underneath, so this layer is muted.
export const BRoll: React.FC<{b: BRollItem; durationInFrames: number}> = ({b, durationInFrames}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const scale = interpolate(frame, [0, durationInFrames], [1.04, 1.1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const style: React.CSSProperties =
		b.mode === 'fullscreen'
			? {position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale})`}
			: {position: 'absolute', right: 160, top: 600, width: 420, borderRadius: 24, border: '6px solid white'};
	return <OffthreadVideo src={staticFile(b.src)} trimBefore={msToFrame(b.trimMs, fps)} muted style={style} />;
};
