
export function scoreRisk(features) {
  return features.map(f => {
    const score = Math.min(1, (f.blocks * 0.6 + f.warns * 0.3) / Math.max(1, f.total))
    return {
      entity: f.entity,
      score,
      explanation: [
        `Blocks: ${f.blocks}`,
        `Warnings: ${f.warns}`,
        `Total events: ${f.total}`,
      ],
    }
  })
}
