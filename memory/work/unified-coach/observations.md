# Unified Coach — Observations

Timestamped log of events, decisions, learnings. Append-only.

## 2026-03

- 2026-03-16: Jill shared Amplitude notebook with Chat history usage data. URL: https://app.amplitude.com/analytics/culture-amp-org/notebook/ebswnpjv?source=copy+url [work]
- 2026-03-13: Michael raised Q1 loose threads in standup that need addressing: streaming slow / Streamdown / AI Elements quality issues; scrolling bug; Otel; splitting the RAG (Slack thread); guardrail fails with no control. These are unresolved tech debt items needing owners/timelines. [work, tech-debt]
- 2026-03-20: Amplitude 'Global Agent' review — strong competitive reference for Coach given structural similarities (both SPA, left-hand nav, many pages, home views). Key patterns: (1) **Mode controls** — menu selector for mode-like settings (fast/thinking), mirroring Claude; add from menu, read + remove at base of input. (2) **Context adder** (standout pattern — one of the first seen): user can explicitly add any chart/dashboard from home into the assistant; could map to Coach adding Survey / Report / Manager Review context, or pages the user isn't currently on. (3) **Decoupled navigation** — side panel and main panel navigate independently; current session persists in side panel while page context updates prominently; assistant closes on home page; feels fluid — "change one side at a time". (4) **In-assistant components** — tables, charts etc. rendered inline. (5) **Design philosophy**: bring relevant context *to* the assistant rather than navigate the user; full-screen and side-panel modes both supported; video-led onboarding/discovery. [work, competitive]
- 2026-03-16: Baps raised AI SDK standardisation — we're still using LLM UI in places; theme is "AI elements standardisation across Coach". Should unify around AI SDK as best practice. [work, tech-debt]
