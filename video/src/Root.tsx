import React from 'react';
import { Composition } from 'remotion';
import { ChorusDemo } from './ChorusDemo';

// 30 fps, 16:9
// Scene durations (frames @ 30fps):
//   Scene 1 Title:     150 (5s)
//   Scene 2 Models:    150 (5s)
//   Scene 3 Concept:   150 (5s)
//   [fade transition:   20 frames overlap]
//   Scene 4 Chat:      120 (4s)
//   Scene 5 Agents:    150 (5s)
//   Scene 6 Synthesis: 180 (6s)
// Total: 150+150+150+120+150+180 - 20 = 880 frames (~29.3s)

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ChorusDemo"
    component={ChorusDemo}
    durationInFrames={880}
    fps={30}
    width={1920}
    height={1080}
  />
);
