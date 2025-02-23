export type Criterion = {
  id: string
  done?: string
}

export type Advancement = {
  key: string
  type: 'task' | 'challenge' | 'goal'
  hidden: boolean
  metrics: 'allof' | 'oneof'
  criteria: Criterion[]
}
