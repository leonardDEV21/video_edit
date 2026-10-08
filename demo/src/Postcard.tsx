import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {BaseVideo} from './components/BaseVideo';
import {BeachBackground} from './components/BeachBackground';
import {KaraokeCaptions} from './components/KaraokeCaptions';
import {PostcardTitle} from './components/PostcardTitle';
import {SideNotes} from './components/SideNotes';
import {Tagline} from './components/Tagline';
import {WeatherBadge} from './components/WeatherBadge';
import type {Graphic, Timeline} from './schema';
import {msToFrame} from './theme';

const renderGraphic = (g: Graphic, durationInFrames: number) => {
	switch (g.type) {
		case 'postcardTitle':
			return <PostcardTitle g={g} durationInFrames={durationInFrames} />;
		case 'weatherBadge':
			return <WeatherBadge g={g} durationInFrames={durationInFrames} />;
		case 'sideNotes':
			return <SideNotes g={g} durationInFrames={durationInFrames} />;
		case 'tagline':
			return <Tagline g={g} durationInFrames={durationInFrames} />;
	}
};

export const Postcard: React.FC<Timeline & {showCaptions?: boolean}> = ({captions, zooms, graphics, showCaptions = true}) => {
	const {fps} = useVideoConfig();
	return (
		<AbsoluteFill style={{backgroundColor: '#000', overflow: 'hidden'}}>
			<BaseVideo zooms={zooms}>
				<BeachBackground />
			</BaseVideo>
			{graphics.map((g, i) => {
				const from = msToFrame(g.startMs, fps);
				const durationInFrames = msToFrame(g.endMs, fps) - from;
				return (
					<Sequence key={i} from={from} durationInFrames={durationInFrames} layout="none">
						{renderGraphic(g, durationInFrames)}
					</Sequence>
				);
			})}
			{showCaptions ? <KaraokeCaptions captions={captions} top={1310} /> : null}
		</AbsoluteFill>
	);
};
