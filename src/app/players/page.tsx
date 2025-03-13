import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import BreadcrumbNav from '@/components/navigation/BreadcrumbNav'
import NavBar from '@/components/navigation/NavBar'
import PlayerProgress from '@/components/progress/PlayerProgress'
import ProgressDashboard from '@/components/progress/ProgressDashboard'
import { client, options } from '@/lib/hono'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

const paramSchema = z.object({
  w: z.coerce.string(),
  p: z.coerce.string(),
  lang: z.coerce.string().optional(),
})

type Param = z.infer<typeof paramSchema>

const getPlayer = async ({ p: id }: { p: string }) => {
  const res = await client.api.v1.players[':id'].$get(
    {
      param: { id },
    },
    options,
  )
  return res.ok ? await res.json() : null
}

const getTree = async ({ w, p, lang }: Param) => {
  const res = await client.api.v1.tree.$get(
    {
      query: { w, p, lang },
    },
    options,
  )
  return res.ok ? await res.json() : null
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const parsed = paramSchema.safeParse(await searchParams)
  const player = parsed.success ? await getPlayer(parsed.data) : null

  return {
    title: player?.name || '',
  }
}

const navItems = (worldId: string, name: string) => [
  { title: 'World', href: `/worlds/${worldId}` },
  { title: name },
]

export default async function Player({ searchParams }: Props) {
  const parsed = paramSchema.safeParse(await searchParams)
  const player = parsed.success ? await getPlayer(parsed.data) : null
  const tree = parsed.success ? await getTree(parsed.data) : null

  if (!parsed.success || !player || !tree) {
    notFound()
  }

  return (
    <main className='flex flex-col h-screen bg-slate-50 dark:bg-slate-800 '>
      <NavBar language />

      <div className='lg:container lg:mx-auto p-2 flex flex-auto'>
        <div className='flex flex-col flex-auto gap-2'>
          <BreadcrumbNav items={navItems(parsed.data.w, player.name)} />
          <PlayerProgress player={player} progress={tree.progress} />
          <ProgressDashboard tree={tree} />
        </div>
      </div>
    </main>
  )
}
