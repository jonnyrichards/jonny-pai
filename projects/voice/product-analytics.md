---
title: Voice Coach Product Analytics & Instrumentation Plan
status: draft
created_date: 2026-02-24
owner: Jonny Richards
related_files:
---

# Voice Coach Product Analytics & Instrumentation Plan

## Overview

This document defines the product analytics strategy for Voice Coach, covering event taxonomy, key metrics, dashboard structure, and implementation priorities for the March 2026 Customer Zero launch.

**Primary Analytics Questions:**
1. Are users discovering and trying voice mode? (Trial)
2. Are users returning to voice mode? (Retention - real value vs. curiosity)
3. What is the quality of voice conversations? (Session quality, engagement)
4. Which use cases drive voice adoption? (Content analysis)
5. What is the business impact? (Sales enablement)

**Tooling:**
- **Amplitude**: Product analytics (user behavior, feature usage, funnels)
- **DataDog**: Infrastructure/cost metrics (API calls, latency, errors, cost)
- **Langfuse**: LLM observability (prompts, responses, token usage)
- **S3 + Evaluation Harness**: Voice quality evaluation (STT/TTS, golden dataset)

---

## 1. Event Taxonomy

### 1.1 Voice Discovery & Activation Events

| Event Name | Description | Trigger | Priority |
|-----------|-------------|---------|----------|
| `voice_button_clicked` | User clicks Conversation Mode button | Click on voice mode toggle | P0 |
| `dictation_button_clicked` | User clicks Dictation Mode (mic) button | Click on mic button | P0 |
| `voice_tooltip_viewed` | User hovers over voice button to see tooltip | Hover event on voice buttons | P1 |
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
| `voice_muted` | User mutes Coach audio during playback | User clicks mute/pause (if implemented) | P1 |

### 1.5 Voice Error & Quality Events

| Event Name | Description | Trigger | Priority |
|-----------|-------------|---------|----------|
| `voice_stt_error` | Speech-to-text transcription fails | STT service returns error | P0 |
| `voice_tts_error` | Text-to-speech generation fails | TTS service returns error | P0 |
| `voice_latency_warning` | Voice response exceeds latency threshold | TTFB > Xms (TBD threshold) | P1 |
| `voice_session_abandoned` | User leaves during voice interaction | User navigates away mid-session | P0 |
| `voice_transcription_empty` | STT returns empty transcription | Transcription is blank/null | P0 |

### 1.6 Voice Settings & Admin Events

| Event Name | Description | Trigger | Priority |
|-----------|-------------|---------|----------|
| `voice_admin_enabled` | Admin enables voice for account | Admin toggles voice feature on | P0 |
| `voice_admin_disabled` | Admin disables voice for account | Admin toggles voice feature off | P0 |
| `voice_selection_changed` | Admin changes default voice | Admin selects new voice from options | P1 |

---

## 2. Event Properties

### 2.1 Standard Context Properties (all events)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `user_id` | string | Unique user identifier | `usr_123456` |
| `account_id` | string | Customer account identifier | `acc_789012` |
| `session_id` | string | Coach session identifier | `session_abc123` |
| `turn_id` | string | Individual turn within session | `turn_5` |
| `timestamp` | datetime | Event timestamp (ISO 8601) | `2026-03-16T14:32:10Z` |
| `voice_mode_enabled` | boolean | Whether voice mode is available to user | `true` |
| `feature_flag_status` | string | Voice rollout percentage group | `cz`, `beta_10`, `beta_100` |

### 2.2 User Segmentation Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `account_tier` | string | Customer account tier | `commercial_b+`, `enterprise_a`, `enterprise_b+` |
| `account_size` | integer | Number of seats in account | `2500` |
| `user_role` | string | User's role in organization | `manager`, `ic`, `exec`, `hr_admin` |
| `region` | string | User's geographic region | `us`, `emea`, `apac` |
| `language` | string | User's language preference | `en-US`, `en-GB`, `es-ES` |
| `coach_user_type` | string | Coach usage history | `new_coach_user`, `existing_coach_user` |
| `days_since_first_coach_session` | integer | Days since user's first Coach session | `45` |
| `total_coach_sessions_pre_voice` | integer | # of Coach sessions before voice available | `12` |

