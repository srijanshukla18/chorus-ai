import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/DMSans';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import { ACCENT, ACCENT2, BG, CARD, CARD_BORDER, FG, MODELS, MUTED } from './tokens';

const { fontFamily: serif } = loadFont('normal', { weights: ['400'], subsets: ['latin'] });
const { fontFamily: sans } = loadSans('normal', { weights: ['400', '500', '600'], subsets: ['latin'] });
const { fontFamily: mono } = loadMono('normal', { weights: ['400', '600'], subsets: ['latin'] });

const PROMPT = 'What should I understand about LLM ensemble methods?';

// Scene 4: User types a prompt into the chat UI — ~4s (120 frames)
export const Scene4Chat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const uiSpring = spring({ frame, fps, config: { damping: 200 } });
  const uiY = interpolate(uiSpring, [0, 1], [60, 0]);

  // Prompt starts typing at 1s
  const typeFrame = Math.max(0, frame - 1 * fps);
  const charsPerFrame = PROMPT.length / (2 * fps); // types over 2s
  const typedChars = Math.min(PROMPT.length, Math.floor(typeFrame * charsPerFrame));
  const typedText = PROMPT.slice(0, typedChars);
  const showCursor = typedChars < PROMPT.length || Math.floor(frame * 2) % 2 === 0;

  return (
    <AbsoluteFill style={{ background: BG, padding: '60px 80px', flexDirection: 'column' }}>
      {/* Nav */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 24, opacity: uiSpring,
      }}>
        <div style={{ fontFamily: serif, fontSize: 28, color: FG, letterSpacing: '-0.02em' }}>
          Chorus<span style={{ color: ACCENT }}>.</span>
        </div>
        <div style={{ fontFamily: mono, fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          Why?
        </div>
      </div>

      {/* Chat container */}
      <div style={{
        flex: 1, background: CARD, border: `1px solid ${CARD_BORDER}`,
        borderTop: `1px solid #3a3530`,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column',
        opacity: uiSpring,
        transform: `translateY(${uiY}px)`,
      }}>
        {/* API key bar */}
        <div style={{
          padding: '10px 20px', borderBottom: `1px solid ${CARD_BORDER}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontFamily: mono, fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            API Key
          </span>
          <span style={{ fontFamily: mono, fontSize: 13, color: ACCENT2 }}>
            sk-or-v1-••••••••••••••••••••
          </span>
          <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 10, color: ACCENT2, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            saved
          </span>
        </div>

        {/* Chat header */}
        <div style={{
          padding: '10px 20px', borderBottom: `1px solid ${CARD_BORDER}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {MODELS.map(m => (
                <div key={m.name} style={{ width: 6, height: 6, borderRadius: '50%', background: m.color }} />
              ))}
            </div>
            <span style={{ fontFamily: mono, fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Chorus Ensemble
            </span>
          </div>
        </div>

        {/* Messages area */}
        <div style={{ flex: 1, padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: serif, fontSize: 32, color: FG, marginBottom: 8 }}>Ask anything.</div>
            <div style={{ fontFamily: sans, fontSize: 14, color: MUTED }}>
              5 frontier models will think in parallel, then synthesize one answer.
            </div>
          </div>
        </div>

        {/* Input */}
        <div style={{
          borderTop: `1px solid ${CARD_BORDER}`, padding: '12px 20px',
          display: 'flex', gap: 10, alignItems: 'flex-end',
        }}>
          <div style={{
            flex: 1, background: BG, border: `1px solid ${typedText ? ACCENT : CARD_BORDER}`,
            padding: '10px 14px', fontFamily: sans, fontSize: 14,
            color: FG, lineHeight: 1.5, minHeight: 42,
          }}>
            {typedText}
            {showCursor && (
              <span style={{ borderRight: `2px solid ${ACCENT}`, marginLeft: 1 }}>&nbsp;</span>
            )}
          </div>
          <div style={{
            fontFamily: mono, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em',
            padding: '10px 20px', background: ACCENT, color: BG,
          }}>
            Send
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
