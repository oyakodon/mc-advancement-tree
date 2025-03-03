import type { Meta, StoryObj } from '@storybook/react'

import Alert from './Alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'タイトル',
    message: 'メッセージだよ',
  },
}

export const Error: Story = {
  args: {
    title: 'タイトル',
    message: 'メッセージだよ',
    type: 'error',
  },
}

export const Warning: Story = {
  args: {
    title: 'タイトル',
    message: '警告メッセージだよ',
    type: 'warning',
  },
}

export const Info: Story = {
  args: {
    title: 'タイトル',
    message: '情報メッセージだよ',
    type: 'info',
  },
}

export const HideLink: Story = {
  args: {
    title: 'タイトル',
    message: 'リンクは表示されないはずだよ',
    hideLink: true,
  },
}
