
# nvariant – CI / SCM Enforcement Engine (ZIP 3)

This service enforces data contracts at **code review and merge time**.

Supported SCMs:
- GitHub (first-class, App + webhook)
- GitLab (API + pipeline hooks)

Responsibilities:
- Receive SCM events (PR/MR, pushes)
- Compute contract diffs
- Block merges deterministically
- Emit audit & notification signals
