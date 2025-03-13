import type { Meta, StoryObj } from '@storybook/react'

import ja_jp from '../../../.test/ja_jp.json'
import nodes from '../../../.test/nodes.json'

import ProgressDetail from './ProgressDetail'

import { Criterion } from '@/model/Advancement'
import { IconNode } from '@/model/IconNode'
import { LocalizedContent } from '@/model/Localized'
import { ProgressNode } from '@/model/ProgressNode'

const meta = {
  title: 'Components/Progress/ProgressDetail',
  component: ProgressDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressDetail>

export default meta

type Story = StoryObj<typeof meta>

const mock = (node: IconNode, done: boolean): Record<string, ProgressNode> => {
  const count = node.metrics === 'anyof' ? 1 : node.criteria.length
  const criteria = node.criteria.map((c) => ({ id: c.id }) as Criterion)

  if (done !== (node.metrics === 'allof') && criteria.length > 1) {
    criteria[Math.floor(criteria.length / 2)].done = '2025-01-23T04:56:12Z'
  }
  if (done && (node.metrics === 'allof' || criteria.length === 1)) {
    for (const c of criteria) {
      c.done = '2025-01-23T04:56:12Z'
    }
  }

  return {
    [node.key]: {
      ...node,
      ...(ja_jp as Record<string, LocalizedContent>)[node.key],
      criteria,
      done,
      progress: {
        done: criteria.filter((c) => c.done).length,
        total: count,
        achieved: '2025-01-23T04:56:12Z',
      },
    },
  }
}

export const TaskCompleted: Story = {
  args: {
    selected: 'minecraft:husbandry/leash_all_frog_variants',
    nodes: {
      ...mock(nodes['minecraft:husbandry/leash_all_frog_variants'] as IconNode, true),
    },
  },
}

export const TaskIncomplete: Story = {
  args: {
    selected: 'minecraft:husbandry/leash_all_frog_variants',
    nodes: {
      ...mock(nodes['minecraft:husbandry/leash_all_frog_variants'] as IconNode, false),
    },
  },
}

export const TaskCompletedAnyof: Story = {
  args: {
    selected: 'minecraft:adventure/kill_a_mob',
    nodes: {
      ...mock(nodes['minecraft:adventure/kill_a_mob'] as IconNode, true),
    },
  },
}

export const TaskIncompleteAnyof: Story = {
  args: {
    selected: 'minecraft:adventure/kill_a_mob',
    nodes: {
      ...mock(nodes['minecraft:adventure/kill_a_mob'] as IconNode, false),
    },
  },
}

export const GoalIncomplete: Story = {
  args: {
    selected: 'minecraft:end/dragon_breath',
    nodes: {
      ...mock(nodes['minecraft:end/dragon_breath'] as IconNode, false),
    },
  },
}

export const ChallengeCompleted: Story = {
  args: {
    selected: 'minecraft:adventure/adventuring_time',
    nodes: {
      ...mock(nodes['minecraft:adventure/adventuring_time'] as IconNode, true),
    },
  },
}
