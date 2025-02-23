import { getRequestContext } from '@cloudflare/next-on-pages'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { cache } from 'hono/cache'
import { z } from 'zod'

import { IconNode } from '@/model/IconNode'
import { LocalizedContent, Mappings } from '@/model/Localized'
import { ProgressEntry, ProgressRecord } from '@/model/Progress'
import { ProgressNode } from '@/model/ProgressNode'
import { AdvancementTree, ProgressTree } from '@/model/Tree'
import { World } from '@/model/World'

const CACHE_CONTROL_MAX_AGE = 60 // FIXME: process.env

const DEFAULT_LANG = 'en'

// 進捗ツリーと翻訳を取得・いずれかが存在しなければnull
const getTree = async (
  c: {
    env: CloudflareEnv
  },
  version: string,
  lang: string,
): Promise<{ tree: AdvancementTree; mappings: Record<string, LocalizedContent> } | null> => {
  const tree = await c.env.KV.get<AdvancementTree>(`seed:tree:${version}`, { type: 'json' })
  const mappings = await c.env.KV.get<Mappings>(`seed:lang:${version}:${lang}`, { type: 'json' })

  if (!tree || !mappings) {
    return null
  }

  return { tree, mappings: mappings.mappings }
}

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

export const app = new Hono().get(
  '/',
  cache({
    cacheName: 'dendrogram',
    cacheControl: `max-age=${CACHE_CONTROL_MAX_AGE}`,
    wait: true,
  }),
  zValidator(
    'query',
    z.object({
      w: z.string(),
      p: z.string(),
      lang: z.string().default(DEFAULT_LANG),
    }),
  ),
  async (c) => {
    const reqCtx = getRequestContext()
    const { KV } = reqCtx.env
    const { w: worldId, p: playerId, lang } = c.req.valid('query')

    if (!worldId || !playerId) {
      return c.text('invalid query', 400)
    }

    // バージョン情報が知りたいのでWorldを取得
    const world = await KV.get<World>(`world:${worldId}`, { type: 'json' })
    if (!world) {
      return c.text('world not found', 404)
    }

    // プレイヤーの進捗レコードを取得
    const record = await KV.get<ProgressRecord>(`record:${worldId}:${playerId}`, { type: 'json' })
    if (!record) {
      return c.text('record not found', 404)
    }

    // 進捗ツリーと翻訳を取得
    let result = await getTree(reqCtx, world.version, lang)
    if (!result) {
      // 該当するバージョンが存在しなければ、fallbackバージョンのものを採用
      const fallback = await KV.get<{ version: string }>('seed:tree:fallback', { type: 'json' })
      if (fallback) {
        result = await getTree(reqCtx, fallback.version, lang)
      }
    }
    if (!result) {
      console.error(`seed not found: world=v${world.version}, lang=${lang}`)
      return c.text('internal server error: seed not found', 500)
    }

    // 進捗ツリー・翻訳・進捗レコードを合成してレスポンスを生成
    const { tree, mappings } = result
    const nodes: ProgressNode[] = []

    // 進捗ツリーの各nodeに対応する進捗レコードがあれば、合成。なければ、done: 0の進捗レコードを返す
    for (const node of tree.nodes) {
      const r = record.records.find((e) => e.key == node.key) || zeroProgress(node)
      const p: ProgressNode = {
        ...node,
        ...r,
        ...mappings[node.key],
      }

      nodes.push(p)
    }

    const categories = record.categories.map((c) => ({
      ...c,
      ...mappings[c.root],
    }))

    // TODO: hiddenの場合の処理, seed追加して各パターンチェック, テスト実装

    return c.json({
      categories,
      nodes,
      progress: record.progress,
    } satisfies ProgressTree)
  },
)
