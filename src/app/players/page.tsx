import { Metadata } from 'next'
import { z } from 'zod'

import ErrorFallback from '@/components/modal/ErrorFallback'
import NavBar from '@/components/navigation/NavBar'
import PlayerProgress from '@/components/progress/PlayerProgress'
import ProgressDashboard from '@/components/progress/ProgressDashboard'
import { client, options } from '@/lib/hono'

const getPlayer = async ({ p: id }: { p: string }) => {
  const res = await client.api.v1.players[':id'].$get(
    {
      param: { id },
    },
    options,
  )
  return res.ok ? await res.json() : null
}

const getTree = async ({ w, p, lang }: { w: string; p: string; lang?: string }) => {
  const res = await client.api.v1.tree.$get(
    {
      query: { w, p, lang: lang || 'ja_jp' },
    },
    options,
  )
  return res.ok ? await res.json() : null
}

const schema = z.object({
  w: z.coerce.string(),
  p: z.coerce.string(),
  lang: z.coerce.string().optional(),
})

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const parsed = schema.safeParse(await searchParams)
  const player = parsed.success ? await getPlayer(parsed.data) : null

  return {
    title: `${player?.name || 'Player Not Found'}`,
  }
}

export default async function Player({ searchParams }: Props) {
  const parsed = schema.safeParse(await searchParams)
  const player = parsed.success ? await getPlayer(parsed.data) : null
  const tree = parsed.success ? await getTree(parsed.data) : null

  if (!parsed.success || !player || !tree) {
    return <ErrorFallback message='進捗情報取得時にエラーが発生しました。' />
  }

  return (
    <main className='flex flex-col h-screen bg-slate-50 dark:bg-slate-800 '>
      <NavBar href={`/worlds/${parsed.data.w}`} />

      <div className='lg:container lg:mx-auto p-2 pt-0 flex flex-auto'>
        <div className='flex flex-col flex-auto'>
          <PlayerProgress player={player} progress={tree.progress} />
          <ProgressDashboard tree={tree} />
        </div>
      </div>
    </main>
  )
}
