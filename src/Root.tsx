import React from 'react';
import {Composition} from 'remotion';
import timelineJson from '../edit/timeline.json';
import {Cover} from './compositions/Cover';
import {Short} from './compositions/Short';
import {timelineSchema, type Timeline} from './schema';

const timeline = timelineSchema.parse(timelineJson);

// Duration comes from the cut (cutMs, measured with ffprobe) plus the end card.
const metadata = ({props}: {props: Timeline}) => ({
	fps: props.fps,
	durationInFrames: Math.round((props.durationMs / 1000) * props.fps),
});

export const RemotionRoot: React.FC = () => (
	<>
		<Composition id="Short" component={Short} schema={timelineSchema} defaultProps={timeline} width={1080} height={1920} fps={timeline.fps} durationInFrames={1} calculateMetadata={metadata} />
		<Composition id="ShortThumb" component={Cover} schema={timelineSchema} defaultProps={timeline} width={1080} height={1920} fps={timeline.fps} durationInFrames={1} />
	</>
);
