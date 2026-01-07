import { enqueueRun } from "./workers/queue"
export function startScheduler(intervalMinutes) {
  setInterval(() => enqueueRun({}), intervalMinutes * 60000)
}
