import type { Meta, StoryObj } from '@storybook/react'

import ProgressDetail from './ProgressDetail'

const meta = {
  title: 'Components/Progress/ProgressDetail',
  component: ProgressDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressDetail>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    selected: 'minecraft:story/root',
    nodes: {
      'minecraft:story/root': {
        key: 'minecraft:story/root',
        title: 'Minecraft',
        description: 'ゲームのストーリーと核心',
        children: [],
        criteria: [
          {
            id: 'crafting_table',
            done: '2025-01-23T04:56:12Z',
          },
        ],
        done: true,
        hidden: false,
        iconUrl: 'https://dendro-assets.oykdn.work/block/32/grass_block.png',
        metrics: 'allof',
        progress: {
          done: 1,
          total: 1,
          achieved: '2025-01-23T04:56:12Z',
        },
        type: 'task',
      },
    },
  },
}
