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

export default function PlayerCard({ player, rank }: Props) {
  const medalStyle = medal(player.progress.done, rank)

  return (
    <div className='flex flex-wrap items-center justify-between p-2'>
      <div className='flex items-center gap-3'>
        <div className='m-2'>
          <PlayerIcon player={player} />
        </div>

        <div className='flex flex-col'>
          <span className='font-bold lg:text-md truncate dark:text-white'>{player.name}</span>
          <div className='flex items-center gap-1'>
            <div
              className={`w-1 h-1 ${player.online ? 'bg-green-500' : 'bg-slate-600'} rounded-full`}
            />
            <span className={`text-xs font-light ${player.online ? '' : 'text-slate-600'}`}>
              {player.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        {medalStyle && <MedalSvg className={`w-5 ${medalStyle}`} />}
        <ProgressBadge progress={player.progress} />
      </div>
    </div>
  )
}
