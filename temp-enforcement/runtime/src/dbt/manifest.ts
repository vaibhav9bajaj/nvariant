
export interface DbtManifest {
  nodes: Record<string, any>
}

export function parseManifest(json: DbtManifest) {
  const models = []
  for (const [id, node] of Object.entries(json.nodes)) {
    if (node.resource_type === 'model') {
      models.push({
        uniqueId: id,
        name: node.name,
        dependsOn: node.depends_on?.nodes || [],
        materialization: node.config?.materialized || 'view',
        severity: 'ALLOW',
      })
    }
  }
  return models
}
