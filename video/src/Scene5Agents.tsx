import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/DMSans';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import { ACCENT, ACCENT2, BG, CARD, CARD_BORDER, FG, MODELS, MUTED } from './tokens';

const { fontFamily: serif } = loadFont('normal', { weights: ['400'], subsets: ['latin'] });
const { fontFamily: sans } = loadSans('normal', { weights: ['400', '600'], subsets: ['latin'] });
const { fontFamily: mono } = loadMono('normal', { weights: ['400', '600'], subsets: ['latin'] });

const PROMPT = 'What should I understand about LLM ensemble methods?';

// Fake streaming text per model — different length/content to look realistic
const AGENT_TEXTS = [
  'LLM ensemble methods combine multiple language models to improve accuracy, reduce hallucinations, and increase reliability. The core insight is that different models fail in different ways — by aggregating their outputs, correlated errors cancel out. This mirrors Random Forest ensembling in classical ML...',
  'Ensemble learning for LLMs works by querying multiple models and synthesizing results. Key benefits include: reduced variance (models disagree on uncertain answers), improved calibration (consensus = higher confidence), and architectural diversity (MoE vs dense transformers have different failure modes)...',
  'Three main ensemble strategies: (1) Voting — majority wins. (2) Stacking — a meta-model learns from base model outputs. (3) Mixture of Experts — each model handles different input domains. For LLMs specifically, diversity of training data matters as much as architectural differences...',
  'The key to effective LLM ensembling is decorrelation. Running 5 copies of the same model gives near-zero benefit — they\'ll all hallucinate on the same queries. True diversity requires different architectures, different training corpora, and different RL alignment strategies...',
  'Research shows 15-30% accuracy gains on reasoning benchmarks when ensembling 3+ diverse frontier models vs single-model. The synthesis step is critical — simple voting loses nuance. A meta-synthesizer that can identify disagreements and adjudicate based on reasoning quality performs best...',
];

// Scene 5: Agents thinking — user message shown, panel opens, text streams — ~5s (150 frames)
export const Scene5Agents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const uiSpring = spring({ frame, fps, config: { damping: 200 } });

  // Panel opens at 0.5s
  const panelSpring = spring({ frame: frame - 0.5 * fps, fps, config: { damping: 200 } });

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
      </div>

      <div style={{
        flex: 1, background: CARD, border: `1px solid ${CARD_BORDER}`,
        borderTop: `1px solid #3a3530`,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column',
        opacity: uiSpring,
      }}>
        {/* API key bar */}
        <div style={{
          padding: '8px 20px', borderBottom: `1px solid ${CARD_BORDER}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontFamily: mono, fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em' }}>API Key</span>
          <span style={{ fontFamily: mono, fontSize: 13, color: ACCENT2 }}>sk-or-v1-••••••••••••••••••••</span>
        </div>

        {/* Chat header */}
        <div style={{
          padding: '8px 20px', borderBottom: `1px solid ${CARD_BORDER}`,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {MODELS.map(m => (
              <div key={m.name} style={{ width: 6, height: 6, borderRadius: '50%', background: m.color }} />
            ))}
          </div>
          <span style={{ fontFamily: mono, fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Chorus Ensemble</span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'hidden', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* User message */}
          <div style={{ alignSelf: 'flex-end', maxWidth: '65%' }}>
            <div style={{
              background: ACCENT, color: BG,
              padding: '10px 16px', fontFamily: sans, fontSize: 14, lineHeight: 1.5,
            }}>
              {PROMPT}
            </div>
          </div>

          {/* Agents thinking toggle */}
          <div style={{ alignSelf: 'flex-start', width: '100%' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: mono, fontSize: 11, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: ACCENT,
              paddingBottom: 8,
            }}>
              <span style={{ fontSize: 9 }}>▶</span>
              <span style={{ display: 'flex', gap: 3 }}>
                {MODELS.map(m => (
                  <span key={m.name} style={{ width: 5, height: 5, borderRadius: '50%', background: m.color, display: 'inline-block' }} />
                ))}
              </span>
              Agents thinking
              <span style={{ marginLeft: 'auto', color: ACCENT, fontSize: 10 }}>5/5 thinking</span>
            </div>

            {/* Thinking panel */}
            <div style={{
              background: BG, border: `1px solid ${CARD_BORDER}`,
              maxHeight: interpolate(panelSpring, [0, 1], [0, 320]),
              overflow: 'hidden',
            }}>
              {MODELS.map((model, i) => {
                const streamDelay = 0.7 + i * 0.2;
                const streamFrame = Math.max(0, frame - streamDelay * fps);
                const streamDuration = 3 * fps;
                const chars = Math.min(
                  AGENT_TEXTS[i].length,
                  Math.floor((streamFrame / streamDuration) * AGENT_TEXTS[i].length)
                );
                const text = AGENT_TEXTS[i].slice(0, chars);

                return (
                  <div key={model.name} style={{
                    padding: '10px 16px',
                    borderBottom: i < MODELS.length - 1 ? `1px solid ${CARD_BORDER}` : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: model.color }} />
                      <span style={{ fontFamily: mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: FG }}>
                        {model.name}
                      </span>
                      <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 9, color: ACCENT, textTransform: 'uppercase' }}>
                        streaming
                      </span>
                    </div>
                    <div style={{
                      fontFamily: sans, fontSize: 11, color: MUTED, lineHeight: 1.5,
                      maxHeight: 48, overflow: 'hidden',
                    }}>
                      {text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Input */}
        <div style={{
          borderTop: `1px solid ${CARD_BORDER}`, padding: '12px 20px',
          display: 'flex', gap: 10, alignItems: 'flex-end',
        }}>
          <div style={{
            flex: 1, background: BG, border: `1px solid ${CARD_BORDER}`,
            padding: '10px 14px', fontFamily: sans, fontSize: 14,
            color: MUTED, minHeight: 42,
          }}>
            Ask a high-stakes question...
          </div>
          <div style={{
            fontFamily: mono, fontSize: 11, textTransform: 'uppercase',
            letterSpacing: '0.1em', padding: '10px 20px',
            background: CARD_BORDER, color: MUTED, opacity: 0.5,
          }}>
            Send
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
