import { Criterion } from './Advancement'
import { Category } from './Category'

export type Progress = {
  done: number
  total: number
  achieved?: string
}

export type ProgressEntry = {
  key: string
  done: boolean
  criteria: Criterion[]
  progress: Progress
}

export type ProgressCategory = Category & { progress: Progress }

export type ProgressRecord = {
  progress: Progress
  categories: ProgressCategory[]
  records: ProgressEntry[]
}
