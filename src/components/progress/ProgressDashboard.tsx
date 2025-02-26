'use client'

import { useMemo, useState } from 'react'

import AdvancementTree from '../advancement/AdvancementTree'

import ProgressDetail from './ProgressDetail'

import { ProgressNode } from '@/model/ProgressNode'
import { ProgressTree } from '@/model/Tree'

interface Props {
  tree: ProgressTree
}

export default function ProgressDashboard({ tree }: Props) {
  const nodes: Record<string, ProgressNode> = useMemo(
    () =>
      tree.nodes.reduce<Record<string, ProgressNode>>(
        (acc, cur) => ((acc[cur.key] = cur), acc),
        {},
      ),
    [tree],
  )

  const [hovered, onHover] = useState<string | null>(null)

  return (
    <div className='flex flex-col flex-auto sm:flex-row gap-x-4 sm:min-h-64'>
      <div className='flex-auto max-h-64 sm:max-h-none'>
        <AdvancementTree
          nodes={nodes}
          categories={tree.categories}
          isDone={(key: string) => nodes[key].done}
          onSelected={onHover}
        />
      </div>

      <div className='sm:overflow-y-auto min-h-48 min-w-64 pt-4'>
        <ProgressDetail nodes={nodes} selected={hovered} />
      </div>
    </div>
  )
}
