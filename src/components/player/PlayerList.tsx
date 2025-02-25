'use client'

import { UrlObject } from 'url'

import Link from 'next/link'

import PlayerCard from './PlayerCard'

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
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {players.map((p) => (
        <div key={p.id} className='col-span-1'>
          <Link href={href(p)}>
            <PlayerCard player={p} rank={p.rank} />
          </Link>
        </div>
      ))}
    </div>
  )
}
