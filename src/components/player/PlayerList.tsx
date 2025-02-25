'use client'

import { UrlObject } from 'url'

import Link from 'next/link'

import PlayerListItem from './PlayerListItem'

import { Player } from '@/model/Player'

interface Props {
  players: (Player & { rank: number })[]
  world: string
}

export default function PlayerList({ players, world }: Props) {
  const href = (p: Player): UrlObject => ({
    pathname: '/players',
    query: {
      w: world,
      p: p.id,
    },
  })

  return (
    <div className='flex flex-col group'>
      {players.map((p) => (
        <div key={p.id} className='border-b-2 border-gray-200 last:border-none'>
          <Link href={href(p)}>
            <PlayerListItem player={p} rank={p.rank} />
          </Link>
        </div>
      ))}
    </div>
  )
}
