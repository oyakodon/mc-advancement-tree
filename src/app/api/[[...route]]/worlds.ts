import { getRequestContext } from '@cloudflare/next-on-pages'
import { Hono } from 'hono'

import { apiCache } from './cache'
import { getOrFetch, Keys } from './store'

import { World } from '@/model/World'

const WORLDS_TTL = 60 * 60
const WORLDS_CACHE_KEY = 'cache:worlds'

// worldのidをKVから取得
const getWorldIds = async (c: { env: CloudflareEnv; ctx: ExecutionContext }) =>
  (await getOrFetch(
    c,
    WORLDS_CACHE_KEY,
    async () => {
      // KVに存在しなければ、list
      const result = await c.env.KV.list({
        prefix: Keys.world(),
      })
      return result.keys.map((item) => item.name)
    },
    WORLDS_TTL,
  )) ?? []

export const app = new Hono()
  .get('/', apiCache(), async (c) => {
    const reqCtx = getRequestContext()
    const { KV } = reqCtx.env

    // world情報を取得
    const worldIds = await getWorldIds(reqCtx)

    const worlds: World[] = []
    for (const id of worldIds) {
      const world = await KV.get<World>(id, { type: 'json' })
      if (world) {
        worlds.push(world)
      }
    }

    const sorted = worlds.toSorted(
      (a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0) || a.name.localeCompare(b.name),
    )

    return c.json({
      worlds: sorted,
    })
  })
  .get('/:id', apiCache(), async (c) => {
    const reqCtx = getRequestContext()
    const { id } = c.req.param()
    const { KV } = reqCtx.env

    const world = await KV.get<World>(Keys.world(id), { type: 'json' })
    if (!world) {
      return c.text('world not found', 404)
    }

    return c.json(world)
  })
