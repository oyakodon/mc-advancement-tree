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

const DEFAULT_LANG = process.env.DEFAULT_LANG || 'en_us'

// 進捗ツリーと翻訳を取得・いずれかが存在しなければnull
const getTree = async (
  c: { env: CloudflareEnv },
  version: string,
  lang: string,
): Promise<{ tree: AdvancementTree; mappings: Mappings } | null> => {
  const { treeKey, mappingKey } = Keys.seed(version, lang)
  const tree = await c.env.KV.get<AdvancementTree>(treeKey, { type: 'json' })
  const mappings = await c.env.KV.get<Mappings>(mappingKey, { type: 'json' })

  return tree && mappings ? { tree, mappings } : null
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
      reveal: z.coerce.boolean().default(false),
    }),
  ),
  async (c) => {
    const reqCtx = getRequestContext()
    const { KV } = reqCtx.env
    const { w: worldId, p: playerId, lang, reveal } = c.req.valid('query')

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
    const seed =
      (await getTree(reqCtx, world.version, lang)) ??
      (await getTree(reqCtx, Keys.seedFallback, lang))
    if (!seed) {
      console.error(`seed not found and fallback failed: v${world.version}, lang=${lang}`)
      return c.text('internal server error: seed not found', 500)
    }

    // 進捗ツリー・翻訳・進捗レコードを合成してレスポンスを生成
    return c.json(buildTree({ ...seed, record, reveal }))
  },
)
