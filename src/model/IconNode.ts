import { Advancement } from './Advancement'
import { Icon } from './Icon'

type INode<T> = T & { key: string; children: string[] }

export type IconNode = INode<Advancement> & Icon
