'use client'

import PlayerIcon from './PlayerIcon'

import MedalSvg from '@/components/icon/Medal'
import ProgressBadge from '@/components/progress/ProgressBadge'
import { Player } from '@/model/Player'

interface Props {
  player: Player
  rank?: number
}

const medal = (done: number, rank?: number): string | null => {
  if (!rank || rank > 3) return null

  // 進捗0の場合はメダルをつけない
  if (done === 0) return null

  return ['fill-gold', 'fill-silver', 'fill-bronze'][rank - 1]
}

export default function PlayerCard({ player: p, rank }: Props) {
  const medalStyle = medal(p.progress.done, rank)

  return (
    <div className='flex flex-col flex-wrap gap-2 max-w-sm p-4 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-500 rounded-lg shadow-sm min-w-45 '>
      <div className='flex gap-4'>
        <PlayerIcon player={p} width={48} />

        <div className='flex flex-auto justify-between'>
          <div className='flex flex-col gap-1'>
            <span className='font-bold lg:text-md truncate dark:text-white'>{p.name}</span>
            <div className='flex items-center gap-1'>
              <div
                className={`w-1 h-1 ${p.online ? 'bg-green-500' : 'bg-slate-600'} rounded-full`}
              />
              <span className={`text-xs font-mono ${p.online ? '' : 'text-slate-400'}`}>
                {p.online ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          {medalStyle && <MedalSvg className={`w-5 ${medalStyle}`} />}
        </div>
      </div>

      <div className='flex justify-end'>
        <ProgressBadge progress={p.progress} />
      </div>
    </div>
  )
}
