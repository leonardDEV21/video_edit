import React from 'react';
import {fonts} from '../theme';

// Channel handle, low opacity, fixed top-left inside the safe area.
export const Watermark: React.FC<{handle: string}> = ({handle}) => (
	<div
		style={{
			position: 'absolute',
			top: 262,
			left: 44,
			fontFamily: fonts.sans,
			fontWeight: 700,
			fontSize: 30,
			color: 'rgba(255,255,255,0.78)',
			textShadow: '0 1px 3px rgba(0,0,0,0.75), 0 0 10px rgba(0,0,0,0.45)',
		}}
	>
		{handle}
	</div>
);
