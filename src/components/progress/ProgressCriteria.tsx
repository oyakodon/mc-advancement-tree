import { Award, ChartPie, CircleCheck, CircleDashed, Minus } from 'lucide-react'
import { useMemo } from 'react'

import { Criterion } from '@/model/Advancement'
import { Progress } from '@/model/Progress'
import { ProgressNode } from '@/model/ProgressNode'

const CriteriaHeader = ({ progress, completed }: { progress: Progress; completed: boolean }) => {
  const { done, total } = progress
  const ratio = `${done || 0} / ${total || 0}`

  const percentage = `(${((done / total) * 100).toFixed(0) || 0} %)`

  return (
    <div className='flex justify-between items-center w-full h-8'>
      <div className='flex text-sm items-center gap-2'>
        <ChartPie className='size-4' />
        <span className='pb-0.5 tracking-tighter'>
          {ratio + (total > 1 ? ` ${percentage}` : '')}
        </span>
      </div>

      {completed && (
        <span className='flex rounded-sm p-1 border-2 border-amber-500'>
          <Award fill='gold' />
        </span>
      )}
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
    <div className='grow bg-amber-50 border-l-8 border-amber-500 rounded-l-sm border-2 p-1 overflow-auto dark:text-gray-800'>
      <div className='flex p-1 px-2'>
        <CriteriaHeader progress={node.progress} completed={node.done} />
      </div>

      <hr className='h-px m-1 border-0 bg-gray-200' />

      <div className='flex flex-col gap-1 p-2'>
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
