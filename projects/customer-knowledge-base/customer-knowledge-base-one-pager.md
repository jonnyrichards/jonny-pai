---
title: Coach | Customer Knowledge Base | One-pager
created_date: 2026-03-04
status: draft
confluence_page_id: 5986156868
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/5986156868/Coach+Customer+Knowledge+Base+One-pager"
last_synced: "2026-03-04T03:35:48.847Z"
---

# Description

We are building a Customer Knowledge Base that enables admins to upload company documents (values, competency frameworks, priorities) so Coach can provide more contextually relevant, organization-specific responses.

## The Problem

**User Problem:**
- Coach doesn't know anything about the user's company - its priorities, initiatives, org chart, competency frameworks, values
- Coach's replies can't reference domain knowledge about the company
- Responses feel generic and disconnected from the user's day-to-day context

**Business Problem:**
- Competitors (Lattice, Windmill) already offer AI coaches with company context
- Without organizational context, Coach adoption and engagement are limited
- Generic responses reduce perceived value and stickiness

---

## Why

**Customer Impact:**
- **More insightful conversations**: 14/18 CiP EAP customers cited company values as critical context, 7/18 want competency frameworks, 3/18 want company priorities/objectives
- **More tailored responses**: Company-specific frameworks (e.g., competency matrices) enable more actionable advice (esp. for Performance Reviews)
- **Higher engagement**: Hypothesis: Context-aware Coach drives stickier conversations (Customer feedback - DataDog: "Nice to have it as a thought partner familiar with business initiatives in flight")

**Business Impact:**
- **Competitive parity**: Closes gap with Lattice/Windmill on company-aware AI coaching
- **Increased adoption**: Organizational relevance drives usage and retention
- **Foundation for future capabilities**: Enables advanced org-aware features downstream

---

## Success Metrics

### Primary (User Engagement)
- **Adoption**: X% of accounts upload ≥1 document
- **Active usage**: X% of accounts upload ≥3 documents
- **Perceived relevance**: X% of respondents rate ≥4/5 on "Coach's responses seem relevant to my organization"

### Secondary (Technical)
- **Parsing accuracy**: Document processing pipeline correctly parses >90% of uploaded documents (new eval)

---

## Target Audience

Admins (HR, People Ops)

---

## What

An admin-facing document upload system that:
1. Enables admins to safely upload and store company documents
2. Parses and summarizes documents for inclusion in Coach context
3. Empowers Coach with rich organizational context for targeted responses

### Features
- Document upload interface for admins
- Support for multiple formats (.pdf, .docx, .xls, .txt, .csv)
- Secure storage (S3)
- Document parsing, summarization, and embedding
- Admin controls: edit, delete, toggle documents
- GDPR-compliant data deletion

[Link to designs when available]

---

## How

### Phase 1: RAG Pipeline + Customer Zero
**Duration:** [TBD]

**Goal:** Build RAG infrastructure and validate with manual uploads

**Milestones:**
- Manual document upload pipeline (Coach team → RAG)
- Data ingestion + chunking/vectorization
- Account-based retrieval
- Customer Zero testing with manually uploaded documents
- Discovery: Admin UI, document types, parsing strategy, citation/inspection UX

**Exit Criteria:** Working RAG for CZ with manually uploaded docs, validated retrieval accuracy

---

### Phase 2: Admin-Facing Upload
**Duration:** [TBD]

**Goal:** Ship self-service document upload for admins

**Milestones:**
- Admin upload UI (Settings)
- Multi-format document support
- Parsing/summarization pipeline
- Admin controls (edit, delete, toggle)
- GDPR compliance (data deletion)
- Testing with EAP customers

**Exit Criteria:** Admins can upload/manage documents, Coach uses documents in responses

---

## Testing

**Approach:** Customer Zero → EAP → Limited Beta

**Customer Zero:**
- Validate RAG retrieval accuracy
- Test document parsing quality
- Identify optimal document types
- Refine prompt strategies

**EAP (AI-curious customers):**
- Qualitative feedback on response relevance
- Document upload usability
- Admin workflow validation
- Measure perceived value of org-specific responses

**Key Metrics:**
- Document upload adoption
- Perceived response relevance (survey)
- Parsing accuracy (eval)
- Coach engagement (session depth/frequency)

---

## Open Questions

1. **Document types:** What formats are must-have vs nice-to-have? (Research from CiP EAP)
2. **UI location:** Where in Settings does upload live? How much parsing visibility?
3. **Data strategy:** Context window vs RAG retrieval? Citation/inspection like CiP?
4. **Admin controls:** What level of editing? Toggle per document? Per doc type?
5. **Competitive research:** What do Lattice/Windmill offer? Feature parity goals?

---

## Dependencies & Risks

**Dependencies:**
- RAG infrastructure buildout (Phase 1 foundational)
- Admin UI design decisions
- Document parsing/embedding strategy
- GDPR compliance review

**Risks:**
- Document parsing accuracy may vary by format/quality
- Optimal RAG retrieval strategy unclear (context window vs retrieval)
- Admin adoption depends on clear value + low friction
- Document types may be more varied than anticipated

**Mitigation:**
- Build parsing evals early (Phase 1)
- Test multiple document formats in CZ
- Discovery in Phase 1 to de-risk Phase 2 UI
- Start with high-value document types (values, competencies)