
export interface PgClient {
  query: (sql: string, params?: any[]) => Promise<{ rows: any[] }>
}

export async function recordExecution(pg: PgClient, runId: string, model: string, status: string, durationMs: number) {
  await pg.query(
    'INSERT INTO runtime_metrics(run_id, model, status, duration_ms) VALUES($1,$2,$3,$4)',
    [runId, model, status, durationMs]
  )
}
