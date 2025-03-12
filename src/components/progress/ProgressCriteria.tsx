import { CircleCheck, CircleMinus } from 'lucide-react'

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

const CriterionRow = ({ criterion }: { criterion: Criterion }) => {
  const done = criterion.done != null

  return (
    <div className='flex text-xs'>
      {done ? (
        <CircleCheck className='size-4 text-green-700' />
      ) : (
        <CircleMinus className='size-4 text-gray-400' />
      )}

      <div className='flex-auto break-all pl-3 -indent-3'>
        <span className={`pl-3 ${done ? '' : 'underline decoration-dotted'}`}>{criterion.id}</span>
      </div>
    </div>
  )
}

interface Props {
  node: ProgressNode
}

const ProgressCriteria = ({ node }: Props) => {
  return (
    <div className='grow bg-amber-50 border-l-4 border-amber-500 rounded-sm border p-1 overflow-auto dark:text-gray-800'>
      <div className='flex p-1 text-sm'>
        <CriteriaHeader progress={node.progress} metrics={node.metrics} completed={node.done} />
      </div>

      <div className='flex flex-col gap-1 pl-2 pb-2'>
        {node.criteria.map((c) => {
          return <CriterionRow criterion={c} key={c.id} />
        })}
      </div>
    </div>
  )
}

export default ProgressCriteria
