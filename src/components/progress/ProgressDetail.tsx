import { useMemo } from 'react'

import AdvancementIcon from '../advancement/AdvancementIcon'

import ProgressCriteria from './ProgressCriteria'

import { ProgressNode } from '@/model/ProgressNode'

const Skelton = () => {
  return (
    <div className='flex flex-col space-y-3 max-w-[480px] sm:max-w-none'>
      <div className='animate-pulse bg-muted h-[80px] rounded-xl' />
      <div className='space-y-2'>
        <div className='animate-pulse rounded-md bg-muted h-4 w-[250px]' />
        <div className='animate-pulse rounded-md bg-muted h-4 w-[200px]' />
        <div className='animate-pulse rounded-md bg-muted h-4 w-[150px]' />
      </div>
    </div>
  )
}

interface Props {
  nodes: Record<string, ProgressNode>
  selected: string | null
}

export default function ProgressDetail({ nodes, selected }: Props) {
  const node = useMemo(() => {
    return selected ? nodes[selected] : null
  }, [nodes, selected])

  if (!node) {
    return <Skelton />
  }

  return (
    <div className='flex flex-col gap-2 min-w-64'>
      <div className='flex items-center justify-between'>
        <p className='flex text-lg font-bold dark:text-gray-100'>{node.title}</p>
        <div className='p-2'>
          <AdvancementIcon node={node} done={node.done} bgSize={60} iconSize={36} />
        </div>
      </div>

      <div className='flex bg-sky-50 rounded-l-sm border-2 border-l-8 border-sky-500'>
        <p className='p-3 text-sm dark:text-gray-800'>{node.description}</p>
      </div>

      <div className='flex max-h-48'>
        <ProgressCriteria node={node} />
      </div>
    </div>
  )
}
