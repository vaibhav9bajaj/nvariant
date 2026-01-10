
export async function enqueueRun(payload: any): Promise<string> {
  const runId = 'run_' + Date.now()
  console.log('Advisory run queued', runId, payload)
  return runId
}
