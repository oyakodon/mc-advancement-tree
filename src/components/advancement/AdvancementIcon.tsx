import Image from 'next/image'
import React, { MouseEventHandler, ReactEventHandler } from 'react'

import { LocalizedNode } from '@/model/ProgressNode'

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
      <Image alt='' src={bgUrl} width={bgSize} height={bgSize} decoding='async' />

      <div
        style={{
          position: 'absolute',
          left: `${(bgSize - iconSize) / 2}px`,
          top: `${(bgSize - iconSize) / 2}px`,
          lineHeight: 0,
        }}
      >
        <Image
          alt=''
          src={node.iconUrl}
          width={iconSize}
          height={iconSize}
          decoding='async'
          onLoad={onIconLoad}
        />
      </div>
    </div>
  )
}
