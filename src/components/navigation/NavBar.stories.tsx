import type { Meta, StoryObj } from '@storybook/react'

import NavBar from './NavBar'

const meta = {
  title: 'Components/Navigation/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavBar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const UseLanguage: Story = {
  args: {
    language: true,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export const HideLink: Story = {
  args: {
    hideLink: true,
  },
}

export const WithChildren: Story = {
  args: {
    children: <div>Content</div>,
  },
}
