import { expect, test } from 'vitest'

import { buildTree } from './tree'

import { IconNode } from '@/model/IconNode'
import { Mappings } from '@/model/Localized'
import { ProgressRecord } from '@/model/Progress'
import { AdvancementTree } from '@/model/Tree'

const mockTask = (
  key: string,
  multipleCriteria: boolean,
  metrics: 'anyof' | 'allof',
  hidden: boolean,
): IconNode => {
  return {
    key: key,
    criteria: multipleCriteria ? [{ id: 'one' }, { id: 'two' }, { id: 'three' }] : [{ id: 'one' }],
    children: [],
    hidden,
    iconUrl: '',
    metrics,
    type: 'task',
  }
}

const taskSingle = (key: string): IconNode => mockTask(key, false, 'allof', false)

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

  const anyof = buildTree(
    {
      categories: [],
      nodes: [mockTask('1', true, 'anyof', false)],
    },
    { mappings: {} },
    record,
  )

  expect(anyof.nodes.find((n) => n.key === '1')?.progress).toStrictEqual({
    done: 0,
    total: 1,
  })

  const allof = buildTree(
    {
      categories: [],
      nodes: [mockTask('1', true, 'allof', false)],
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

test('未達成の隠し実績は、デフォルトで除外する', () => {
  const record: ProgressRecord = {
    categories: [],
    progress: {
      done: 0,
      total: 2,
    },
    records: [],
  }

  const tree = buildTree(
    {
      categories: [],
      nodes: [mockTask('1', false, 'allof', true), mockTask('2', false, 'allof', false)],
    },
    { mappings: {} },
    record,
  )

  expect(tree.nodes.find((n) => n.key === '1')).toBeUndefined()
  expect(tree.nodes.find((n) => n.key === '2')).toBeDefined()
})

test('達成済みの隠し実績は返却する', () => {
  const record: ProgressRecord = {
    categories: [],
    progress: {
      done: 0,
      total: 2,
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

  const tree = buildTree(
    {
      categories: [],
      nodes: [mockTask('1', false, 'allof', true), mockTask('2', false, 'allof', false)],
    },
    { mappings: {} },
    record,
    false,
  )

  expect(tree.nodes.find((n) => n.key === '1')).toBeDefined()
  expect(tree.nodes.find((n) => n.key === '2')).toBeDefined()
})

test('revealが指定されていれば、未達成の隠し実績でも返却する', () => {
  const record: ProgressRecord = {
    categories: [],
    progress: {
      done: 0,
      total: 2,
    },
    records: [],
  }

  const tree = buildTree(
    {
      categories: [],
      nodes: [mockTask('1', false, 'allof', true), mockTask('2', false, 'allof', false)],
    },
    { mappings: {} },
    record,
    true,
  )

  expect(tree.nodes.find((n) => n.key === '1')).toBeDefined()
  expect(tree.nodes.find((n) => n.key === '2')).toBeDefined()
})
