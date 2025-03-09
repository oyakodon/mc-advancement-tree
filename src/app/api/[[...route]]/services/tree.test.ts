import { expect, test } from 'vitest'

import { buildTree } from './tree'

import { IconNode } from '@/model/IconNode'
import { Mappings } from '@/model/Localized'
import { ProgressRecord } from '@/model/Progress'
import { AdvancementTree } from '@/model/Tree'

const mockTask = (key: string, multipleCriteria: boolean, metrics: 'oneof' | 'allof'): IconNode => {
  return {
    key: key,
    criteria: multipleCriteria ? [{ id: 'one' }, { id: 'two' }, { id: 'three' }] : [{ id: 'one' }],
    children: [],
    hidden: false,
    iconUrl: '',
    metrics,
    type: 'task',
  }
}

const taskSingle = (key: string): IconNode => mockTask(key, false, 'allof')

test('seed:treeとProgressRecordの合成', () => {
  const seed: AdvancementTree = {
    categories: [],
    nodes: [taskSingle('1')],
  }

  const record: ProgressRecord = {
    categories: [],
    progress: {
      done: 1,
      total: 1,
      achieved: '2025-01-23T04:56:00Z',
    },
    records: [
      {
        key: '1',
        done: true,
        criteria: [
          {
            id: 'one',
            done: '2025-01-23T04:56:00Z',
          },
        ],
        progress: {
          done: 1,
          total: 1,
          achieved: '2025-01-23T04:56:00Z',
        },
      },
    ],
  }

  const tree = buildTree(seed, { mappings: {} }, record)

  expect(tree.nodes.find((n) => n.key === '1')).toMatchObject(
    record.records.find((r) => r.key === '1')!,
  )
})

test('treeのprogressはrecordと同一', () => {
  const seed: AdvancementTree = {
    categories: [],
    nodes: [],
  }

  const record: ProgressRecord = {
    categories: [],
    progress: {
      done: 0,
      total: 1,
    },
    records: [],
  }

  const tree = buildTree(seed, { mappings: {} }, record)

  expect(tree.progress).toBe(record.progress)
})

test('progressがない場合、空のProgressを返す', () => {
  const record: ProgressRecord = {
    categories: [],
    progress: {
      done: 0,
      total: 1,
    },
    records: [],
  }

  const oneof = buildTree(
    {
      categories: [],
      nodes: [mockTask('1', true, 'oneof')],
    },
    { mappings: {} },
    record,
  )

  expect(oneof.nodes.find((n) => n.key === '1')?.progress).toStrictEqual({
    done: 0,
    total: 1,
  })

  const allof = buildTree(
    {
      categories: [],
      nodes: [mockTask('1', true, 'allof')],
    },
    { mappings: {} },
    record,
  )

  expect(allof.nodes.find((n) => n.key === '1')?.progress).toStrictEqual({
    done: 0,
    total: 3,
  })
})

test('mappingからtitleとdescriptionを合成', () => {
  const record: ProgressRecord = {
    categories: [],
    progress: {
      done: 0,
      total: 1,
    },
    records: [],
  }

  const mappings: Mappings = {
    mappings: {
      '1': {
        title: 'title',
        description: 'description',
      },
    },
  }

  const tree = buildTree(
    {
      categories: [],
      nodes: [taskSingle('1')],
    },
    mappings,
    record,
  )

  expect(tree.nodes.find((n) => n.key === '1')).toMatchObject({
    title: 'title',
    description: 'description',
  })
})

test('各categoryのProgressが合成される', () => {
  const record: ProgressRecord = {
    categories: [
      {
        root: '1',
        progress: {
          done: 0,
          total: 1,
        },
      },
    ],
    progress: {
      done: 0,
      total: 1,
    },
    records: [],
  }

  const tree = buildTree(
    {
      categories: [
        {
          root: '1',
        },
      ],
      nodes: [taskSingle('1')],
    },
    { mappings: {} },
    record,
  )

  expect(tree.categories.find((c) => c.root === '1')?.progress).toStrictEqual({
    done: 0,
    total: 1,
  })
})
