import { getRequestContext } from '@cloudflare/next-on-pages'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

import { apiCache } from './cache'
import { buildTree } from './services/tree'
import { Keys } from './store'

import { Mappings } from '@/model/Localized'
import { ProgressRecord } from '@/model/Progress'
import { AdvancementTree } from '@/model/Tree'
import { World } from '@/model/World'

const DEFAULT_LANG = 'en'

// 進捗ツリーと翻訳を取得・いずれかが存在しなければnull
const getTree = async (
  c: {
    env: CloudflareEnv
  },
  version: string,
  lang: string,
): Promise<{ tree: AdvancementTree; mappings: Mappings } | null> => {
  const { treeKey, mappingKey } = Keys.seed(version, lang)
  const tree = await c.env.KV.get<AdvancementTree>(treeKey, { type: 'json' })
  const mappings = await c.env.KV.get<Mappings>(mappingKey, { type: 'json' })

  if (!tree || !mappings) {
    return null
  }

  return { tree, mappings }
}

export const app = new Hono().get(
  '/',
  apiCache(),
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
    const world = await KV.get<World>(Keys.world(worldId), { type: 'json' })
    if (!world) {
      return c.text('world not found', 404)
    }

    // プレイヤーの進捗レコードを取得
    const record = await KV.get<ProgressRecord>(Keys.record(worldId, playerId), { type: 'json' })
    if (!record) {
      return c.text('record not found', 404)
    }

    // 進捗ツリーと翻訳を取得
    let seed = await getTree(reqCtx, world.version, lang)
    if (!seed) {
      // 該当するバージョンが存在しなければ、fallbackバージョンのものを採用
      const fallback = await KV.get<{ version: string }>(Keys.seedFallback, { type: 'json' })
      if (fallback) {
        seed = await getTree(reqCtx, fallback.version, lang)
      }
    }
    if (!seed) {
      console.error(`seed not found: world=v${world.version}, lang=${lang}`)
      return c.text('internal server error: seed not found', 500)
    }

    // 進捗ツリー・翻訳・進捗レコードを合成してレスポンスを生成
    return c.json(buildTree(seed.tree, seed.mappings, record))
  },
)
