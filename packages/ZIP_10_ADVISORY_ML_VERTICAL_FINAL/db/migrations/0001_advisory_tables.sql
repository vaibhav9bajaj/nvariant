
CREATE TABLE advisory_model_runs (
  run_id TEXT PRIMARY KEY,
  model_family TEXT,
  model_version TEXT,
  status TEXT,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  metrics_json JSONB,
  error_json JSONB
);

CREATE TABLE advisory_recommendations (
  recommendation_id TEXT PRIMARY KEY,
  run_id TEXT,
  contract_id TEXT,
  suggestion_type TEXT,
  severity TEXT,
  confidence FLOAT,
  diff_json JSONB,
  evidence_json JSONB,
  explanation_md TEXT,
  status TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE advisory_feedback (
  recommendation_id TEXT,
  decision TEXT,
  reason_code TEXT,
  actor TEXT,
  created_at TIMESTAMP DEFAULT now()
);
