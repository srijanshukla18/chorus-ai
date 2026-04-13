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

const SYNTHESIS = `**LLM ensemble methods** combine multiple language models to improve reliability and accuracy. All models agree on the core insight: different architectures fail differently, so their errors decorrelate.

**Key benefits (high confidence across all models):**
- Reduced hallucination rate vs any single model
- Better calibration — consensus answers are more reliable
- Architectural diversity compounds the benefit

**The synthesis step is critical.** Simple voting loses nuance. A meta-model that identifies disagreements and adjudicates by reasoning quality outperforms majority voting by 15-30% on benchmarks.

**Bottom line:** True ensembling requires diversity of training data AND architecture — not 4 copies of the same model.`;

// Scene 6: Thinking collapses → synthesis streams in — ~6s (180 frames)
export const Scene6Synthesis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Panel collapses after 0.5s
  const panelCollapse = spring({ frame, fps, config: { damping: 200 } });
  const panelHeight = interpolate(panelCollapse, [0, 1], [220, 0]);

  // Synthesis starts at 1s
  const synthStart = 1 * fps;
  const synthFrames = Math.max(0, frame - synthStart);
  const synthDuration = 4 * fps;
  const chars = Math.min(SYNTHESIS.length, Math.floor((synthFrames / synthDuration) * SYNTHESIS.length));
  const synthText = SYNTHESIS.slice(0, chars);

  const synthBorderSpring = spring({ frame: frame - synthStart, fps, config: { damping: 200 } });

  // URL callout at the end
  const urlOpacity = interpolate(frame, [5 * fps, 5.5 * fps], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: BG, padding: '60px 80px', flexDirection: 'column' }}>
      {/* Nav */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 24,
      }}>
        <div style={{ fontFamily: serif, fontSize: 28, color: FG, letterSpacing: '-0.02em' }}>
          Chorus<span style={{ color: ACCENT }}>.</span>
        </div>
        {/* URL callout */}
        <div style={{ opacity: urlOpacity }}>
          <div style={{ fontFamily: mono, fontSize: 14, color: ACCENT, letterSpacing: '0.08em' }}>
            srijanshukla18.github.io/chorus-ai
          </div>
        </div>
      </div>

      <div style={{
        flex: 1, background: CARD, border: `1px solid ${CARD_BORDER}`,
        borderTop: '1px solid #3a3530',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column',
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
          <span style={{ fontFamily: mono, fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Chorus Ensemble
          </span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'hidden' }}>
          {/* User bubble */}
          <div style={{ alignSelf: 'flex-end', maxWidth: '65%' }}>
            <div style={{
              background: ACCENT, color: BG,
              padding: '10px 16px', fontFamily: sans, fontSize: 14, lineHeight: 1.5,
            }}>
              {PROMPT}
            </div>
          </div>

          {/* Collapsed thinking toggle */}
          <div style={{ alignSelf: 'flex-start', width: '100%' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: mono, fontSize: 11, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: MUTED, paddingBottom: 8,
            }}>
              <span style={{ fontSize: 9 }}>▶</span>
              <span style={{ display: 'flex', gap: 3 }}>
                {MODELS.map(m => (
                  <span key={m.name} style={{ width: 5, height: 5, borderRadius: '50%', background: m.color, display: 'inline-block' }} />
                ))}
              </span>
              Agents thinking
              <span style={{ marginLeft: 'auto', color: ACCENT2, fontSize: 10 }}>5/5 done</span>
            </div>

            {/* Collapsing panel */}
            <div style={{
              background: BG, border: `1px solid ${CARD_BORDER}`,
              maxHeight: panelHeight, overflow: 'hidden',
            }}>
              {MODELS.map((model, i) => (
                <div key={model.name} style={{
                  padding: '8px 16px',
                  borderBottom: i < MODELS.length - 1 ? `1px solid ${CARD_BORDER}` : 'none',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: model.color }} />
                  <span style={{ fontFamily: mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: FG }}>
                    {model.name}
                  </span>
                  <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 9, color: ACCENT2, textTransform: 'uppercase' }}>
                    done
                  </span>
                </div>
              ))}
            </div>

            {/* Synthesis output */}
            {synthText && (
              <div style={{
                marginTop: 12,
                borderLeft: `${interpolate(synthBorderSpring, [0, 1], [0, 2])}px solid ${ACCENT}`,
                paddingLeft: 16,
                fontFamily: sans, fontSize: 13, lineHeight: 1.8, color: FG,
                whiteSpace: 'pre-wrap',
              }}>
                {synthText}
              </div>
            )}
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
            background: ACCENT, color: BG,
          }}>
            Send
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
