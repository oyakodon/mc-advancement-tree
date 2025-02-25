import type { Meta, StoryObj } from '@storybook/react'

import PlayerList from './PlayerList'

import { Player } from '@/model/Player'

const meta = {
  title: 'Components/Player/PlayerList',
  component: PlayerList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlayerList>

export default meta

type Story = StoryObj<typeof meta>

const mock = (done: number, rank: number, online: boolean = true): Player & { rank: number } => {
  return {
    id: 'f320580d-e221-4254-9fdd-7b68d455d038',
    name: 'Oyakodon921',
    online,
    progress: {
      done,
      total: 10,
    },
    rank,
  }
}

export const Primary: Story = {
  args: {
    players: [mock(10, 1), mock(5, 2), mock(0, 3)],
  },
}

export const SingleOnline: Story = {
  args: {
    players: [mock(10, 1)],
  },
}

export const SingleOffline: Story = {
  args: {
    players: [mock(0, 1, false)],
  },
}

export const RankedInButZero: Story = {
  args: {
    players: [mock(10, 1), mock(5, 2), mock(0, 3, false)],
  },
}
