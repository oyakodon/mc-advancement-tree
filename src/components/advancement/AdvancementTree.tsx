'use client'

import React, { useState } from 'react'

import AdvancementTab, { type Tab } from './AdvancementTab'
import AdvancementTreeView from './AdvancementTreeView'

import { LocalizedCategory } from '@/model/Category'
import { LocalizedNode } from '@/model/ProgressNode'

interface Props {
  nodes: Record<string, LocalizedNode>
  categories: LocalizedCategory[]
  isDone: (key: string) => boolean
  onSelected: (key: string) => void
}

export default function AdvancementTree({ nodes, categories, isDone, onSelected }: Props) {
  // 選択中のタブ
  const tabs: Tab[] = categories
    .map((c) => ({ key: c.root, title: c.title }))
    .toSorted((a, b) => a.title.localeCompare(b.title))
  const [tab, setTab] = useState<string>(tabs[0].key)

  return (
    <div className='flex flex-col h-full'>
      <div className='border-x border-t rounded-t-lg border-gray-400'>
        <AdvancementTab tabs={tabs} tabKey={tab} setTabKey={setTab} />
      </div>

      <div className='flex-auto border border-t-0 rounded-b-lg border-gray-400'>
        <AdvancementTreeView nodes={nodes} root={tab} isDone={isDone} onHover={onSelected} />
      </div>
    </div>
  )
}