### 2.3 Voice Session Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `voice_mode` | string | Type of voice interaction | `conversation`, `dictation` |
| `recording_duration_ms` | integer | Length of user's audio recording | `12500` |
| `transcription` | string | STT output text | `"How do I handle..."` |
| `transcription_confidence` | float | STT confidence score (if available) | `0.94` |
| `response_text` | string | Coach's text response | `"Let's explore that..."` |
| `response_word_count` | integer | # of words in response | `87` |
| `tts_duration_ms` | integer | Length of TTS audio playback | `28000` |
| `num_turns_in_session` | integer | Total turns in this session | `8` |
| `num_voice_turns_in_session` | integer | # of voice turns (vs text) | `6` |
| `coach_use_case` | string | Detected use case | `general`, `insights`, `perform` |
| `coach_agent` | string | Which Coach agent handled request | `general_coach`, `insights_coach` |

### 2.4 Voice Quality & Performance Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `stt_latency_ms` | integer | Time from audio end to transcription | `850` |
| `llm_latency_ms` | integer | Time from transcription to LLM response | `2300` |
| `tts_latency_ms` | integer | Time from response to first audio chunk | `650` |
| `ttfb_ms` | integer | Time to First Byte (total latency) | `3800` |
| `turn_total_duration_ms` | integer | Total time for complete turn | `32500` |
| `audio_interrupted` | boolean | Whether user interrupted response | `true` |
| `interruption_position_ms` | integer | When interruption occurred in playback | `8500` |
| `background_noise_detected` | boolean | Whether background noise detected | `false` |

### 2.5 Cost & Resource Properties (for DataDog)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `stt_provider` | string | STT service used | `deepgram` |
| `tts_provider` | string | TTS service used | `elevenlabs` |
| `tts_model_version` | string | TTS model version | `v3` |
| `tts_voice_id` | string | Voice ID used | `voice_rachel_professional` |
| `audio_input_size_bytes` | integer | Size of audio file sent to STT | `245000` |
| `audio_output_size_bytes` | integer | Size of audio file from TTS | `580000` |
| `tokens_used` | integer | LLM tokens consumed | `450` |
| `estimated_cost_usd` | float | Estimated cost of this turn | `0.0234` |

---

## 3. Key Metrics & Calculations

### 3.1 North Star Metrics (from one-pager)

| Metric | Definition | Target | Measurement |
|--------|------------|--------|-------------|
| **Voice Usage Rate** | % of all Coach requests using voice | 2% of Coach interactions | `COUNT(voice sessions) / COUNT(all Coach sessions)` |
| **Voice Trial Rate** | % of enabled users who try voice ≥1 time | TBD after CZ | `COUNT(users with ≥1 voice session) / COUNT(users with voice enabled)` |
| **Voice Retention Rate** | % of voice users who use it 3+ times | TBD after CZ | `COUNT(users with ≥3 voice sessions) / COUNT(users with ≥1 voice session)` |

### 3.2 Adoption Funnel Metrics

| Metric | Definition | Calculation |
|--------|------------|-------------|
| **Voice Availability** | % of MAUs with voice feature enabled | `COUNT(MAUs with voice_enabled=true) / COUNT(all MAUs)` |
| **Voice Discovery** | % of available users who see voice UI | `COUNT(voice_mode_discovered) / COUNT(MAUs with voice_enabled=true)` |
| **Voice Trial** | % of users who start first voice session | `COUNT(users with voice_conversation_started OR dictation_started) / COUNT(voice_mode_discovered)` |
| **Voice Consent Acceptance** | % who accept voice consent when prompted | `COUNT(voice_consent_accepted) / COUNT(voice_consent_shown)` |
| **Voice Adoption** | % who complete 3+ voice sessions | `COUNT(users with ≥3 voice sessions) / COUNT(users with ≥1 voice session)` |

### 3.3 Engagement & Session Quality Metrics

