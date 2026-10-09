import React from 'react';
import {AbsoluteFill, Freeze, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {BaseVideo} from '../components/BaseVideo';
import {Cover} from './Cover';
import {BRoll} from '../components/BRoll';
import {Callout} from '../components/Callout';
import {EndCard} from '../components/EndCard';
import {HookTitle} from '../components/HookTitle';
import {KaraokeCaptions} from '../components/KaraokeCaptions';
import {MapZoom} from '../components/MapZoom';
import {MusicBed} from '../components/MusicBed';
import {PostcardTitle} from '../components/PostcardTitle';
import {PriceTag} from '../components/PriceTag';
import {ProgressBar} from '../components/ProgressBar';
import {SfxTrack} from '../components/SfxTrack';
import {SideNotes} from '../components/SideNotes';
import {SubscribeBell} from '../components/SubscribeBell';
import {BatteryMeter, HeartsBurst, HeroShine, MedalBadge, NoteSticker, Stamp, TasteMeter} from '../components/Fun';
import {Tagline} from '../components/Tagline';
import {Watermark} from '../components/Watermark';
import {WeatherBadge} from '../components/WeatherBadge';
import type {Graphic, Timeline} from '../schema';
import {msToFrame} from '../theme';

const renderGraphic = (g: Graphic, d: number) => {
	switch (g.type) {
		case 'hookTitle':
			return <HookTitle g={g} durationInFrames={d} />;
		case 'postcardTitle':
			return <PostcardTitle g={g} durationInFrames={d} />;
		case 'weatherBadge':
			return <WeatherBadge g={g} durationInFrames={d} />;
		case 'sideNotes':
			return <SideNotes g={g} durationInFrames={d} />;
		case 'tagline':
			return <Tagline g={g} durationInFrames={d} />;
		case 'callout':
			return <Callout g={g} durationInFrames={d} />;
		case 'priceTag':
			return <PriceTag g={g} durationInFrames={d} />;
		case 'mapZoom':
			return <MapZoom g={g} durationInFrames={d} />;
		case 'subscribe':
			return <SubscribeBell g={g} durationInFrames={d} />;
		case 'heroShine':
			return <HeroShine g={g} durationInFrames={d} />;
		case 'note':
			return <NoteSticker g={g} durationInFrames={d} />;
		case 'battery':
			return <BatteryMeter g={g} durationInFrames={d} />;
		case 'gauge':
			return <TasteMeter g={g} durationInFrames={d} />;
		case 'badge':
			return <MedalBadge g={g} durationInFrames={d} />;
		case 'stamp':
			return <Stamp g={g} durationInFrames={d} />;
		case 'hearts':
			return <HeartsBurst g={g} durationInFrames={d} />;
	}
};

const Span: React.FC<{startMs: number; endMs: number; name: string; children: (d: number) => React.ReactNode}> = ({startMs, endMs, name, children}) => {
	const {fps} = useVideoConfig();
	const from = msToFrame(startMs, fps);
	const d = msToFrame(endMs, fps) - from;
	return (
		<Sequence from={from} durationInFrames={d} layout="none" name={name}>
			{children(d)}
		</Sequence>
	);
};

// Watermark sits top-left; it steps aside while a top-left graphic is on screen.
const TOP_LEFT = new Set(['hookTitle', 'postcardTitle', 'callout', 'priceTag', 'mapZoom', 'subscribe', 'note', 'battery', 'gauge', 'badge']);
const WatermarkLayer: React.FC<{t: Timeline}> = ({t}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const ms = (frame / fps) * 1000;
	const busy = t.graphics.some((g) => TOP_LEFT.has(g.type) && ms >= g.startMs - 150 && ms < g.endMs + 150);
	if (busy || ms >= t.endCard.startMs) {
		return null;
	}
	return <Watermark handle={t.watermark.handle} />;
};

// 1080x1920 Short: one cut, every layer driven by timeline.json.
export const Short: React.FC<Timeline & {showCaptions?: boolean}> = (t) => {
	const {showCaptions = true} = t;
	const overlays = t.graphics.filter((g) => g.type !== 'mapZoom');
	const maps = t.graphics.filter((g) => g.type === 'mapZoom');
	return (
		<AbsoluteFill style={{backgroundColor: '#000', overflow: 'hidden'}}>
			<BaseVideo src={t.cut} cutMs={t.cutMs} zooms={t.zooms} holdMs={t.endCard.holdMs} holdFocus={t.endCard.focus} />
			{t.broll.map((b, i) => (
				<Span key={`b${i}`} startMs={b.startMs} endMs={b.endMs} name={`broll ${i}`}>
					{(d) => <BRoll b={b} durationInFrames={d} />}
				</Span>
			))}
			{overlays.map((g, i) => (
				<Span key={`g${i}`} startMs={g.startMs} endMs={g.endMs} name={g.type}>
					{(d) => renderGraphic(g, d)}
				</Span>
			))}
			{maps.map((g, i) => (
				<Span key={`m${i}`} startMs={g.startMs} endMs={g.endMs} name="map">
					{(d) => renderGraphic(g, d)}
				</Span>
			))}
			{showCaptions ? <KaraokeCaptions captions={t.captions} top={1280} /> : null}
			<WatermarkLayer t={t} />
			<ProgressBar />
			<Span startMs={t.endCard.startMs} endMs={t.durationMs} name="end card">
				{() => <EndCard handle={t.endCard.handle} text={t.endCard.text} />}
			</Span>
			<SfxTrack sfx={t.sfx} />
			<MusicBed music={t.music} captions={t.captions} endMs={t.durationMs} />
			{t.cover.introFrames > 0 ? (
				// Poster frames: the cover sits on top of everything for the first few frames, so the
				// unplayed video shows it on every platform. Audio is untouched.
				<Sequence from={0} durationInFrames={t.cover.introFrames} name="cover (poster frames)">
					<Freeze frame={0}>
						<Cover {...t} />
					</Freeze>
				</Sequence>
			) : null}
		</AbsoluteFill>
	);
};
