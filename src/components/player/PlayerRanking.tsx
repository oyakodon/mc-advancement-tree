'use client'

import PlayerList from './PlayerList'

import { Player } from '@/model/Player'
import { Progress } from '@/model/Progress'

const compare = (a: Progress, b: Progress): number => {
  const safeMs = (value: string | undefined) =>
    value ? new Date(value).getTime() : Number.MAX_SAFE_INTEGER

  return (
    b.done / b.total - a.done / a.total || // 進捗は降順
    safeMs(a.achieved) - safeMs(b.achieved) // achievedは昇順
  )
}

const orderByProgress = (players: readonly Player[]): (Player & { rank: number })[] => {
  const sorted = players.toSorted((a, b) => compare(a.progress, b.progress))

  // 順位付け
  let rank = 1,
    count = 1
  const ranked = sorted.map((item, idx, arr) => {
    const prev = idx > 0 ? arr[idx - 1] : null
    if (!prev || compare(prev.progress, item.progress) === 0) {
      return { ...item, rank }
    }

    rank += count
    count = 1
    return { ...item, rank }
  })

  return ranked
}

interface Props {
  players: Player[]
  world?: string
}

export default function PlayerRanking({ players, world }: Props) {
  const ranking = orderByProgress(players)

  return <PlayerList players={ranking} world={world} />
}