| Metric | Definition | Calculation |
|--------|------------|-------------|
| **Avg Turns per Voice Session** | Mean # of turns in voice conversations | `AVG(num_turns_in_session WHERE voice_mode='conversation')` |
| **Voice vs Text Mix** | % of turns using voice in mixed sessions | `SUM(num_voice_turns_in_session) / SUM(num_turns_in_session)` |
| **Conversation Mode vs Dictation** | Split of interaction types | `COUNT(conversation sessions) vs COUNT(dictation sessions)` |
| **Voice Session Length** | Median duration of voice sessions | `MEDIAN(SUM(turn_total_duration_ms) GROUP BY session_id)` |
| **Voice Completion Rate** | % of voice sessions that end gracefully | `COUNT(voice_conversation_ended) / COUNT(voice_conversation_started)` |
| **Voice Abandon Rate** | % of sessions abandoned mid-interaction | `COUNT(voice_session_abandoned) / COUNT(voice_conversation_started)` |
| **Interruption Rate** | % of Coach responses interrupted by user | `COUNT(voice_response_interrupted) / COUNT(voice_response_started)` |
| **Switch to Text Rate** | % of voice sessions that switch to text | `COUNT(voice_switched_to_text) / COUNT(voice_conversation_started)` |

### 3.4 Quality & Performance Metrics

| Metric | Definition | Calculation | Target |
|--------|------------|-------------|--------|
| **P95 Time to First Byte (TTFB)** | 95th percentile latency to start speaking | `PERCENTILE(ttfb_ms, 95)` | <5s |
| **P50 TTFB** | Median latency to start speaking | `PERCENTILE(ttfb_ms, 50)` | <3s |
| **Cold Start Latency** | First turn latency in new session | `AVG(ttfb_ms WHERE turn_id=1)` | <5s (ideally <3s) |
| **STT Error Rate** | % of transcriptions that fail | `COUNT(voice_stt_error) / COUNT(voice_recording_ended)` | <1% |
| **TTS Error Rate** | % of TTS generations that fail | `COUNT(voice_tts_error) / COUNT(voice_response_started)` | <1% |
| **Empty Transcription Rate** | % of recordings with no transcription | `COUNT(voice_transcription_empty) / COUNT(voice_recording_ended)` | <2% |

### 3.5 Use Case & Content Metrics

| Metric | Definition | Calculation |
|--------|------------|-------------|
| **Top Voice Use Cases** | Most common Coach use cases in voice | `COUNT(sessions) GROUP BY coach_use_case` |
| **Voice-Preferred Use Cases** | Use cases with higher voice adoption | `(voice sessions / total sessions) BY coach_use_case` |
| **Response Length in Voice** | Avg word count in voice responses | `AVG(response_word_count WHERE voice_mode IS NOT NULL)` |
| **Voice vs Text Response Length** | Compare response lengths | `AVG(response_word_count) BY (voice vs text)` |

### 3.6 Cost Metrics (DataDog)

| Metric | Definition | Calculation |
|--------|------------|-------------|
| **Cost per Voice Session** | Average cost per voice session | `SUM(estimated_cost_usd) / COUNT(DISTINCT session_id)` |
| **Voice Cost vs Text Cost** | Cost comparison | `AVG(cost per voice session) / AVG(cost per text session)` |
| **Cost by Account Tier** | Cost distribution | `SUM(estimated_cost_usd) GROUP BY account_tier` |
| **Cost by Region** | Geographic cost breakdown | `SUM(estimated_cost_usd) GROUP BY region` |
| **Cost by Use Case** | Use case cost breakdown | `SUM(estimated_cost_usd) GROUP BY coach_use_case` |
| **Monthly Voice Cost** | Total monthly voice spend | `SUM(estimated_cost_usd) BY month` |

### 3.7 Sales Impact Metrics (Manual + Amplitude)

