import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/DMSans';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import { ACCENT, BG, CARD, CARD_BORDER, FG, MODELS, MUTED } from './tokens';

const { fontFamily: serif } = loadFont('normal', { weights: ['400'], subsets: ['latin'] });
const { fontFamily: sans } = loadSans('normal', { weights: ['400', '600'], subsets: ['latin'] });
const { fontFamily: mono } = loadMono('normal', { weights: ['400'], subsets: ['latin'] });

// Scene 2: 5 model cards animate in one by one — ~5s (150 frames)
export const Scene2Models: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  return (
    <AbsoluteFill style={{ background: BG, padding: '80px 120px', flexDirection: 'column' }}>
      {/* Section label */}
      <div style={{
        fontFamily: mono, fontSize: 14, textTransform: 'uppercase',
        letterSpacing: '0.2em', color: ACCENT,
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        opacity: titleSpring,
      }}>
        <div style={{ width: 24, height: 1, background: ACCENT }} />
        The Ensemble
      </div>

      {/* Title */}
      <div style={{
        fontFamily: serif, fontSize: 64, color: FG, fontWeight: 400,
        letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 48,
        transform: `translateY(${titleY}px)`, opacity: titleSpring,
      }}>
        Five models. Maximum decorrelation.
      </div>

      {/* Model cards */}
      <div style={{ display: 'flex', gap: 2, flex: 1 }}>
        {MODELS.map((model, i) => {
          const delay = 0.3 + i * 0.18;
          const cardSpring = spring({
            frame: frame - delay * fps,
            fps,
            config: { damping: 200 },
          });
          const cardY = interpolate(cardSpring, [0, 1], [50, 0]);

          return (
            <div
              key={model.name}
              style={{
                flex: 1,
                background: CARD,
                border: `1px solid ${CARD_BORDER}`,
                borderTop: `2px solid ${model.color}`,
                padding: '24px 20px',
                opacity: cardSpring,
                transform: `translateY(${cardY}px)`,
                display: 'flex', flexDirection: 'column', gap: 8,
              }}
            >
              {/* Dot + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: model.color, flexShrink: 0,
                }} />
                <div style={{
                  fontFamily: sans, fontWeight: 600, fontSize: 15,
                  color: FG, lineHeight: 1.2,
                }}>
                  {model.name}
                </div>
              </div>

              {/* Org */}
              <div style={{
                fontFamily: mono, fontSize: 11, color: MUTED,
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                {model.org}
              </div>

              {/* Color accent bar */}
              <div style={{
                height: 1, background: CARD_BORDER, marginTop: 'auto',
                width: `${interpolate(cardSpring, [0, 1], [0, 100])}%`,
              }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
