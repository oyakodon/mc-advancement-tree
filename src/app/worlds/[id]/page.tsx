import { Metadata } from 'next'

import ErrorFallback from '@/components/modal/ErrorFallback'
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav'
import NavBar from '@/components/navigation/NavBar'
import PlayerRanking from '@/components/player/PlayerRanking'
import WorldDetail from '@/components/world/WorldDetail'
import { client, options } from '@/lib/hono'

const getWorld = async (id: string) => {
  const res = await client.api.v1.worlds[':id'].$get(
    {
      param: { id },
    },
    options,
  )
  return res.ok ? await res.json() : null
}

const getPlayers = async (w: string) => {
  const res = await client.api.v1.players.$get(
    {
      query: { w },
    },
    options,
  )
  return res.ok ? (await res.json()).players : null
}

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id
  const world = await getWorld(id)

  return {
    title: `${world?.name || 'World Not Found'}`,
  }
}

export default async function World({ params }: Props) {
  const id = (await params).id
  const world = await getWorld(id)
  const players = await getPlayers(id)

  if (!world || !players) {
    return <ErrorFallback message='ワールド情報取得時にエラーが発生しました。' />
  }

  return (
    <main className='min-h-screen flex flex-col bg-slate-50 dark:bg-slate-800'>
      <NavBar href={'/'} />

      <div className='container mx-auto p-4 md:px-8'>
        <div className='pb-4'>
          <BreadcrumbNav items={[{ title: 'Home', href: '/' }, { title: 'World' }]} />
        </div>

        <div className='flex flex-col md:flex-row min-h-64'>
          <div className='w-full md:w-100 md:order-1 pb-4 md:pl-4 dark:border-gray-400 border-b md:border-b-0 md:border-l'>
            <WorldDetail world={world} />
          </div>

          <div className='flex flex-col w-full pt-4 md:p-0'>
            <span className='font-bold text-xl'>Players</span>
            <div className='flex flex-col sm:mx-4 lg:mx-16'>
              <PlayerRanking players={players} world={id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
