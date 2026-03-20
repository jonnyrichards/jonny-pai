# Voice Coach Product Analytics & Instrumentation Plan

## Overview

This document defines a pragmatic V1 product analytics strategy for Voice Coach, focused on answering essential questions for the March 2026 Customer Zero launch.

**Primary Analytics Questions:**
1. Are users discovering and trying voice mode? (Trial)
2. Are users returning to voice mode? (Retention)
3. What is the quality of voice conversations? (Session quality, engagement)

**Tooling:**
- **Amplitude**: Product analytics (user behavior, feature usage, funnels)
- **Langfuse**: LLM observability (prompts, responses, token usage)
- *Potential future:* DataDog for infrastructure/cost metrics

---

## 1. Event Taxonomy

### 1.1 Voice Discovery & Activation Events

| Event Name | Description | Trigger | Priority |
|-----------|-------------|---------|----------|
| `voice_button_clicked` | User clicks Conversation Mode button | Click on voice mode toggle | P0 |
| `dictation_button_clicked` | User clicks Dictation Mode (mic) button | Click on mic button | P0 |
| `voice_consent_shown` | Voice consent prompt displayed to user | When consent modal appears | P0 |
| `voice_consent_accepted` | User accepts voice consent | User clicks "Accept" on consent | P0 |
| `voice_consent_declined` | User declines voice consent | User clicks "Decline" on consent | P0 |

### 1.2 Voice Session Events (Conversation Mode)

| Event Name | Description | Trigger | Priority |
|-----------|-------------|---------|----------|
| `voice_recording_started` | User begins recording audio in conversation | Mic activated in conversation mode | P0 |
| `voice_recording_ended` | User stops recording (natural end) | User stops speaking, auto-detected | P0 |
| `voice_conversation_ended` | User explicitly ends voice conversation | User clicks "End" button | P0 |
| `voice_conversation_timeout` | Voice session times out due to inactivity | No activity for X seconds | P1 |
| `voice_switched_to_text` | User switches from voice to text mid-session | User types in input box during voice session | P0 |

### 1.3 Voice Session Events (Dictation Mode)

| Event Name | Description | Trigger | Priority |
|-----------|-------------|---------|----------|
| `dictation_started` | User starts dictation recording | User clicks mic button | P0 |
| `dictation_cancelled` | User cancels dictation before sending | User clicks "X" during recording | P0 |
| `dictation_sent` | User completes and sends dictation | User clicks "Send" after recording | P0 |

### 1.4 Voice Playback Events

| Event Name | Description | Trigger | Priority |
|-----------|-------------|---------|----------|
| `voice_response_started` | Coach begins speaking (TTS playback starts) | First audio chunk plays | P0 |
| `voice_response_completed` | Coach completes speaking response | Last audio chunk plays | P0 |
| `voice_response_interrupted` | User interrupts Coach's audio playback | User interrupts or skips response | P0 |

### 1.5 Voice Error & Quality Events

| Event Name | Description | Trigger | Priority |
|-----------|-------------|---------|----------|
| `voice_stt_error` | Speech-to-text transcription fails | STT service returns error | P0 |
| `voice_tts_error` | Text-to-speech generation fails | TTS service returns error | P0 |
| `voice_latency_warning` | Voice response exceeds latency threshold | TTFB > Xms (TBD threshold) | P1 |
| `voice_session_abandoned` | User leaves during voice interaction | User navigates away mid-session | P0 |
| `voice_transcription_empty` | STT returns empty transcription | Transcription is blank/null | P0 |

---

## 2. Event Properties

**Note:** Standard properties like `user_id`, `account_id`, `session_id`, `timestamp`, `account_tier`, `user_role`, and `region` are captured automatically by Amplitude and do not need custom instrumentation.

