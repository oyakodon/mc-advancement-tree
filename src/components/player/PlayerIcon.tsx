'use client'

import Image from 'next/image'

interface Props {
  player: { id: string; name?: string }
  width?: number
  square?: boolean
}

export default function PlayerIcon({ player, width = 64, square = false }: Props) {
  return (
    <Image
      width={width}
      height={width}
      src={`https://crafatar.com/avatars/${player.id}?size=${width}&overlay`}
      alt={player.name ?? ''}
      title={player.name ?? ''}
      priority
      data-loaded='false'
      onLoad={(event) => {
        event.currentTarget.setAttribute('data-loaded', 'true')
      }}
      className={`${!square ? 'rounded-sm' : ''} data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-600/10 dark:data-[loaded=false]:bg-gray-200/10`}
    />
  )
}
