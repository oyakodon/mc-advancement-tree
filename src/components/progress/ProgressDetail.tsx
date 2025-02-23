import { useMemo } from 'react'

import AdvancementIcon from '../AdvancementIcon'

import ProgressCriteria from './ProgressCriteria'

import { ProgressNode } from '@/model/ProgressNode'

interface Props {
  nodes: Record<string, ProgressNode>
  selected: string | null
}

export default function ProgressDetail({ nodes, selected }: Props) {
  const node = useMemo(() => {
    return selected ? nodes[selected] : null
  }, [nodes, selected])

  if (!node) return

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <p className='flex text-lg dark:text-gray-100'>{node.title}</p>
        <div className='p-2'>
          <AdvancementIcon node={node} done={node.done} bgSize={60} iconSize={36} />
        </div>
      </div>

      <div className='flex bg-indigo-100 rounded-sm border'>
        <p className='p-3 text-sm dark:text-gray-800'>{node.description}</p>
      </div>

      <div className='flex max-h-48'>
        <ProgressCriteria node={node} />
      </div>
    </div>
  )
}
