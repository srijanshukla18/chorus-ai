import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import { ACCENT, BG, FG, MUTED } from './tokens';

const { fontFamily: serif } = loadFont('normal', { weights: ['400'], subsets: ['latin'] });
const { fontFamily: mono } = loadMono('normal', { weights: ['400'], subsets: ['latin'] });

// Scene 1: Title card — ~5s (150 frames at 30fps)
// "One prompt." → "Five minds." → "One truth." staggered reveals
export const Scene1Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Spring = spring({ frame, fps, config: { damping: 200 } });
  const line2Spring = spring({ frame: frame - 0.8 * fps, fps, config: { damping: 200 } });
  const line3Spring = spring({ frame: frame - 1.6 * fps, fps, config: { damping: 200 } });
  const labelOpacity = interpolate(frame, [1.2 * fps, 2 * fps], [0, 1], { extrapolateRight: 'clamp' });

  const line1Y = interpolate(line1Spring, [0, 1], [60, 0]);
  const line2Y = interpolate(line2Spring, [0, 1], [60, 0]);
  const line3Y = interpolate(line3Spring, [0, 1], [60, 0]);

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: 'center', alignItems: 'flex-start', padding: '0 120px' }}>
      {/* Grain overlay via SVG filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
        pointerEvents: 'none',
        opacity: 0.6,
      }} />

      {/* Label */}
      <div style={{
        position: 'absolute', top: 80, left: 120,
        fontFamily: mono, fontSize: 18, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: ACCENT, opacity: labelOpacity,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ width: 40, height: 1, background: ACCENT }} />
        LLM Ensemble Engine
      </div>

      {/* Headline lines */}
      <div style={{ overflow: 'hidden', marginBottom: 8 }}>
        <div style={{
          fontFamily: serif, fontSize: 120, lineHeight: 0.95, color: FG,
          transform: `translateY(${line1Y}px)`, opacity: line1Spring,
          letterSpacing: '-0.03em', fontWeight: 400,
        }}>
          One prompt.
        </div>
      </div>
      <div style={{ overflow: 'hidden', marginBottom: 8 }}>
        <div style={{
          fontFamily: serif, fontSize: 120, lineHeight: 0.95,
          transform: `translateY(${line2Y}px)`, opacity: line2Spring,
          letterSpacing: '-0.03em', fontWeight: 400,
          fontStyle: 'italic', color: ACCENT,
        }}>
          Five minds.
        </div>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          fontFamily: serif, fontSize: 120, lineHeight: 0.95, color: FG,
          transform: `translateY(${line3Y}px)`, opacity: line3Spring,
          letterSpacing: '-0.03em', fontWeight: 400,
        }}>
          One truth.
        </div>
      </div>

      {/* Bottom label */}
      <div style={{
        position: 'absolute', bottom: 80, left: 120,
        fontFamily: mono, fontSize: 14, color: MUTED,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        opacity: interpolate(frame, [2.5 * fps, 3.5 * fps], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        chorus.
      </div>
    </AbsoluteFill>
  );
};
