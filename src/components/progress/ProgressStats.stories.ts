import type { Meta, StoryObj } from '@storybook/react'

import ProgressStats from './ProgressStats'

const meta = {
  title: 'Components/Progress/ProgressStats',
  component: ProgressStats,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressStats>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    progress: {
      done: 1,
      total: 2,
      achieved: '2025-01-23T04:56:12Z',
    },
  },
}

export const Empty: Story = {
  args: {
    progress: {
      done: 0,
      total: 122,
    },
  },
}
