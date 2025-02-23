import type { Meta, StoryObj } from '@storybook/react'

import { NavBar } from './NavBar'

const meta = {
  title: 'Components/Generic/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavBar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const WithLink: Story = {
  args: {
    href: '/',
  },
}

export const WithChildren: Story = {
  args: {
    children: <div>Content</div>,
  },
}
