import React, {useMemo} from 'react';
import {Html5Audio, interpolate, staticFile, useVideoConfig} from 'remotion';
import type {Caption, Timeline} from '../schema';
import {dbToGain} from './SfxTrack';

const ATTACK_MS = 150;
const RELEASE_MS = 450;
const MERGE_GAP_MS = 500;

// Speech windows from the captions (phrase gaps under 500ms count as speech).
const speechWindows = (captions: Caption[]) => {
	const out: [number, number][] = [];
	for (const c of captions) {
		const last = out[out.length - 1];
		if (last && c.startMs - last[1] < MERGE_GAP_MS) {
			last[1] = Math.max(last[1], c.endMs);
		} else {
			out.push([c.startMs, c.endMs]);
		}
	}
	return out;
};

// Bed at gainDb, ducked by duckDb under speech. It carries the end card and fades out at the very end.
export const MusicBed: React.FC<{music: Timeline['music']; captions: Caption[]; endMs: number}> = ({music, captions, endMs}) => {
	const {fps} = useVideoConfig();
	const windows = useMemo(() => speechWindows(captions), [captions]);
	const volume = (f: number) => {
		const ms = (f / fps) * 1000;
		let duck = 0;
		for (const [s, e] of windows) {
			const d = interpolate(ms, [s - ATTACK_MS, s, e, e + RELEASE_MS], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
			duck = Math.max(duck, d);
		}
		const fadeIn = interpolate(ms, [0, 400], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
		const fadeOut = interpolate(ms, [endMs - music.fadeOutMs, endMs], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
		return dbToGain(music.gainDb + music.duckDb * duck) * fadeIn * fadeOut;
	};
	return <Html5Audio src={staticFile(music.src)} volume={volume} />;
};
