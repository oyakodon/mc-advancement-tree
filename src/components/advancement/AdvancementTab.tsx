'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useMemo } from 'react'

const tabBorderActive = 'border-b-3 border-blue-500'
const tabBorderInactive = 'border-b border-gray-200'

export type Tab = {
  key: string
  title: string
}

const seek = (tabs: Tab[], tabKey: string, d: number): string => {
  const idx = tabs.findIndex((t) => tabKey === t.key) + d
  return tabs[Math.min(Math.max(0, idx), tabs.length - 1)].key
}

interface Props {
  tabs: Tab[]
  tabKey: string
  setTabKey: (key: string) => void
}

export default function AdvancementTab({ tabs, tabKey, setTabKey }: Props) {
  const { prev, next, selected } = useMemo(
    () => ({
      prev: seek(tabs, tabKey, -1),
      next: seek(tabs, tabKey, 1),
      selected: tabs.find((t) => tabKey === t.key)!,
    }),
    [tabs, tabKey],
  )

  return (
    <>
      <nav className='grid grid-flow-col justify-stretch pt-3 max-sm:hidden'>
        {tabs.map((t) => (
          <button
            className={`text-xl text-gray-600 hover:text-blue-500 dark:text-white focus:outline-hidden ${
              tabKey === t.key ? tabBorderActive : tabBorderInactive
            }`}
            key={t.key}
            onClick={() => {
              setTabKey(t.key)
            }}
          >
            {t.title}
          </button>
        ))}
      </nav>

      <div className={`sm:hidden flex items-center justify-between ${tabBorderActive}`}>
        <button
          className={tabKey !== prev ? 'text-cyan-500' : 'text-gray-500 dark:text-white'}
          onClick={() => {
            setTabKey(prev)
          }}
          disabled={tabKey === prev}
        >
          <ChevronLeft className='size-6 ' />
        </button>

        <span className='text-lg font-bold text-gray-500 dark:text-white'>{selected.title}</span>

        <button
          className={tabKey !== next ? 'text-cyan-500' : 'text-gray-500 dark:text-white'}
          onClick={() => {
            setTabKey(next)
          }}
          disabled={tabKey === next}
        >
          <ChevronRight className='size-6' />
        </button>
      </div>
    </>
  )
}
