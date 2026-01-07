
export function airflowPreExecute(context) {
  if (context.blockedModels?.includes(context.task_id)) {
    throw new Error('Blocked by nvariant runtime enforcement')
  }
}

export function airflowPostExecute(context) {
  return { status: context.state, duration: context.duration }
}
