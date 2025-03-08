import { IconNode } from '@/model/IconNode'
import { Mappings } from '@/model/Localized'
import { ProgressEntry, ProgressRecord } from '@/model/Progress'
import { ProgressNode } from '@/model/ProgressNode'
import { AdvancementTree, ProgressTree } from '@/model/Tree'

// 進捗度0の進捗レコードを生成
const zeroProgress = (node: IconNode): ProgressEntry => {
  return {
    ...node,
    done: false,
    progress: {
      done: 0,
      total: node.metrics == 'allof' ? node.criteria.length : 1,
    },
  }
}

export const buildTree = (
  tree: AdvancementTree,
  mappings: Mappings,
  record: ProgressRecord,
): ProgressTree => {
  const nodes: ProgressNode[] = []

  // 進捗ツリーの各nodeに対応する進捗レコードがあれば、合成。なければ、done: 0の進捗レコードを返す
  for (const node of tree.nodes) {
    const r = record.records.find((e) => e.key == node.key) || zeroProgress(node)
    const p: ProgressNode = {
      ...node,
      ...r,
      ...mappings.mappings[node.key],
    }

    nodes.push(p)
  }

  const categories = record.categories.map((c) => ({
    ...c,
    ...mappings.mappings[c.root],
  }))

  // TODO: hiddenの場合の処理, テスト実装

  return {
    categories,
    nodes,
    progress: record.progress,
  }
}
