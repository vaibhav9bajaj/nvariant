
CREATE TABLE IF NOT EXISTS schema_snapshots (
  key TEXT NOT NULL,
  version INT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  PRIMARY KEY (key, version)
);
