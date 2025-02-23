import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import { app as players } from './players'
import { app as tree } from './tree'
import { app as worlds } from './worlds'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const route = app.route('/v1/worlds', worlds).route('/v1/players', players).route('/v1/tree', tree)

export type AppType = typeof route

export const GET = handle(app)
