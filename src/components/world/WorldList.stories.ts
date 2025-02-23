import type { Meta, StoryObj } from '@storybook/react'

import WorldList from './WorldList'

import { World } from '@/model/World'

const meta = {
  title: 'Components/World/WorldList',
  component: WorldList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WorldList>

export default meta

type Story = StoryObj<typeof meta>

const mock = (id: string, name: string, active: boolean = true): World => {
  return {
    id,
    name,
    motd: 'A Minecraft Server',
    active,
    version: '1.20.4',
    players: {
      'f320580d-e221-4254-9fdd-7b68d455d038': true,
      '069a79f4-44e9-4726-a5be-fca90e38aaf5': false,
    },
  }
}

export const Primary: Story = {
  args: {
    worlds: [mock('1', 'Hoge'), mock('2', 'Fuga'), mock('3', 'Piyo')],
  },
}

export const WithLink: Story = {
  args: {
    worlds: [mock('1', 'Server')],
    href: (w) => `/${w.id}`,
  },
}
