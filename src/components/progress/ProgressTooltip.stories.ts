import type { Meta, StoryObj } from '@storybook/react'

import ProgressTooltip from './ProgressTooltip'

const meta = {
  title: 'Components/Progress/ProgressTooltip',
  component: ProgressTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressTooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    progress: {
      done: 122,
      total: 122,
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
