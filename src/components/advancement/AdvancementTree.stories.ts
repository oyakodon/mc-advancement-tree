import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import AdvancementTree from './AdvancementTree'

import { LocalizedNode } from '@/model/ProgressNode'

const meta = {
  title: 'Components/Advancement/AdvancementTree',
  component: AdvancementTree,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AdvancementTree>

export default meta

type Story = StoryObj<typeof meta>

const mappings: Record<string, { title: string; description: string }> = {
  'minecraft:story/root': {
    title: 'Minecraft',
    description: 'ゲームのストーリーと核心',
  },
  'minecraft:adventure/root': {
    title: '冒険',
    description: '冒険、探索、戦闘',
  },
  'minecraft:end/root': {
    title: 'ジ・エンド',
    description: 'それともはじまり？',
  },
  'minecraft:husbandry/root': {
    title: '農業',
    description: 'この世界は友達と食べ物でいっぱいです',
  },
  'minecraft:nether/root': {
    title: 'ネザー',
    description: '夏服を持って来る',
  },
}

const nodes: Record<string, LocalizedNode> = {
  'minecraft:story/root': {
    key: 'minecraft:story/root',
    ...mappings['minecraft:story/root'],
    children: [],
    criteria: [
      {
        id: 'crafting_table',
        done: '2025-01-23T04:56:12Z',
      },
    ],
    hidden: false,
    iconUrl: 'https://dendro-assets.oykdn.work/block/32/grass_block.png',
    metrics: 'allof',
    type: 'task',
  },
  'minecraft:adventure/root': {
    key: 'minecraft:adventure/root',
    ...mappings['minecraft:adventure/root'],
    children: [],
    criteria: [
      {
        id: 'killed_by_something',
        done: '2025-01-23T04:56:12Z',
      },
      {
        id: 'killed_something',
        done: '2025-01-23T04:56:12Z',
      },
    ],
    hidden: false,
    iconUrl: 'https://dendro-assets.oykdn.work/item/32/map.png',
    metrics: 'anyof',
    type: 'task',
  },
}

export const Primary: Story = {
  args: {
    categories: [
      {
        root: 'minecraft:story/root',
        title: 'Minecraft',
        description: 'ゲームのストーリーと核心',
      },
    ],
    isDone: ({}) => true,
    onSelected: fn(),
    nodes: { 'minecraft:story/root': nodes['minecraft:story/root'] },
  },
}

export const MultiCategory: Story = {
  args: {
    categories: [
      {
        root: 'minecraft:story/root',
        ...mappings['minecraft:story/root'],
      },
      {
        root: 'minecraft:adventure/root',
        ...mappings['minecraft:adventure/root'],
      },
    ],
    isDone: ({}) => false,
    onSelected: fn(),
    nodes: {
      'minecraft:story/root': nodes['minecraft:story/root'],
      'minecraft:adventure/root': nodes['minecraft:adventure/root'],
    },
  },
}