| Metric | Definition | Measurement |
|--------|------------|-------------|
| **Deals Mentioning Voice** | # of deals where voice was mentioned | Manual tracking (Sales Ops) |
| **Deals with Voice Demo** | # of deals where voice was demoed | Manual tracking (Sales Ops) |
| **Close Rate: Voice Demoed** | Close rate for deals with voice demo | `COUNT(closed_won WHERE voice_demo=true) / COUNT(opportunities WHERE voice_demo=true)` |
| **Close Rate: No Voice Demo** | Close rate for deals without voice demo | `COUNT(closed_won WHERE voice_demo=false) / COUNT(opportunities WHERE voice_demo=false)` |
| **Voice in Battle Cards** | # of competitive situations where voice mentioned | Manual tracking (Sales feedback) |

---

## 4. Dashboard Structure

### 4.1 Executive Summary Dashboard (Amplitude)

**Audience:** Chris Mander (Exec Sponsor), Product Leadership, GTM Leadership

**Key Metrics:**
- Voice Usage Rate (% of Coach interactions)
- Voice Trial Rate (% of enabled users trying voice)
- Voice Retention Rate (% using voice 3+ times)
- Weekly Voice Sessions (trend)
- Voice Availability (% rollout)

**Visualizations:**
- Line chart: Weekly voice sessions over time
- Funnel: Discovery → Trial → Retention
- Bar chart: Voice usage by account tier
- Table: Top 10 accounts by voice usage

### 4.2 Voice Adoption Funnel Dashboard (Amplitude)

**Audience:** PM, Product Analytics, UX

**Funnel Stages:**
1. Voice Enabled (feature flag on)
2. Voice Discovered (saw UI)
3. Consent Shown
4. Consent Accepted
5. First Voice Session Started
6. First Voice Session Completed
7. 3+ Voice Sessions (Retention)

**Breakdowns:**
- By account tier (Commercial B+, Enterprise A, etc.)
- By user type (new Coach user vs existing)
- By region
- By rollout cohort (CZ, beta_10, beta_100)

**Visualizations:**
- Funnel chart with conversion rates
- Cohort retention table (Day 1, 7, 14, 30 retention)
- Drop-off analysis at each stage

### 4.3 Voice Session Quality Dashboard (Amplitude + DataDog)

**Audience:** PM, Engineering, PSX (People Science)

**Key Metrics:**
- Avg turns per session
- Session completion rate
- Abandon rate
- Interruption rate
- Switch to text rate
- P50/P95 TTFB latency
- STT/TTS error rates

**Visualizations:**
- Line chart: Session quality metrics over time
- Histogram: Distribution of session lengths
- Histogram: Distribution of TTFB latency
- Bar chart: Error rates by type
- Scatter: Latency vs session quality

### 4.4 Voice Use Case Analysis Dashboard (Amplitude)

**Audience:** PM, PSX, Product Marketing

**Key Metrics:**
- Top use cases in voice mode
- Voice adoption rate by use case
- Response length by use case
- Session quality by use case

**Visualizations:**
- Bar chart: Voice sessions by use case
- Table: Use case comparison (voice vs text adoption, avg turns, completion rate)
- Sankey diagram: User journey through use cases

### 4.5 Voice Cost & Efficiency Dashboard (DataDog)

**Audience:** PM, Engineering, Finance

**Key Metrics:**
- Monthly voice cost
- Cost per voice session
- Voice cost vs text cost
- Cost by account tier
- Cost by region
- Cost by use case
- Token usage distribution

**Visualizations:**
- Line chart: Daily/weekly voice cost
- Bar chart: Cost by account tier
- Table: Top 10 accounts by cost
- Pie chart: Cost breakdown (STT, TTS, LLM)

### 4.6 Sales Impact Dashboard (Manual + Amplitude)

**Audience:** Sales Leadership, GTM, PM

**Key Metrics:**
- Deals mentioning voice
- Deals with voice demo
- Close rate comparison (voice demo vs no demo)
- Voice in competitive situations

**Visualizations:**
- Line chart: Voice mentions in deals over time
- Bar chart: Close rate comparison
- Table: Deal details with voice involvement
- Qualitative feedback log

---

## 5. Implementation Priorities

### 5.1 P0 - Must Have for CZ Launch (Mar 16)

