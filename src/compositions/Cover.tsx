import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile} from 'remotion';
import {BrushStroke} from '../components/BrushStroke';
import {Flag, Heart, Palm} from '../components/Doodles';
import type {Timeline} from '../schema';
import {colors, fonts, msToFrame} from '../theme';

// Cover in the postcard style, from the owner's chosen frame (source 15.0 s = cut 14.65 s).
export const COVER_FRAME_MS = 14650;

export const Cover: React.FC<Timeline> = (t) => (
	<AbsoluteFill style={{backgroundColor: '#000', overflow: 'hidden'}}>
		<div style={{position: 'absolute', inset: 0, transform: 'scale(1.05)', transformOrigin: '62% 45%'}}>
			<OffthreadVideo src={staticFile(t.cut)} trimBefore={msToFrame(COVER_FRAME_MS, t.fps)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
		</div>
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 30%)'}} />
		<div style={{position: 'absolute', top: 262, left: 40, right: 150, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			<div style={{position: 'relative', transform: 'rotate(-6deg)'}}>
				<div style={{fontFamily: fonts.script, fontSize: 200, lineHeight: 1.05, color: colors.white, whiteSpace: 'nowrap', padding: '0 20px', textShadow: '0 4px 16px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.4)'}}>
					Koh Tao
				</div>
				<Heart size={80} color={colors.pink} progress={1} strokeWidth={7} style={{position: 'absolute', top: -30, right: 40}} />
				<Palm size={170} color={colors.white} progress={1} style={{position: 'absolute', top: -70, right: -120}} />
			</div>
			<div style={{marginTop: 4}}>
				<BrushStroke seed="cover-hook" progress={1} textProgress={1} padding="6px 36px 10px">
					<div style={{fontFamily: fonts.hand, fontWeight: 700, fontSize: 76, color: colors.dark, whiteSpace: 'nowrap', lineHeight: 1.1}}>
						{`Breakfast for ${t.money.people} = ${t.money.billThb} baht`}
					</div>
				</BrushStroke>
			</div>
			<div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 14}}>
				<span style={{fontFamily: fonts.sans, fontWeight: 700, fontSize: 30, letterSpacing: 7, color: colors.white, textShadow: '0 2px 6px rgba(0,0,0,0.55)'}}>
					TAO THONG VILLA 2 · THAILAND
				</span>
				<Flag code="TH" width={44} />
			</div>
		</div>
	</AbsoluteFill>
);
