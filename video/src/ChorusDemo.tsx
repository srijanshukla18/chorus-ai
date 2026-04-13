import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Scene1Title } from './Scene1Title';
import { Scene2Models } from './Scene2Models';
import { Scene3Concept } from './Scene3Concept';
import { Scene4Chat } from './Scene4Chat';
import { Scene5Agents } from './Scene5Agents';
import { Scene6Synthesis } from './Scene6Synthesis';

export const ChorusDemo: React.FC = () => (
  <AbsoluteFill>
    <TransitionSeries>
      {/* ── PART 1: Stylised promo ── */}
      <TransitionSeries.Sequence durationInFrames={150} premountFor={30}>
        <Scene1Title />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />

      <TransitionSeries.Sequence durationInFrames={150} premountFor={30}>
        <Scene2Models />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />

      <TransitionSeries.Sequence durationInFrames={150} premountFor={30}>
        <Scene3Concept />
      </TransitionSeries.Sequence>

      {/* ── Crossfade into Part 2 — longer, more intentional ── */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />

      {/* ── PART 2: Screen simulation ── */}
      <TransitionSeries.Sequence durationInFrames={120} premountFor={30}>
        <Scene4Chat />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />

      <TransitionSeries.Sequence durationInFrames={150} premountFor={30}>
        <Scene5Agents />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />

      <TransitionSeries.Sequence durationInFrames={180} premountFor={30}>
        <Scene6Synthesis />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
