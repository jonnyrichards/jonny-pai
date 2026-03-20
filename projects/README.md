# Projects

External-facing documents for work projects. These are polished artifacts meant to be shared with your team, often synced to Confluence.

## Structure

```
projects/
  {project-name}/
    README.md           # Project overview
    spec.md             # Requirements, design
    status.md           # Progress updates
    decisions.md        # Architecture Decision Records
    research.md         # Customer research, competitive analysis
    planning.md         # Planning notes, meeting agendas
    .confluence/        # Confluence sync metadata
      mapping.json
```

## Confluence Sync

Use the `/confluence-sync` skill to push/pull documents to Confluence.

Files include frontmatter with sync metadata:

```yaml
---
title: Voice Feature Spec
confluence_page_id: "5934482147"
confluence_space: "COACHCAMP"
confluence_url: "https://cultureamp.atlassian.net/..."
last_synced: "2026-03-09T10:00:00Z"
---
```

## Relationship to Memory

PAI's memory (`memory/work/{project}/`) contains internal context about the project:
- Observations, learnings, blockers
- Raw notes, timestamped events
- What you're thinking

Project docs contain polished artifacts:
- Requirements, specs, status updates
- Cleaned up for external consumption
- What your team sees
