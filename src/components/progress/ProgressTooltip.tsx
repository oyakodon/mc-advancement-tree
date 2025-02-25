import { Progress } from '@/model/Progress'

interface Props {
  progress: Progress
}

const ProgressTooltip = ({ progress: p }: Props) => {
  const v = Math.floor((p.done / p.total) * 100)

  return (
    <div className='flex flex-col gap-1 p-1'>
      <span className='text-xs font-medium'>
        {p.done} / {p.total}
      </span>

      <div className='flex items-center gap-x-0.5 h-1.5'>
        <div className={`w-5 h-full ${v >= 25 ? 'bg-cyan-500' : 'bg-gray-300'} rounded-full`} />
        <div className={`w-5 h-full ${v >= 50 ? 'bg-cyan-500' : 'bg-gray-300'} rounded-full`} />
        <div className={`w-5 h-full ${v >= 75 ? 'bg-cyan-500' : 'bg-gray-300'} rounded-full`} />
        <div className={`w-5 h-full ${v >= 100 ? 'bg-cyan-500' : 'bg-gray-300'} rounded-full`} />
      </div>
    </div>
  )
}

export default ProgressTooltip
