import type { Meta, StoryObj } from '@storybook/react'

import BreadcrumbNav from './BreadcrumbNav'

const meta = {
  title: 'Components/Navigation/BreadcrumbNav',
  component: BreadcrumbNav,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BreadcrumbNav>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    items: [
      {
        title: 'A',
        href: '/a',
      },
    ],
  },
}