**Events:**
- All "Voice Discovery & Activation" events
- All "Voice Session Events" (Conversation + Dictation)
- All "Voice Playback Events"
- All "Voice Error & Quality Events"
- `voice_admin_enabled` / `voice_admin_disabled`

**Properties:**
- All "Standard Context Properties"
- All "User Segmentation Properties"
- All "Voice Session Properties"
- All "Voice Quality & Performance Properties"

**Metrics:**
- Voice Usage Rate
- Voice Trial Rate
- Voice Retention Rate
- Adoption Funnel Metrics
- Engagement & Session Quality Metrics
- Quality & Performance Metrics (P50/P95 TTFB, error rates)

**Dashboards:**
- Executive Summary Dashboard
- Voice Adoption Funnel Dashboard
- Voice Session Quality Dashboard

**Why P0:**
- Essential for measuring success criteria in one-pager
- Required to answer primary analytics questions (trial, retention, quality)
- Needed to debug issues during CZ
- Core metrics for deciding whether to proceed to Limited Beta

### 5.2 P1 - Should Have for Limited Beta (Early April)

**Events:**
- `voice_tooltip_viewed`
- `voice_conversation_timeout`
- `voice_muted`
- `voice_latency_warning`
- `voice_selection_changed`

**Properties:**
- `background_noise_detected`
- `interruption_position_ms`
- Additional cost properties (if not already tracked)

**Metrics:**
- Use Case & Content Metrics
- Cost Metrics (detailed breakdown)
- Sales Impact Metrics (initial tracking)

**Dashboards:**
- Voice Use Case Analysis Dashboard
- Voice Cost & Efficiency Dashboard
- Sales Impact Dashboard (initial version)

**Why P1:**
- Deeper insights into user behavior
- Cost tracking becomes critical at scale
- Sales tracking ramps up as demos begin
- Nice-to-have for debugging but not critical

### 5.3 P2 - Nice to Have for GA (Late April)

**Events:**
- Additional admin/settings events
- A/B test variation events (if running experiments)

**Properties:**
- Advanced segmentation properties
- Experimental features

**Metrics:**
- Advanced cohort analysis
- Predictive retention models
- Voice feature correlation analysis

**Dashboards:**
- Advanced experimentation dashboard
- Predictive analytics dashboard

**Why P2:**
- Not critical for launch decisions
- Can be added iteratively based on learnings
- Supports long-term optimization

---

## 6. Integration with Voice Evaluation Framework

The Voice Evaluation Framework (RFC) focuses on **technical quality** while this Product Analytics Plan focuses on **user behavior and business impact**. They complement each other:

### 6.1 Shared Data Sources

| Data Source | Product Analytics Use | Evaluation Framework Use |
|-------------|----------------------|--------------------------|
| **Langfuse** | Session metadata, token usage, response quality | STT/TTS transcripts, response analysis |
| **S3 Audio Logs** | Session identifiers, cost tracking | Golden dataset, quality evaluation (WER, MOS) |
| **DataDog** | Latency metrics, error rates, cost | Infrastructure monitoring, E2E latency |

### 6.2 Shared Metrics

| Metric | Product Analytics | Evaluation Framework |
|--------|-------------------|---------------------|
| **Latency (TTFB)** | P50/P95 across all users | Average in golden dataset |
| **STT Accuracy** | Error rate, empty transcriptions | Word Error Rate (WER) on golden dataset |
| **TTS Quality** | Interruption rate, completion rate | MOS scores, neural predictors |
| **Session Quality** | Turns per session, completion rate | E2E success rate in test harness |

### 6.3 How They Work Together

1. **Golden Dataset → Product Benchmarks**
   - Use golden dataset results to set alert thresholds in DataDog
   - Example: If golden dataset WER is 5%, alert if production STT error rate >10%

2. **Production Data → Golden Dataset Updates**
   - Flag production sessions with high error rates or abandonment
   - Add similar scenarios to golden dataset for testing

3. **Evaluation Results → User Experience**
   - Track if users in high-latency cohorts have lower retention
   - Correlate MOS scores with session completion rates

---

## 7. Instrumentation Implementation Notes

### 7.1 Event Tracking Implementation

