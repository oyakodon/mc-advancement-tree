'use client'

import { ChevronRight, Users } from 'lucide-react'
import Link from 'next/link'

import { World } from '@/model/World'

type Details = 'version' | 'motd'

interface Props {
  world: World
  detail?: Details
}

const detailContent = (w: World, detail: Details) => {
  switch (detail) {
    case 'version':
      return `v${w.version}`
    case 'motd':
      return w.motd
  }
}

export default function WorldCard({ world, detail }: Props) {
  const players = Object.entries(world.players)
  const online = players.filter((_, status) => status).length

  return (
    <div className='flex flex-col flex-wrap max-w-sm p-4 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-500 rounded-lg shadow-sm min-w-45 '>
      <div className='flex justify-between gap-4'>
        <Link href={`/worlds/${world.id}`}>
          <span className='text-lg font-bold truncate'>{world.name}</span>
        </Link>

        <div className='flex items-center gap-2 rounded-full px-2 py-1.5 border dark:border-gray-500'>
          <Users className='size-4' />
          <span className='text-sm'>
            {online} / {players.length}
          </span>
        </div>
      </div>

      <div className='flex mb-2'>
        {detail && <span className='text-xs font-light'>{detailContent(world, detail)}</span>}
      </div>

      <div className='flex justify-end'>
        <Link href={`/worlds/${world.id}`}>
          <div className='inline-flex gap-1 items-center px-2 py-1.5 rounded-md text-white bg-cyan-700 hover:bg-cyan-600'>
            <span className='text-sm font-medium'>Player</span>
            <ChevronRight className='size-4' />
          </div>
        </Link>
      </div>
    </div>
  )
}
