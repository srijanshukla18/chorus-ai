import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import { ACCENT, ACCENT2, BG, CARD, CARD_BORDER, FG, MUTED } from './tokens';

const { fontFamily: serif } = loadFont('normal', { weights: ['400'], subsets: ['latin'] });
const { fontFamily: mono } = loadMono('normal', { weights: ['400'], subsets: ['latin'] });

const STEPS = [
  { num: '01', label: 'Parallel Dispatch', desc: 'Your prompt → 5 models simultaneously' },
  { num: '02', label: 'Stream & Collect', desc: 'Each model streams its answer in real-time' },
  { num: '03', label: 'Synthesize', desc: 'One aggregator. One high-confidence answer.' },
];

// Scene 3: How it works steps — ~5s (150 frames)
export const Scene3Concept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: BG, padding: '80px 120px', flexDirection: 'column' }}>
      <div style={{
        fontFamily: mono, fontSize: 14, textTransform: 'uppercase',
        letterSpacing: '0.2em', color: ACCENT,
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        opacity: titleSpring,
      }}>
        <div style={{ width: 24, height: 1, background: ACCENT }} />
        How It Works
      </div>

      <div style={{
        fontFamily: serif, fontSize: 72, color: FG, fontWeight: 400,
        letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 60,
        opacity: titleSpring,
        transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
      }}>
        Three steps. Zero servers.
      </div>

      <div style={{ display: 'flex', gap: 2, flex: 1 }}>
        {STEPS.map((step, i) => {
          const delay = 0.4 + i * 0.25;
          const s = spring({ frame: frame - delay * fps, fps, config: { damping: 200 } });

          return (
            <div key={step.num} style={{
              flex: 1,
              background: CARD,
              border: `1px solid ${CARD_BORDER}`,
              padding: '32px 28px',
              opacity: s,
              transform: `translateY(${interpolate(s, [0, 1], [50, 0])}px)`,
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                fontFamily: serif, fontSize: 64, color: ACCENT,
                opacity: 0.35, lineHeight: 1, marginBottom: 20,
              }}>
                {step.num}
              </div>
              <div style={{
                fontFamily: mono, fontWeight: 600, fontSize: 16,
                color: FG, marginBottom: 12, letterSpacing: '-0.01em',
              }}>
                {step.label}
              </div>
              <div style={{
                fontFamily: mono, fontSize: 13, color: MUTED, lineHeight: 1.6,
              }}>
                {step.desc}
              </div>
              {/* Animated bottom bar */}
              <div style={{
                height: 1, marginTop: 'auto',
                background: `linear-gradient(to right, ${ACCENT2}, transparent)`,
                width: `${interpolate(s, [0, 1], [0, 100])}%`,
                opacity: 0.6,
              }} />
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <div style={{
        fontFamily: serif, fontSize: 28, fontStyle: 'italic',
        color: ACCENT, marginTop: 32, textAlign: 'center',
        opacity: interpolate(frame, [3.5 * fps, 4.5 * fps], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        One model has biases. An ensemble cancels them out.
      </div>
    </AbsoluteFill>
  );
};
