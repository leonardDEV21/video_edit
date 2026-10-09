import {z} from 'zod';

const caption = z.object({text: z.string(), startMs: z.number(), endMs: z.number(), emphasis: z.boolean()});

const zoom = z.object({
	atMs: z.number(),
	durationMs: z.number(),
	scale: z.number().min(1).max(1.5),
	style: z.enum(['snap', 'push']),
	focus: z.tuple([z.number(), z.number()]),
});

const span = {startMs: z.number(), endMs: z.number()};

const graphic = z.discriminatedUnion('type', [
	z.object({type: z.literal('hookTitle'), ...span, text: z.string(), highlight: z.string()}),
	z.object({
		type: z.literal('postcardTitle'),
		...span,
		title: z.string(),
		place: z.string(),
		country: z.string(),
		flag: z.enum(['TH', 'LT']),
	}),
	z.object({type: z.literal('weatherBadge'), ...span, date: z.string(), tempC: z.number(), icon: z.enum(['sun'])}),
	z.object({type: z.literal('sideNotes'), ...span, side: z.enum(['left', 'right']), notes: z.array(z.string()).min(1).max(5)}),
	z.object({type: z.literal('tagline'), ...span, text: z.string(), anchor: z.enum(['bottomRight', 'bottomLeft'])}),
	z.object({type: z.literal('subscribe'), ...span, handle: z.string()}),
	z.object({type: z.literal('heroShine'), ...span, focus: z.tuple([z.number(), z.number()]), radius: z.number()}),
	z.object({type: z.literal('note'), ...span, text: z.string(), by: z.string()}),
	z.object({type: z.literal('battery'), ...span, label: z.string(), done: z.string()}),
	z.object({type: z.literal('gauge'), ...span, title: z.string(), low: z.string(), high: z.string()}),
	z.object({type: z.literal('badge'), ...span, title: z.string(), subtitle: z.string()}),
	z.object({type: z.literal('stamp'), ...span, text: z.string()}),
	z.object({type: z.literal('hearts'), ...span}),
	z.object({type: z.literal('callout'), ...span, text: z.string(), anchor: z.enum(['topLeft', 'topRight'])}),
	z.object({
		type: z.literal('priceTag'),
		...span,
		lines: z.array(z.object({atMs: z.number(), text: z.string(), style: z.enum(['big', 'pill', 'note'])})).min(1),
	}),
	z.object({
		type: z.literal('mapZoom'),
		...span,
		lat: z.number(),
		lon: z.number(),
		label: z.string(),
		region: z.string(),
		stages: z.array(z.object({src: z.string(), zoom: z.number()})).min(2),
		attribution: z.string(),
	}),
]);

const broll = z.object({
	src: z.string(),
	trimMs: z.number(),
	startMs: z.number(),
	endMs: z.number(),
	mode: z.enum(['fullscreen', 'pip']),
});

const sfx = z.object({src: z.string(), atMs: z.number(), gainDb: z.number().max(0), attackMs: z.number().min(0)});

const money = z.object({
	rateEurThb: z.string(),
	rateDate: z.string(),
	rateSource: z.string(),
	billThb: z.number(),
	people: z.number().int().positive(),
	billEur: z.string(),
	eachThb: z.number(),
	eachEur: z.string(),
});

export const timelineSchema = z.object({
	fps: z.number(),
	cut: z.string(),
	cutMs: z.number(),
	durationMs: z.number(),
	cuts: z.array(z.number()),
	money,
	captions: z.array(caption),
	zooms: z.array(zoom),
	graphics: z.array(graphic),
	broll: z.array(broll),
	sfx: z.array(sfx),
	music: z.object({src: z.string(), gainDb: z.number(), duckDb: z.number(), fadeOutMs: z.number(), credit: z.string()}),
	watermark: z.object({handle: z.string()}),
	endCard: z.object({startMs: z.number(), handle: z.string(), text: z.string(), holdMs: z.number(), focus: z.tuple([z.number(), z.number()])}),
});

export type Timeline = z.infer<typeof timelineSchema>;
export type Caption = z.infer<typeof caption>;
export type Zoom = z.infer<typeof zoom>;
export type Graphic = z.infer<typeof graphic>;
export type GraphicOf<T extends Graphic['type']> = Extract<Graphic, {type: T}>;
export type BRollItem = z.infer<typeof broll>;
export type Sfx = z.infer<typeof sfx>;
