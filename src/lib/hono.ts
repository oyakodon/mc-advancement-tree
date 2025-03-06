import { ClientRequestOptions, hc } from 'hono/client'

import { type AppType } from '@/app/api/[[...route]]/route'

export const client = hc<AppType>(process.env.CF_PAGES_URL!)

export const options: ClientRequestOptions = {
  init: {
    cf: {
      cacheEverything: true,
    },
  },
}
