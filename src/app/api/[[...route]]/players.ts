import { getRequestContext } from '@cloudflare/next-on-pages'
import { Hono } from 'hono'
import { cache } from 'hono/cache'

import { getOrFetch } from './store'

import { Player, PlayerProfile } from '@/model/Player'
import { ProgressRecord } from '@/model/Progress'
import { World } from '@/model/World'

const PLAYER_CACHE_TTL = 24 * 60 * 60 // FIXME: process.env
const PREFIX_PLAYER_CACHE = 'cache:player'

const CACHE_CONTROL_MAX_AGE = 60 // FIXME: process.env
const PLAYER_CACHE_CONTROL_MAX_AGE = 60 * 60 // FIXME: process.env

type MinecraftProfile = {
  id: string
  name: string
}

const fetchPlayerProfile = async (id: string) => {
  const res = await fetch(`https://api.minecraftservices.com/minecraft/profile/lookup/${id}`)
  if (!res.ok) {
    return null
  }
  const profile = (await res.json()) as MinecraftProfile
  return {
    id: id,
    name: profile.name,
  }
}

const getPlayer = async (
  c: { env: CloudflareEnv; ctx: ExecutionContext },
  id: string,
): Promise<PlayerProfile | null> =>
  getOrFetch<MinecraftProfile>(
    c,
    `${PREFIX_PLAYER_CACHE}:${id}`,
    () => fetchPlayerProfile(id),
    PLAYER_CACHE_TTL,
  )

const getPlayerWithProgress = async (
  c: { env: CloudflareEnv; ctx: ExecutionContext },
  world: World,
  id: string,
): Promise<Player | null> => {
  const profile = await getPlayer(c, id)
  if (!profile) {
    return null
  }

  const key = `record:${world.id}:${id}`
  const record = await c.env.KV.get<ProgressRecord>(key, { type: 'json' })
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
  .get(
    '/',
    cache({
      cacheName: 'dendrogram',
      cacheControl: `max-age=${CACHE_CONTROL_MAX_AGE}`,
      wait: true,
    }),
    async (c) => {
      const worldId = c.req.query('w')

      const reqCtx = getRequestContext()
      const { KV } = reqCtx.env

      const world = await KV.get<World>(`world:${worldId}`, { type: 'json' })
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

      players.sort(
        (a, b) => (b.online ? 1 : 0) - (a.online ? 1 : 0) || a.name.localeCompare(b.name),
      )

      return c.json({ players: players })
    },
  )
  .get(
    '/:id',
    cache({
      cacheName: 'dendrogram',
      cacheControl: `max-age=${PLAYER_CACHE_CONTROL_MAX_AGE}`,
      wait: true,
    }),
    async (c) => {
      const reqCtx = getRequestContext()
      const { id } = c.req.param()

      const player = await getPlayer(reqCtx, id)
      if (!player) {
        return c.text('player not found', 404)
      }

      return c.json(player)
    },
  )
