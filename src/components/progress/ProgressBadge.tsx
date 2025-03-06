import { Progress } from '@/model/Progress'

const palette = [
  'bg-purple-700', // [ 0,  10)
  'bg-indigo-700', // [10,  20)
  'bg-blue-700', // [20,  30)
  'bg-sky-700', // [30,  40)
  'bg-teal-700', // [40,  50)
  'bg-green-700', // [50,  60)
  'bg-lime-700', // [60,  70)
  'bg-yellow-700', // [70,  80)
  'bg-orange-700', // [80,  90)
  'bg-red-700', // [90, 100)
  '',
]

const bgStyle = (percentage: number): string => {
  if (percentage >= 1) {
    return 'bg-linear-to-r/increasing from-violet-700 via-lime-300 to-violet-700'
  }

  return palette[Math.floor((percentage * 100) / 10)]
}

interface Props {
  progress: Progress
}

export default function ProgressBadge({ progress }: Props) {
  const ratio = progress.done / progress.total
  const bg = bgStyle(ratio)

  return (
    <div className={`rounded-full ${bg} py-1.5 w-14`}>
      <div className='flex justify-center'>
        <span className='text-xs font-bold text-white tracking-tighter'>
          {(ratio * 100).toFixed(1) || 0} %
        </span>
      </div>
    </div>
  )
}
