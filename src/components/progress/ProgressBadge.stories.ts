import type { Meta, StoryObj } from '@storybook/react'

import ProgressBadge from './ProgressBadge'

const meta = {
  title: 'Components/Progress/ProgressBadge',
  component: ProgressBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Completed: Story = {
  args: {
    progress: {
      done: 1,
      total: 1,
    },
  },
}

export const Half: Story = {
  args: {
    progress: {
      done: 1,
      total: 2,
    },
  },
}

export const Initial: Story = {
  args: {
    progress: {
      done: 0,
      total: 1,
    },
  },
}
