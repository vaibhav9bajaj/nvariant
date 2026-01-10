CREATE TABLE IF NOT EXISTS contract_change_drafts (
  draft_id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL,
  proposal_json JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  created_by TEXT NULL
);
