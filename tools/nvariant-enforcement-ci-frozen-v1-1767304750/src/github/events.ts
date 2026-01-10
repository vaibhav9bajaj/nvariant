
export function parsePullRequestEvent(body: any) {
  return {
    id: body.pull_request.id,
    number: body.pull_request.number,
    repo: body.repository.full_name,
    baseSha: body.pull_request.base.sha,
    headSha: body.pull_request.head.sha,
    author: body.pull_request.user.login,
  }
}
