import { Category } from './Category'
import { IconNode } from './IconNode'
import { LocalizedContent } from './Localized'
import { Progress, ProgressCategory } from './Progress'
import { ProgressNode } from './ProgressNode'

export type AdvancementTree = {
  categories: Category[]
  nodes: IconNode[]
}

export type ProgressTree = {
  progress: Progress
  categories: (ProgressCategory & LocalizedContent)[]
  nodes: ProgressNode[]
}
