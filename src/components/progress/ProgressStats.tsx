import { Progress } from '@/model/Progress'

interface Props {
  progress: Progress
}

export default function ProgressStats({ progress }: Props) {
  const ratio = progress.done / progress.total
  const updated = progress.achieved ? new Date(progress.achieved) : null

  return (
    <div className='flex flex-col min-w-45 py-2 gap-2'>
      <div className='flex items-center gap-4'>
        <span className='text-xl font-bold'>{(ratio * 100).toFixed(1) || 0} %</span>

        <div className='flex border-2 rounded-sm p-1'>
          <span className='text-xs'>
            {progress.done} / {progress.total}
          </span>
        </div>
      </div>

      {updated && (
        <div className='flex'>
          <span className='text-xs'>
            Updated: {`${updated.toLocaleDateString()} ${updated.toLocaleTimeString()}`}
          </span>
        </div>
      )}
    </div>
  )
}
