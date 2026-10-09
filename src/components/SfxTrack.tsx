import React from 'react';
import {Html5Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import type {Sfx} from '../schema';
import {msToFrame} from '../theme';

export const dbToGain = (db: number) => Math.pow(10, db / 20);

// Each effect starts attackMs before its visual contact frame.
export const SfxTrack: React.FC<{sfx: Sfx[]}> = ({sfx}) => {
	const {fps} = useVideoConfig();
	return (
		<>
			{sfx.map((s, i) => (
				<Sequence key={i} from={Math.max(0, msToFrame(s.atMs - s.attackMs, fps))} durationInFrames={fps * 2} layout="none" name={`sfx ${s.src}`}>
					<Html5Audio src={staticFile(s.src)} volume={dbToGain(s.gainDb)} />
				</Sequence>
			))}
		</>
	);
};
