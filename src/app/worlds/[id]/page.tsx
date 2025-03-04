import { Metadata } from 'next'
import { notFound } from 'next/navigation'

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
    title: world?.name || '',
  }
}

export default async function World({ params }: Props) {
  const id = (await params).id
  const world = await getWorld(id)
  const players = await getPlayers(id)

  if (!world || !players) {
    notFound()
  }

  return (
    <main className='min-h-screen flex flex-col bg-slate-50 dark:bg-slate-800'>
      <NavBar />

      <div className='lg:container lg:mx-auto p-2 gap-2 flex flex-col flex-auto'>
        <BreadcrumbNav items={[{ title: 'World' }]} />

        <div className='flex flex-col md:flex-row gap-4'>
          <div className='w-full md:w-100 md:order-1'>
            <div className=' dark:border-gray-400 md:border-l md:px-4 md:pb-16'>
              <WorldDetail world={world} />
            </div>
          </div>

          <div className='w-full'>
            <PlayerRanking players={players} world={id} />
          </div>
        </div>
      </div>
    </main>
  )
}