### 2.1 Custom Voice Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `voice_mode` | string | Type of voice interaction | `conversation`, `dictation` |
| `recording_duration_ms` | integer | Length of user's audio recording | `12500` |
| `ttfb_ms` | integer | Time to First Byte (total latency) | `3800` |
| `audio_interrupted` | boolean | Whether user interrupted response | `true` |
| `interruption_position_ms` | integer | When interruption occurred in playback | `8500` |

### 2.2 Cost Properties (if feasible via analytics service)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `audio_input_size_bytes` | integer | Size of audio file sent to STT | `245000` |
| `tokens_used` | integer | LLM tokens consumed | `450` |
| `estimated_cost_usd` | float | Estimated cost of this turn | `0.0234` |

**Note:** Cost tracking implementation needs investigation. May require backend instrumentation or separate DataDog metrics.

---

## 3. Key Metrics

### 3.1 Core Adoption Metrics

| Metric | Definition | Calculation | Target |
|--------|------------|-------------|--------|
| **Voice Usage Rate** | % of all Coach requests using voice | `COUNT(voice sessions) / COUNT(all Coach sessions)` | 2% (post-GA) |
| **Voice Trial Rate** | % of enabled users who try voice ≥1 time | `COUNT(users with ≥1 voice session) / COUNT(users with voice enabled)` | TBD after CZ |
| **Voice Retention Rate** | % of voice users who use it 3+ times | `COUNT(users with ≥3 voice sessions) / COUNT(users with ≥1 voice session)` | TBD after CZ |
| **Voice Consent Acceptance** | % who accept voice consent when prompted | `COUNT(voice_consent_accepted) / COUNT(voice_consent_shown)` | - |

### 3.2 Engagement & Session Quality Metrics

| Metric | Definition | Calculation |
|--------|------------|-------------|
| **Conversation Mode vs Dictation** | Split of interaction types | `COUNT(conversation sessions) vs COUNT(dictation sessions)` |
| **Voice Session Length** | Median elapsed time from first recording to conversation end | `MEDIAN(timestamp(voice_conversation_ended) - timestamp(first voice_recording_started) GROUP BY session_id WHERE voice_mode='conversation')` |
| **Voice Abandon Rate** | % of sessions abandoned mid-interaction | `COUNT(voice_session_abandoned) / COUNT(sessions with ≥1 voice_recording_started)` |
| **Interruption Rate** | % of Coach responses interrupted by user | `COUNT(voice_response_interrupted) / COUNT(voice_response_started)` |
| **Switch to Text Rate** | % of voice sessions that switch to text | `COUNT(voice_switched_to_text) / COUNT(sessions with ≥1 voice_recording_started)` |

### 3.3 Quality & Performance Metrics

| Metric | Definition | Calculation | Target |
|--------|------------|-------------|--------|
| **P95 Time to First Byte (TTFB)** | 95th percentile latency to start speaking | `PERCENTILE(ttfb_ms, 95)` | <5s |
| **P50 TTFB** | Median latency to start speaking | `PERCENTILE(ttfb_ms, 50)` | <3s |
| **STT Error Rate** | % of transcriptions that fail | `COUNT(voice_stt_error) / COUNT(voice_recording_ended)` | <1% |
| **TTS Error Rate** | % of TTS generations that fail | `COUNT(voice_tts_error) / COUNT(voice_response_started)` | <1% |
| **Empty Transcription Rate** | % of recordings with no transcription | `COUNT(voice_transcription_empty) / COUNT(voice_recording_ended)` | <2% |

### 3.4 Cost Metrics

| Metric | Definition | Calculation |
|--------|------------|-------------|
| **Cost per Voice Session** | Average cost per voice session | `SUM(estimated_cost_usd) / COUNT(DISTINCT session_id)` |

---

## 4. Implementation Priorities

### 4.1 P0 - Must Have for CZ Launch (Mar 16)

**Events:**
- All Voice Discovery & Activation events (1.1)
- All Voice Session Events - Conversation & Dictation (1.2, 1.3)
- All Voice Playback Events (1.4)
- All Voice Error & Quality Events (1.5)

