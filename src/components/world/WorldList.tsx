'use client'

import WorldCard from './WorldCard'

import { World } from '@/model/World'

interface Props {
  worlds: World[]
}

export default function WorldList({ worlds }: Props) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
      {worlds.map((w) => (
        <div key={w.id} className='col-span-1'>
          <WorldCard world={w} detail='version' />
        </div>
      ))}
    </div>
  )
}
