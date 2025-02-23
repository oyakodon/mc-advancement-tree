import Image from 'next/image'
import React, { MouseEventHandler, ReactEventHandler } from 'react'

import { LocalizedNode } from '@/model/ProgressNode'

const defaultIconSize = 32

interface Props {
  bgSize: number
  iconSize: number
  node: LocalizedNode
  done: boolean
  onMouseOver?: MouseEventHandler<HTMLDivElement> | undefined
  onIconLoad?: ReactEventHandler<HTMLImageElement> | undefined
}

export default function AdvancementIcon({
  bgSize,
  iconSize,
  node,
  done,
  onMouseOver,
  onIconLoad,
}: Props) {
  const bgUrl = `/images/icons/${node.type}_${done ? 'completed' : 'uncompleted'}.png`

  return (
    <div
      style={{
        padding: 0,
        margin: 0,
        width: bgSize,
        height: bgSize,
        position: 'relative',
      }}
      onMouseOver={onMouseOver}
      title={node.title ?? ''}
    >
      <Image
        alt=''
        src={bgUrl}
        width={bgSize}
        height={bgSize}
        decoding='async'
        onLoad={onIconLoad}
      />

      <div
        style={{
          position: 'absolute',
          left: `${(bgSize - defaultIconSize) / 2}px`,
          top: `${(bgSize - defaultIconSize) / 2}px`,
          lineHeight: 0,
        }}
      >
        <div
          style={{
            width: defaultIconSize,
            height: defaultIconSize,
            transform: `scale(${(iconSize / defaultIconSize) * 100}%)`,
            backgroundImage: `url("${node.iconUrl}")`,
          }}
        />
      </div>
    </div>
  )
}
