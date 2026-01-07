
export async function setCommitStatus(client, repo, sha, state, description) {
  // Uses GitHub Status API
  await client.repos.createCommitStatus({
    owner: repo.split('/')[0],
    repo: repo.split('/')[1],
    sha,
    state,
    description,
    context: 'nvariant/contract-enforcement',
  })
}
