import { Metadata } from 'next'

import WorldList from '@/components/world/WorldList'
import { client, options } from '@/lib/hono'

const getWorlds = async () => {
  const res = await client.api.v1.worlds.$get({ options })
  if (!res.ok) return null

  return (await res.json()).worlds.toSorted((a, b) => a.id.localeCompare(b.id))
}

export const metadata: Metadata = {
  title: 'Worlds',
}

export default async function Home() {
  const worlds = await getWorlds()

  return (
    <main className='min-h-screen bg-slate-200 dark:bg-gray-800'>
      <div className='container p-6 sm:mx-auto'>{worlds && <WorldList worlds={worlds} />}</div>
    </main>
  )
}