**Properties:**
- All custom properties in 2.1
- Cost properties in 2.2 (if technically feasible)

**Metrics:**
- Core Adoption Metrics (3.1)
- Engagement & Session Quality Metrics (3.2)
- Quality & Performance Metrics (3.3)
- Cost per Voice Session (3.4)

**Why P0:**
- Essential for measuring CZ success criteria
- Required to answer primary analytics questions (trial, retention, quality)
- Needed to debug issues during CZ
- Core metrics for deciding whether to proceed to Limited Beta

### 4.2 P1 - Nice to Have for Limited Beta (Early April)

**Additional Events:**
- `voice_conversation_timeout`
- `voice_latency_warning`

**Why P1:**
- Deeper insights into user behavior
- Useful for debugging but not critical for launch decisions

---

## 5. Integration with Voice Evaluation Framework

The Voice Evaluation Framework (RFC) tracks **technical quality** via automated testing, while this Product Analytics Plan tracks **user behavior and business impact** in production. Key metrics tracked by the evaluation framework include:

- **Latency (TTFB)**: Measured via golden dataset and monitored in production via Amplitude
- **STT Accuracy**: Word Error Rate (WER) via golden dataset; production error rates via Amplitude events
- **TTS Quality**: MOS scores via evaluation harness; user interruption/completion rates via Amplitude
- **Session Quality**: E2E test success rates; production session completion and engagement via Amplitude

Both systems use **Langfuse** for LLM observability and session-level data.

---

## 6. Next Steps

**Immediate Actions**
- [ ] **Review with Engineering** (Thai, Dan) to validate technical feasibility of event instrumentation
- [ ] **Review with Data/Analytics team** to confirm Amplitude setup and cost tracking approach
- [ ] **Investigate cost tracking**: Can we capture `audio_input_size_bytes`, `tokens_used`, `estimated_cost_usd` via Amplitude analytics service, or do we need DataDog?
- [ ] **Create tickets** for instrumentation work (frontend + backend)
- [ ] **Socialize with PSX** (People Science) to align on quality metrics

**Before CZ Launch (by Mar 16):**
- [ ] **Implement P0 events** in frontend and backend
- [ ] **Test instrumentation** in dev environment
- [ ] **Validate data pipeline** (events flowing to Amplitude)
- [ ] **Build basic Amplitude dashboards** (adoption funnel, session quality, latency)

**During CZ (Mar 16-30):**
- [ ] **Monitor dashboards** for anomalies and issues
- [ ] **Collect qualitative feedback** from CZ users
- [ ] **Document insights** for Limited Beta launch

---

## Appendix: Open Questions

1. **Cost Tracking**: Can we log `audio_input_size_bytes`, `tokens_used`, and `estimated_cost_usd` via Amplitude analytics service, or do we need a separate DataDog metrics implementation?
2. **Data Privacy & Compliance**:
   - **DO NOT LOG**: User's actual voice recordings (audio files), full transcription text containing PII, identifiable customer data
   - **OK TO LOG**: Session IDs (non-identifying), metadata (duration, word count, latency), aggregated metrics
3. **Data Retention**: We will **not retain audio recordings** beyond what is necessary for real-time processing. All stored data will follow Culture Amp's standard Amplitude retention policy.
4. **Alert Thresholds**: What are acceptable thresholds for latency, error rates? (Pending golden dataset results from evaluation framework)
5. **Use Case Taxonomy**: How do we auto-detect Coach use cases? (Pending PSX input - deferred to post-V1)
6. **Retention Definition**: Is "3+ sessions" the right retention bar, or should we use "3+ sessions in first 30 days"?

---

## Related Resources

- [Voice One-Pager](./coach-voice-one-pager.md)
- [Voice Feature List](./Coach%20_%20Voice%20_%20Feature%20list.md)
- [Voice Evaluation Framework RFC](./rfc-voice-evaluation-framework.md)
- [Product Analytics (Comprehensive Version)](./product-analytics.md)
