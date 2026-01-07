#!/usr/bin/env sh
set -eu

# Creates multiple databases on first container init.
# Uses NV_EXTRA_DBS env var: comma-separated list, e.g. "contracts,enforcement,observation,lineage"

if [ -z "${NV_EXTRA_DBS:-}" ]; then
  echo "NV_EXTRA_DBS empty; skipping extra DB creation"
  exit 0
fi

echo "Creating extra databases: $NV_EXTRA_DBS"

# POSTGRES_USER and POSTGRES_DB are set by the official entrypoint.
for db in $(echo "$NV_EXTRA_DBS" | tr ',' ' '); do
  echo "Creating database: $db"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    SELECT 'CREATE DATABASE "$db"' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$db')\gexec
EOSQL
done
