import type { Meta, StoryObj } from '@storybook/react'

import WorldDetail from './WorldDetail'

const meta = {
  title: 'Components/World/WorldDetail',
  component: WorldDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WorldDetail>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    world: {
      id: '1',
      name: 'Hoge',
      motd: 'A Minecraft Server',
      active: true,
      version: '1.20.4',
      players: {
        'f320580d-e221-4254-9fdd-7b68d455d038': true,
        '069a79f4-44e9-4726-a5be-fca90e38aaf5': false,
      },
    },
  },
}
