export const BG = '#0a0a0a';
export const FG = '#e8e4df';
export const ACCENT = '#ff6b35';
export const ACCENT2 = '#00d4aa';
export const MUTED = '#6b6560';
export const CARD = '#141210';
export const CARD_BORDER = '#2a2520';

export const CLAUDE = '#d97706';
export const GPT = '#10b981';
export const GEMINI = '#3b82f6';
export const MINIMAX = '#a855f7';
export const KIMI = '#ef4444';

export const MODELS = [
  { name: 'Claude Opus 4.6', org: 'Anthropic', color: CLAUDE },
  { name: 'GPT-5.4',         org: 'OpenAI',    color: GPT },
  { name: 'Gemini 3.1 Pro',  org: 'Google',    color: GEMINI },
  { name: 'MiniMax M2.7',    org: 'MiniMax',   color: MINIMAX },
  { name: 'Kimi K2.5',       org: 'Moonshot',  color: KIMI },
] as const;
