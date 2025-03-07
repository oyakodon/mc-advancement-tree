import { cache as honoCache } from 'hono/cache'

const cache = (maxAge: number) =>
  honoCache({
    cacheName: 'dendrogram',
    cacheControl: `max-age=${maxAge}`,
    wait: true,
  })

export const apiCache = () => cache(parseInt(process.env.CACHE_MAX_AGE || '60'))
