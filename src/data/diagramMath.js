// Synthetic asset × concept memberships for the teaching matrix (not corpus data).
export const matrixMemberships = [
  [.9, .8, 0, .3, 0],
  [.7, .6, .4, 0, .2],
  [0, .3, .9, .8, .5],
  [.4, 0, .7, .9, .6],
  [.6, .9, 0, .2, .8],
]

export function jaccardMatrix(memberships, mode = 'fuzzy', threshold = 0) {
  const columns = memberships[0].length
  const retained = memberships.map(row => row.map(w => w > 0 && w >= threshold ? (mode === 'classic' ? 1 : w) : 0))
  return Array.from({ length: columns }, (_, a) => Array.from({ length: columns }, (_, b) => {
    const intersection = retained.reduce((sum, row) => sum + Math.min(row[a], row[b]), 0)
    const union = retained.reduce((sum, row) => sum + Math.max(row[a], row[b]), 0)
    return union ? intersection / union : 0
  }))
}

export const exampleGraph = {
  nodes: [
    { id: 'q', label: 'Origen', x: 65, y: 100 },
    { id: 'a', label: 'Archivo A', x: 195, y: 45 },
    { id: 'b', label: 'Archivo B', x: 195, y: 170 },
    { id: 'c', label: 'Concepto C', x: 350, y: 55 },
    { id: 'd', label: 'Concepto D', x: 350, y: 180 },
  ],
  edges: [
    { from: 'q', to: 'a', weight: .92 },
    { from: 'q', to: 'b', weight: .64 },
    { from: 'a', to: 'c', weight: .87 },
    { from: 'b', to: 'c', weight: .72 },
    { from: 'b', to: 'd', weight: .55 },
  ],
}

export function thresholdReachable(threshold) {
  const kept = exampleGraph.edges.filter(edge => edge.weight >= threshold)
  const reached = new Set(['q'])
  let changed = true
  while (changed) {
    changed = false
    for (const edge of kept) {
      if (reached.has(edge.from) !== reached.has(edge.to)) {
        reached.add(edge.from); reached.add(edge.to); changed = true
      }
    }
  }
  return { kept, reached }
}