**Frontend (React/TypeScript):**
```typescript
// Example event structure for Amplitude
amplitude.track('voice_conversation_started', {
  user_id: currentUser.id,
  account_id: currentUser.accountId,
  session_id: coachSessionId,
  turn_id: turnId,
  voice_mode: 'conversation',
  coach_use_case: 'general',
  account_tier: currentUser.accountTier,
  user_role: currentUser.role,
  feature_flag_status: voiceFeatureFlagStatus,
  timestamp: new Date().toISOString()
});
```

**Backend (Coach Service):**
```python
# Example event structure for voice response
track_event('voice_response_started', {
    'user_id': user_id,
    'session_id': session_id,
    'turn_id': turn_id,
    'response_word_count': len(response_text.split()),
    'tts_latency_ms': tts_latency,
    'tts_provider': 'elevenlabs',
    'tts_model_version': 'v3',
    'tts_voice_id': voice_id,
    'estimated_cost_usd': calculate_cost(response_text, tts_provider)
})
```

### 7.2 DataDog Metrics Implementation

```python
# Example DataDog metric for cost tracking
statsd.histogram(
    'coach.voice.cost_per_session',
    session_cost,
    tags=[
        f'account_tier:{account_tier}',
        f'region:{region}',
        f'use_case:{use_case}',
        f'provider:elevenlabs'
    ]
)

# Example DataDog metric for latency
statsd.histogram(
    'coach.voice.ttfb_ms',
    ttfb_duration,
    tags=[
        f'session_id:{session_id}',
        f'turn_id:{turn_id}',
        f'is_first_turn:{is_first_turn}'
    ]
)
```

### 7.3 Feature Flag Integration

Ensure all events include `feature_flag_status` to track:
- `cz` - Customer Zero (Culture Amp employees)
- `beta_10` - 10% Limited Beta rollout
- `beta_50` - 50% rollout
- `beta_100` - 100% GA rollout

This allows cohort analysis by rollout stage.

---

## 8. Data Privacy & Compliance

### 8.1 PII Handling

**DO NOT LOG:**
- User's actual voice recordings (audio files) in Amplitude
- Full transcription text containing PII
- Identifiable customer data in unencrypted form

**OK TO LOG:**
- Session IDs (non-identifying)
- Metadata (duration, word count, latency)
- Aggregated metrics
- Anonymized/hashed user identifiers

### 8.2 Voice Consent Tracking

All voice analytics depend on `voice_consent_accepted` event:
- Only track voice events for users who have accepted consent
- Log consent acceptance/decline for compliance audit trail
- Include consent timestamp in user properties

### 8.3 Data Retention

- **Amplitude**: Follow Culture Amp's standard retention policy
- **DataDog**: 15-month retention for metrics
- **S3 Audio Logs**: Retention policy as defined in Voice Evaluation RFC (short-term, evaluation purposes only)

---

## 9. Success Criteria & Decision Framework

### 9.1 After CZ (Mar 16-30): Proceed to Limited Beta?

**GO Decision (Proceed to Limited Beta):**
- ✅ Voice Trial Rate >30% (of CZ users try voice at least once)
- ✅ Voice Retention Rate >40% (of trialists use voice 3+ times)
- ✅ Session Completion Rate >70% (sessions end gracefully, not abandoned)
- ✅ P95 TTFB <5s (acceptable latency)
- ✅ Error Rate <5% (STT/TTS errors within tolerance)
- ✅ Qualitative feedback is positive (CZ users find value)

**NO-GO Decision (Delay Limited Beta):**
- ❌ Voice Trial Rate <20%
- ❌ Voice Retention Rate <25%
- ❌ Session Completion Rate <50%
- ❌ P95 TTFB >8s
- ❌ Error Rate >10%
- ❌ Qualitative feedback is negative (confusing, frustrating, not useful)

### 9.2 After Limited Beta (Apr): Proceed to GA?

**GO Decision (Proceed to 100% GA):**
- ✅ Voice Usage Rate >1% (of all Coach interactions)
- ✅ Voice Retention Rate >30%
- ✅ No critical bugs or blockers
- ✅ Sales team feedback is positive
- ✅ Cost per session is sustainable (<50% higher than text)

