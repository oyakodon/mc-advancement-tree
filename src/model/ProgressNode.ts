import { IconNode } from './IconNode'
import { LocalizedContent } from './Localized'
import { ProgressEntry } from './Progress'

export type LocalizedNode = IconNode & LocalizedContent

export type ProgressNode = LocalizedNode & ProgressEntry
