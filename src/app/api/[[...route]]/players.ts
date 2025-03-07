import { getRequestContext } from '@cloudflare/next-on-pages'
import { Hono } from 'hono'

import { apiCache } from './cache'
import { Keys } from './store'

import { Player, PlayerProfile } from '@/model/Player'
import { ProgressRecord } from '@/model/Progress'
import { World } from '@/model/World'

const getPlayer = async (
  c: { env: CloudflareEnv; ctx: ExecutionContext },
  id: string,
): Promise<PlayerProfile | null> =>
  await c.env.KV.get<PlayerProfile>(Keys.player(id), { type: 'json' })

const getPlayerWithProgress = async (
  c: { env: CloudflareEnv; ctx: ExecutionContext },
  world: World,
  id: string,
): Promise<Player | null> => {
  const profile = await getPlayer(c, id)
  if (!profile) {
    return null
  }

  const record = await c.env.KV.get<ProgressRecord>(Keys.record(world.id, id), {
    type: 'json',
  })
  if (!record) {
    return null
  }

  return {
    ...profile,
    online: world.players[id],
    progress: record.progress,
  }
}

export const app = new Hono()
  .get('/', apiCache(), async (c) => {
    const worldId = c.req.query('w')

    const reqCtx = getRequestContext()
    const { KV } = reqCtx.env

    const world = await KV.get<World>(Keys.world(worldId), { type: 'json' })
    if (!world) {
      return c.text('world not found', 404)
    }

    const players: Player[] = []
    for (const id in world.players) {
      const p = await getPlayerWithProgress(reqCtx, world, id)
      if (p) {
        players.push(p)
      }
    }

    players.sort((a, b) => (b.online ? 1 : 0) - (a.online ? 1 : 0) || a.name.localeCompare(b.name))

    return c.json({ players: players })
  })
  .get('/:id', apiCache(), async (c) => {
    const reqCtx = getRequestContext()
    const { id } = c.req.param()

    const player = await getPlayer(reqCtx, id)
    if (!player) {
      return c.text('player not found', 404)
    }

    return c.json(player)
  })
