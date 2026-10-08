import React from 'react';
import {Composition} from 'remotion';
import timelineJson from '../timeline.json';
import {Postcard} from './Postcard';
import {timelineSchema, type Timeline} from './schema';

const timeline = timelineSchema.parse(timelineJson);

// Cover: same frames without captions. Render it at a frame where every postcard
// element has fully entered: `remotion still PostcardThumb out/thumb.jpg --frame=110`.
const Thumb: React.FC<Timeline> = (props) => <Postcard {...props} showCaptions={false} />;

const metadata = ({props}: {props: Timeline}) => ({
	fps: props.fps,
	durationInFrames: Math.ceil((props.durationMs / 1000) * props.fps),
});

export const RemotionRoot: React.FC = () => (
	<>
		<Composition
			id="PostcardDemo"
			component={Postcard}
			schema={timelineSchema}
			defaultProps={timeline}
			width={1080}
			height={1920}
			fps={timeline.fps}
			durationInFrames={1}
			calculateMetadata={metadata}
		/>
		<Composition
			id="PostcardThumb"
			component={Thumb}
			schema={timelineSchema}
			defaultProps={timeline}
			width={1080}
			height={1920}
			fps={timeline.fps}
			durationInFrames={1}
			calculateMetadata={metadata}
		/>
	</>
);
