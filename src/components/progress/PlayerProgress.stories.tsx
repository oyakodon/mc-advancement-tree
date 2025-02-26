import type { Meta, StoryObj } from '@storybook/react'

import PlayerProgress from './PlayerProgress'

const meta = {
  title: 'Components/Progress/PlayerProgress',
  component: PlayerProgress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlayerProgress>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    player: {
      id: 'f320580d-e221-4254-9fdd-7b68d455d038',
      name: 'Oyakodon921',
    },
    progress: {
      done: 122,
      total: 122,
      achieved: '2025-01-23T04:56:12Z',
    },
  },
}
