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
  reveal: boolean = false,
): ProgressTree => {
  const nodes: ProgressNode[] = []

  // 進捗ツリーの各nodeに対応する進捗レコードがあれば、合成。なければ、done: 0の進捗レコードを返す
  for (const node of tree.nodes) {
    const r = record.records.find((e) => e.key == node.key) || zeroProgress(node)

    // 未達成の隠し実績は revealがtrueでない限り、返さない
    if (node.hidden && !r.done && !reveal) {
      continue
    }

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

  return {
    categories,
    nodes,
    progress: record.progress,
  }
}
