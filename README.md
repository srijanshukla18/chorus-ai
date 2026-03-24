# Chorus.

**One prompt. Five minds. One synthesized answer.**

5 frontier LLMs queried in parallel, synthesized into a single high-confidence response. All local. BYOK. No pricing. No sign up. No nothing.

[Try it live](https://srijanshukla18.github.io/chorus-ai/)

## How it works

1. **Parallel Dispatch** — Your prompt goes to all 5 models simultaneously via OpenRouter. All calls fire from your browser — no data touches any intermediary server.
2. **Stream & Collect** — Each model streams its answer in real-time. Expand the "Agents thinking" panel to watch all 5 responses arrive.
3. **Synthesize** — An aggregator model reviews all 5 responses, resolves contradictions, flags disagreements, and produces a single answer.

## The Ensemble

| Model | Provider | Architecture |
|-------|----------|-------------|
| Claude Opus 4.6 | Anthropic | Dense transformer |
| GPT-5.4 | OpenAI | Dense transformer |
| Gemini 3.1 Pro | Google | MoE |
| MiniMax M2.7 | MiniMax | Self-evolving |
| Kimi K2.5 | Moonshot AI | MoE + MLA, 1T/32B |

Synthesis model: **MiniMax M2.7**

## Why?

One model has biases. An ensemble cancels them out.

- **Grok 4.20-like** — Grok runs 4 copies of itself. Same blind spots. Chorus uses 5 different models — a jury, not a committee of clones.
- **Diversity** — Dense, MoE, MLA. Western RLHF vs Chinese RL. Different data, different biases.
- **No Backend** — Your key, your browser. API calls go directly to OpenRouter. No middleware. No data retention. Fork it.

## Usage

1. Get an [OpenRouter API key](https://openrouter.ai/keys)
2. Open [Chorus](https://srijanshukla18.github.io/chorus-ai/)
3. Paste your key, ask a question

Chat history and API key are stored in localStorage. Nothing leaves your browser except the API calls to OpenRouter.

## Built by

[@srijanshukla18](https://x.com/srijanshukla18)
