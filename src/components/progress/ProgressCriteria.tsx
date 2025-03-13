import { CircleCheck, CircleDashed, Minus } from 'lucide-react'
import { useMemo } from 'react'

import { Criterion } from '@/model/Advancement'
import { Progress } from '@/model/Progress'
import { ProgressNode } from '@/model/ProgressNode'

const metricsTitle = {
  allof: '(全て)',
  anyof: '(1つ以上)',
}

const CriteriaHeader = ({
  progress,
  metrics,
  completed,
}: {
  progress: Progress
  metrics: 'allof' | 'anyof'
  completed: boolean
}) => {
  const { done, total } = progress
  const percentage = done > 0 ? done / total : 0

  return (
    <div className='flex justify-between items-center w-full'>
      <span className='flex'>{'条件' + (total > 1 ? `: ${metricsTitle[metrics]}` : '')}</span>

      <span className='flex border-2 rounded-sm p-1 bg-white'>
        {total > 1 && metrics == 'allof' ? (
          <>
            {(percentage * 100).toFixed(1) || 0} % ({done || 0}/{total || 0})
          </>
        ) : (
          <>{completed ? '達成済み' : '未達成'}</>
        )}
      </span>
    </div>
  )
}

const CriterionRow = ({
  criterion,
  metrics,
  completed,
}: {
  criterion: Criterion
  metrics: 'allof' | 'anyof'
  completed: boolean
}) => {
  const done = criterion.done != null
  const id = criterion.id.replace(/^minecraft:/, '')

  return (
    <div className='flex text-xs'>
      {done ? (
        <CircleCheck className='size-4 text-green-700' />
      ) : metrics === 'allof' ? (
        <CircleDashed className='size-4 text-gray-400' />
      ) : (
        <Minus className='size-4 text-gray-400' />
      )}

      <div className='flex-auto break-all pl-2'>
        <span className={`${done || completed ? '' : 'underline decoration-dotted'}`}>{id}</span>
      </div>
    </div>
  )
}

interface Props {
  node: ProgressNode
}

const ProgressCriteria = ({ node }: Props) => {
  const criteria = useMemo(
    () =>
      node.criteria.toSorted(
        (a, b) => (b.done ? 1 : 0) - (a.done ? 1 : 0) || a.id.localeCompare(b.id),
      ),
    [node],
  )

  return (
    <div className='grow bg-amber-50 border-l-4 border-amber-500 rounded-sm border p-1 overflow-auto dark:text-gray-800'>
      <div className='flex p-1 text-sm'>
        <CriteriaHeader progress={node.progress} metrics={node.metrics} completed={node.done} />
      </div>

      <div className='flex flex-col gap-1 pl-2 pb-2'>
        {criteria.map((c) => {
          return (
            <CriterionRow criterion={c} metrics={node.metrics} completed={node.done} key={c.id} />
          )
        })}
      </div>
    </div>
  )
}

export default ProgressCriteria
