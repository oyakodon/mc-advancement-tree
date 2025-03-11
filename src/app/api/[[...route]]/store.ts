export class Keys {
  static world(id: string = '') {
    return `world:${id}`
  }

  static player(id: string) {
    return `player:${id}`
  }

  static record(w: string, p: string) {
    return `record:${w}:${p}`
  }

  static seed(version: string, lang: string): { treeKey: string; mappingKey: string } {
    return {
      treeKey: `seed:tree:${version}`,
      mappingKey: `seed:lang:${version}:${lang}`,
    }
  }

  static seedFallback = 'fallback'
}

export type KVMetadata = {
  updated: string
}

export const updateStore = async (
  c: { env: CloudflareEnv },
  key: string,
  value: unknown,
  ttl?: number,
) => {
  const metadata: KVMetadata = {
    updated: new Date().toISOString(),
  }

  const options: KVNamespacePutOptions = {
    metadata: metadata,
  }
  if (ttl) {
    options.expirationTtl = ttl
  }

  await c.env.KV.put(key, JSON.stringify(value), options)
}

export const getOrFetch = async <T>(
  c: { env: CloudflareEnv; ctx: ExecutionContext },
  key: string,
  f: () => Promise<T | null>,
  ttl?: number,
) => {
  const cache = await c.env.KV.get<T>(key, {
    type: 'json',
  })
  if (cache) {
    return cache
  }

  const value = await f()
  if (value) {
    c.ctx.waitUntil(updateStore(c, key, value, ttl))
    return value
  }

  return null
}
