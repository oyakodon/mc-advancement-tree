import type { Meta, StoryObj } from '@storybook/react'

import { ModeToggle } from './ModeToggle'

const meta = {
  title: 'Components/Theme/ModeToggle',
  component: ModeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModeToggle>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
