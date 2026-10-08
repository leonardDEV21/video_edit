import {z} from 'zod';

const caption = z.object({
	text: z.string(),
	startMs: z.number(),
	endMs: z.number(),
	emphasis: z.boolean(),
});

const zoom = z.object({
	atMs: z.number(),
	durationMs: z.number(),
	scale: z.number().min(1).max(1.5),
	style: z.enum(['snap', 'push']),
	focus: z.tuple([z.number(), z.number()]),
});

const span = {startMs: z.number(), endMs: z.number()};

const graphic = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('postcardTitle'),
		...span,
		title: z.string(),
		place: z.string(),
		country: z.string(),
		flag: z.enum(['TH', 'LT']),
	}),
	z.object({
		type: z.literal('weatherBadge'),
		...span,
		date: z.string(),
		tempC: z.number(),
		icon: z.enum(['sun']),
	}),
	z.object({
		type: z.literal('sideNotes'),
		...span,
		side: z.enum(['left', 'right']),
		notes: z.array(z.string()).min(1).max(5),
	}),
	z.object({
		type: z.literal('tagline'),
		...span,
		text: z.string(),
		anchor: z.enum(['bottomRight', 'bottomLeft']),
	}),
]);

// What sits under the graphics: a photo, the cut video, or the drawn stand-in beach.
// `src` is a path inside public/, e.g. "photos/crystal-beach.jpg" or "cut.mp4".
const background = z.object({
	type: z.enum(['image', 'video', 'drawn']),
	src: z.string().optional(),
});

export const timelineSchema = z.object({
	fps: z.number(),
	durationMs: z.number(),
	background,
	captions: z.array(caption),
	zooms: z.array(zoom),
	graphics: z.array(graphic),
});

export type Timeline = z.infer<typeof timelineSchema>;
export type Caption = z.infer<typeof caption>;
export type Zoom = z.infer<typeof zoom>;
export type Graphic = z.infer<typeof graphic>;
export type GraphicOf<T extends Graphic['type']> = Extract<Graphic, {type: T}>;
