'use client'

import { World } from '@/model/World'

interface Props {
  world: World
}

export default function WorldDetail({ world }: Props) {
  return (
    <div className='flex flex-col gap-2 min-w-48'>
      <div className='flex items-center justify-between'>
        <span className='font-bold text-xl'>{world.name}</span>

        <div className='flex'>
          <div className='border rounded-full bg-white px-2'>
            <span className='bg-white font-mono text-sm text-black'>v{world.version}</span>
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
        <span className='text-sm'>{world.motd}</span>
      </div>
    </div>
  )
}