**NO-GO Decision (Hold at Limited Beta):**
- ❌ Voice Usage Rate <0.5%
- ❌ Voice Retention Rate <20%
- ❌ Critical bugs or performance issues
- ❌ Cost per session is unsustainable (>2x text sessions)

### 9.3 After GA (May+): Invest in V2 (Perform)?

**Invest in V2:**
- ✅ Voice Usage Rate >2%
- ✅ Strong retention (users return 3+ times)
- ✅ Sales team reports voice helps close deals
- ✅ Customer feedback requests Perform voice

**Pause V2:**
- ❌ Voice Usage Rate <1%
- ❌ Weak retention (users try once and stop)
- ❌ Sales team reports voice is "nice to have" but not impactful
- ❌ No customer demand for Perform voice

---

## 10. Next Steps

### 10.1 Immediate Actions (This Week)

- [ ] **Review & refine this plan** with Engineering (Thai, Dan) to validate technical feasibility
- [ ] **Review with Data/Analytics team** (TBD) to ensure Amplitude/DataDog instrumentation is possible
- [ ] **Socialize with PSX** (People Science) to align on use case taxonomy and quality metrics
- [ ] **Align with Sales Enablement** (meeting tomorrow) on sales impact tracking approach
- [ ] **Create tickets** for instrumentation work (frontend + backend)
- [ ] **Define alert thresholds** in DataDog based on golden dataset results

### 10.2 Before CZ Launch (by Mar 16)

- [ ] **Implement P0 events** in frontend and backend
- [ ] **Build Executive Summary Dashboard** in Amplitude
- [ ] **Build Voice Adoption Funnel Dashboard** in Amplitude
- [ ] **Build Voice Session Quality Dashboard** in Amplitude + DataDog
- [ ] **Test instrumentation** in dev environment with synthetic data
- [ ] **Validate data pipeline** (events flowing to Amplitude, metrics to DataDog)
- [ ] **Set up alerts** in DataDog for error rates and latency

### 10.3 During CZ (Mar 16-30)

- [ ] **Monitor dashboards daily** for anomalies and issues
- [ ] **Weekly metrics review** with Coach team
- [ ] **Collect qualitative feedback** from CZ users (surveys, interviews)
- [ ] **Adjust alert thresholds** based on actual usage patterns
- [ ] **Document insights** for Limited Beta launch

### 10.4 Before Limited Beta (Early Apr)

- [ ] **Implement P1 events** (use case tracking, cost metrics)
- [ ] **Build Use Case Analysis Dashboard**
- [ ] **Build Cost & Efficiency Dashboard**
- [ ] **Set up sales tracking** (manual process or Salesforce integration)
- [ ] **Review CZ results** and refine success criteria for GA

---

## Appendix A: Open Questions

1. **Sales Tracking**: How will we track voice mentions/demos in deals? Salesforce integration or manual?
2. **Alert Thresholds**: What are acceptable thresholds for latency, error rates? (Pending golden dataset results)
3. **Use Case Taxonomy**: How do we auto-detect Coach use cases? (Pending PSX input)
4. **Cost Targets**: What is the acceptable cost per voice session vs text session? (<50% premium? <2x?)
5. **Retention Definition**: Is "3+ sessions" the right retention bar, or should we use "3+ sessions in first 30 days"?
6. **Feature Flag Strategy**: What are the exact rollout percentages and cohorts for Limited Beta?

---

## Appendix B: Related Resources

- [Voice One-Pager](./coach-voice-one-pager.md)
- [Voice Feature List](./Coach%20_%20Voice%20_%20Feature%20list.md)
- [Voice Evaluation Framework RFC](./rfc-voice-evaluation-framework.md)
- [2026 Strategic Priority Metrics](../../Knowledge/strategy/2026-strategic-priority-metrics.md)
- Amplitude Coach Dashboard: [link TBD]
- DataDog Voice Metrics: [link TBD]
- Looker Cost Dashboard: [link TBD]