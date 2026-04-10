---
title: ElevenLabs Security Risk — Voice Team Response
confluence_page_id: 6067879940
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/6067879940/ElevenLabs+Security+Risk+Voice+Team+Response"
last_synced: "2026-03-24T06:07:03.758Z"
---

# ElevenLabs Security Risk — Voice Team Response

**Source docs:**

* ElevenLabs Security Review (Confluence): https://cultureamp.atlassian.net/wiki/spaces/SEC/pages/5888344272/ElevenLabs+-+Security+Review
* SaaS Risk Assessment: https://docs.google.com/spreadsheets/d/1IKUfWZjgGP8Zm15Y9GQPFgwjf5TFiiV97r_MeopkTWw/edit?gid=202632154#gid=202632154
* DPIA Risk Assessment: https://docs.google.com/spreadsheets/d/1KjX9oUbfW0EAQbpeOyXk9lNw-nkIwR_MBqtNm0TSU0M/edit?gid=202632154#gid=202632154

32 control requirements reviewed. Items not listed below = tick (can implement as-is).

---

## EL Control Plane

| # | Control | Response |
|---|---------|----------|
| 4d | Key rotation | Manual only, admin-only — same approach as Langfuse. Accept. [Notes: We need a process for rotating the key immediately too - in the event of an incident. We need a way to validate the key set - ie. that no new keys have been created.] |
| 6 | Zero Retention Mode (ZRM) | Enforced by Legal at contract level, not Engineering. |
| 7 | Rate limits | Will implement EL's default rate limiting + daily cost monitoring via EL control plane. |
| 8 | Voice PII (STT config) | [Notes: if Eleven Labs enables us to identify and not store PII, we should implement these settings. If we were using Camper biometric data / voice print - for instance as part of testing, we'd need additional controls. Coach team noted: we are not doing this] |
| 10 | Session timeout | Will implement 15-min token expiry. [We need to put a timeout on the web socket itself, not just the initial authentication token that enables the web socket session.] |
| 15 | Service account register | Will not implement separately from EL account. [Notes: we need a way to validate the key set; one option is to connect this to the moment where we rotate the keys - ie. check no new keys / accounts created…when key rotation happens.] |
| 16 | Billing/consumption monitoring | Will implement front-end consumption monitoring to supplement rate limiting. |

---

## Coach Integration

| # | Control | Response |
|---|---------|----------|
| 1, 3d | Audit logs | Will not implement — longer-term platform goal, not feature-specific. |
| 2 | Guardrails | Will implement on STT input to EL. Will not implement on TTS output. |

---

## Eleven Labs Control Plane API

No items requiring response.

---

## Next steps (as of 2026-03-18)

* Alice working to improve the risk sheet
* Jonny to join a Risk Management session to review mitigations
* Coach work items: SSO + Okta group config (Admin/Member); rate limiting + cost monitoring (#7, #16); 15-min token expiry (#10); load testing + concurrent session testing (via #help-security)
