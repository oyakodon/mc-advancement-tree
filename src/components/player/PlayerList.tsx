'use client'

import { UrlObject } from 'url'

import LinkIfNeeded from '../LinkIfNeeded'

import PlayerListItem from './PlayerListItem'

import { Player } from '@/model/Player'

interface Props {
  players: (Player & { rank: number })[]
  world?: string
}

export default function PlayerList({ players, world }: Props) {
  const href =
    (world &&
      ((p: Player): UrlObject => ({
        pathname: '/players',
        query: {
          w: world,
          p: p.id,
        },
      }))) ||
    undefined

  return (
    <div className='flex flex-col group'>
      {players.map((p) => (
        <div key={p.id} className='border-b-2 border-gray-200 last:border-none'>
          <LinkIfNeeded item={p} href={href}>
            <PlayerListItem player={p} rank={p.rank} />
          </LinkIfNeeded>
        </div>
      ))}
    </div>
  )
}
