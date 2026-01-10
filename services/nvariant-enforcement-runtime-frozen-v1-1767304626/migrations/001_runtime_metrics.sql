
CREATE TABLE IF NOT EXISTS runtime_metrics (
  run_id TEXT,
  model TEXT,
  status TEXT,
  duration_ms INT,
  created_at TIMESTAMP DEFAULT now()
);
