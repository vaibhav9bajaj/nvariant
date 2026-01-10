import { pool } from "../storage/db"
export async function expireOldRecommendations(ttlDays) {
  await pool.query(
    `UPDATE advisory_recommendations SET status='expired'
     WHERE status='open'
       AND created_at < now() - ($1 || ' days')::interval`,
    [ttlDays]
  )
}
