import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme';

// Thin retention bar along the top edge.
export const ProgressBar: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	return (
		<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: 'rgba(255,255,255,0.25)'}}>
			<div style={{height: '100%', width: `${(frame / (durationInFrames - 1)) * 100}%`, background: colors.pink}} />
		</div>
	);
};
