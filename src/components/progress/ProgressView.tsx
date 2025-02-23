'use client'

import { useMemo, useState } from 'react'

import AdvancementTree from '../advancement/AdvancementTree'

import ProgressDetail from './ProgressDetail'
import ProgressStats from './ProgressStats'

import { ProgressNode } from '@/model/ProgressNode'
import { ProgressTree } from '@/model/Tree'

interface Props {
  tree: ProgressTree
}

export default function ProgressView({ tree }: Props) {
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
    <div className='h-full grid gap-x-2 p-2 grid-cols-2 sm:grid-cols-7'>
      <div className={`col-span-2 row-span-1 sm:pb-4 sm:order-1 ${hovered ? 'sm:border-b' : ''}`}>
        <ProgressStats progress={tree.progress} />
      </div>

      <div className='col-span-2 sm:col-span-5 row-span-3 sm:min-h-96'>
        <AdvancementTree
          nodes={nodes}
          categories={tree.categories}
          isDone={(key: string) => nodes[key].done}
          onSelected={onHover}
        />
      </div>

      <div className='col-span-2 row-span-2 sm:order-2 sm:overflow-y-auto min-h-50'>
        <ProgressDetail nodes={nodes} selected={hovered} />
      </div>
    </div>
  )
}
