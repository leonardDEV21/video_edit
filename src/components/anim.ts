import {Easing, interpolate, spring} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// 0 -> 1 over `duration` frames starting at `start`, eased out.
export const reveal = (frame: number, start: number, duration: number) =>
	interpolate(frame, [start, start + duration], [0, 1], {
		...clamp,
		easing: Easing.out(Easing.cubic),
	});

// Springy entrance, 0 -> 1 (may overshoot slightly).
export const pop = (frame: number, start: number, fps: number) =>
	spring({frame: frame - start, fps, config: {damping: 12, stiffness: 160, mass: 0.6}});

// Exit is faster than entrance: 1 -> 0 over 9 frames ending at `end`.
export const exitFade = (frame: number, end: number) =>
	interpolate(frame, [end - 9, end], [1, 0], {...clamp, easing: Easing.in(Easing.quad)});

// Left-to-right wipe, used for handwriting and brush strokes. Fully open (p = 1)
// leaves room for script and italic overhangs past the element edge.
export const wipe = (p: number) => `inset(-20% ${(1 - p) * 115 - 15}% -20% -5%)`;
