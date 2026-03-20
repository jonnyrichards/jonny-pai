# RFC: Voice Evaluation Framework for Coach

> **Source:** [Confluence - Core Coach Space](https://cultureamp.atlassian.net/wiki/spaces/coach/pages/5905776827/RFC+Voice+Evaluation+Framework+for+Coach)
> **Last Modified:** 2 minutes ago
> **Author:** Rashmika Nawaratne

---

## 1. Business case for Voice Evaluation

Voice-based coaching is inherently more complex than text-based interaction. To get Voice Coach production-ready, we need a rigorous way to measure what "good" actually sounds like.

Further, we are using ElevenLabs, which is currently an industry leader in voice quality. Third-party [benchmarks consistently rank them at the top](https://artificialanalysis.ai/text-to-speech/model-families/elevenlabs?quality=quality) for clarity, naturalness, and speed. However, those benchmarks are conducted based on general-purpose scripts. We need to evaluate the voice Coach because general quality is not the same as coaching quality. Here is why we are going further:

* **The working/background condition**
    * We need to know if Coach can still hear/understand and respond correctly when there's background chatter, keyboard clicking, or the hum of a busy office.

* **The Coaching Persona**
    * We need to make sure Coach sounds like a Coach. Ensuring the tone stays warm, empathetic, and professional, even when the user is sharing a difficult work challenge.

* **Handling the language messiness / multilingual capability**
    * People "um" and "ah," they interrupt themselves, and they use industry-specific jargon that general benchmarks often miss. We need to test how Voice Coach handles these nuances.
    * We provide support to tier-1 languages, hence we need to assess Coach's capability in responding in supported languages.

* **Manual review is a bottleneck**
    * Listening to and auditing audio files is significantly more time-consuming than scanning text logs. We need an automated approach to ensure Voice Coach performs as expected, without being slowed down by manual QA/evals.

---

## 2. Evaluation Approach

### 2.1 Evaluation Criteria

* **Hearing (STT) & Understanding:**
    * **Accent and Language Performance:** accuracy across tier-1 languages (Multilingual Capability), diverse set of accents (E.g., non-native English speakers).
    * **Interaction Dynamics (Interrupts & Silence):** ability to detect when a user has finished speaking versus when they are merely pausing for thought, as well as its interrupt mid-sentence capability.
        * Testing what happens when users speak fast, use "ums," or interrupt mid-sentence.
    * **Auto Correction:** test the ability to correct common verbal slips or mispronunciations, based on the context.
    * **Noise:** performance across settings with different background noise
    * **Ability to understand names, dates, and technical jargons in business settings**

* **Speaking (TTS):**
    * **Pitch and Emphasis:** monitor for natural inflection and emphasis on key words so that advice sounds empathetic and professional, rather than monotone
    * **Markup & Artifact Handling:** Ensuring the TTS engine doesn't attempt to "speak" technical artifacts (like SSML tags or punctuation marks) which can immediately break the user's immersion
    * **Accent and Language Performance:** accuracy across tier-1 languages.
    * **Cues:** test Coach follows natural speech cues, such as pausing for breath or adjusting volume, to sound like a supportive partner [Stretched Goal]

* **End-to-end Voice Coaching:**
    * **Latency & Flow:** total time from user silence to the start of Coach's speech.
    * **Parameters from front end to backend:** Coach correctly identify that it's a voice input. That way Coach knows to respond accordingly to that voice guidelines.
    * **Output Guardrails:** Length requirement when Coach output the TTS. PSX will come up with the optimal length.
    * **System Reliability:** Test E2E process, from audio input to the final response, works seamlessly in our dev environment.
    * **Subject matter:** develop a clear sense of the content of voice conversations, how this differs from overall Coach conversations, what we can learn from this for marketing / prompt iterations etc.

---

### 2.2 The "Golden Dataset"

The Golden Dataset serves as our ground-truth benchmark for all voice evaluations. To build this, we require the following data components:

* **Audio Clip & Ground-Truth Transcripts**
    * A library of short-form (under 30s) and long-form (up to 3m) audio files capturing realistic coaching scenarios capturing details noted in Evaluation Criteria Section.
    * Human-verified text transcripts for every audio file to serve as the baseline for calculating Word Error Rate (WER).
    * Expect to start evaluations with ~30 clips overall for the evaluations. (We will consider multi-lingual evaluation test separately.)

* **Metadata & Labeling**
    * Every entry in the dataset is tagged with metadata to allow for granular reporting.
    * **Acoustic Labels:** Signal-to-noise category, speaker gender/pitch, and accent type.
    * **Linguistic Labels:** Presence of technical jargon or non-standard grammar.
    * **Behavioral Labels:** Timestamps for intentional interruptions or long silences.

* **Acquisition Strategy**
    * **Phase 1 (Synthetic):** Use high-quality Voice AI to generate initial clips.
    * **Phase 2 (Human/Internal):** Where synthetic data falls short of capturing the nuances of our criteria, we will record internal team members (ensuring full consent) to capture the messy, realistic scenarios that only human interactions can provide.
        * As voice recordings constitute biometric PII, this phase must undergo escalated security reviews.

---

### 2.3 Evaluation Approach

| **Aspect** | **WHY** | **WHAT** | **HOW** | **Steps** | **Inputs Required** | **Tools / Techniques** |
| --- | --- | --- | --- | --- | --- | --- |
| **Hearing (STT)** | Critical for inclusivity and ensuring Coach "hears" correctly in real-world office settings. | Signals: Accents, Auto-correction of slips, Interaction Dynamics (interrupts/silence), technical jargon and background noise, and accuracy. | Compare transcripts against a "golden" ground-truth set. | Create the golden dataset Synthetic + Internal. Run through Coach (automated) Get the STT output from Langfuse Run word-to-word evaluation | Input audio clip(s) Transcript of the input clip. Converted text Query (STT) | Deepgram Eval or jiwer Word Error Rate (WER): Measures substitutions, deletions, and insertions. Entity Accuracy: Ensuring names, dates, and jargon are captured correctly. |
| **Speaking (TTS)** | Robotic voices reduce trust. Pitch, emphasis, and markup handling are critical for rapport and warmth. | Signals: Volume fluctuations, SSML/Markup handling, voice characteristics, and volume consistency. | Use neural MOS predictors for volume/clarity. Manual: Use crowdsourced listening tests | For the same ground truth: Get Coach response from Langfuse Get the TTS output from AWS S3 bucket. Comparison using MOS automatically / Use AI-as-a-Judge to evaluate. | Coach Response (Text) TTS Output audio clip | neural MOS predictors (LLM-as-a-Judge) pymcd Mean Opinion Score (MOS): A 1–5 human rating of naturalness and clarity. Mel-Cepstral Distortion (MCD): Objective measure of how close synthetic audio is to natural speech. Neural MOS Predictors (AI-as-a-Judge): You feed a voice clip from Voice Coach into the NMOS Judge, and it outputs a predicted MOS (1–5). |
| **End-to-End Harness** | Proves the system works end-to-end. | Latency: Total time from user silence to Coach speech start. | Monitor network logs and telemetry to track the full "turn" duration. | Through network logs | Track telemetry from Datadog. | Python script Time to First Token (TTFB): How fast the TTS starts streaming. |
| **Multilingual Accuracy** | We provide support to tier-1 languages | Accuracy across the supported languages | Manual User testing | [Multilingual Testing Doc](https://cultureamp.atlassian.net/wiki/spaces/TCH/pages/5494341941) | | |

---

## 3. The Testing Harness & Safety Guards

We intend to build a dedicated Voice Evaluation Harness that allows us to evaluate these signals safely within our development environment.

* All voice evaluations are conducted in devfarms.
* Our voice evaluation tools and recording capabilities are hidden behind a Feature Flag. This is disabled by default and only turned on for specific tests.
* To ensure transparency, enabling the feature flag triggers a mandatory on-screen message. This prompt explicitly notifies the tester that their audio will be recorded and processed for quality analysis, requiring active acknowledgment before the microphone is activated.
* Audio clips from these **internal tests** are stored in a secure S3 bucket for evaluations, with a retention policy enabled.

**Architecture:** [Miro Board - Voice Evaluation Harness](https://miro.com/app/board/uXjVI1A0RQ0=/?moveToWidget=3458764658567332800&cot=14)

---

### 3.1 Technical Implementation

The following technical implementations are required to operationalise the Voice Evaluation framework:

1. **Automated Audio Ingestion:** Enable automated uploading of audio clips to Coach.
2. **Storage:** Archive Coach voice outputs in AWS S3, utilising metadata tags such as session_id, turn_id, and other relevant identifiers.

#### 3.1.1 Phased Implementation

* **Phase 1: MVP (Manual Workflow)** To initiate the Voice evaluation process, we will implement a single-file interface. This includes an upload button for individual audio clips and a download button to retrieve the "Coach" response. The downloaded filename will incorporate the `session_id` and include the necessary parameters for data retrieval from Langfuse.

* **Phase 2: Semi-Automation (Bulk Processing)** We will introduce bulk upload and download capabilities (optionally writing outputs directly to an AWS bucket) to scale the testing volume and semi-automate the workflow.

* **Phase 3: Operationalization (Full Automation)** We will fully operationalize the evaluation framework by automating the end-to-end pipeline, removing the need for manual file handling.

---

## 4. Next Steps

- [ ] Secure final review and sign-off on the Evaluation Solution Preview.
- [ ] Confirm the technical feasibility of the defined evaluation criteria.
- [ ] Complete the formal Risk and DPIA review to validate our secure S3 logging and user consent workflow.
- [ ] Finalise the "Golden Dataset" containing diverse audio profiles, accents, and background noise scenarios.
- [ ] Build and deploy the evaluation harness within Dev Farms, protected by the feature flag.
- [ ] Commence regular testing cycles to establish performance baselines and track improvements ahead of the March C0 rollout.
