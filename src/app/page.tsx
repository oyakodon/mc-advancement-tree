import { Metadata } from 'next'
import Image from 'next/image'

import Alert from '@/components/Alert'
import WorldList from '@/components/world/WorldList'
import { client } from '@/lib/hono'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

const getWorlds = async () => {
  const res = await client.api.v1.worlds.$get().catch((err) => {
    console.error(err)
    return null
  })
  if (!res?.ok) return null

  return (await res.json()).worlds.toSorted((a, b) => a.id.localeCompare(b.id))
}

export const metadata: Metadata = {
  title: 'Worlds',
}

export default async function Home() {
  const worlds = await getWorlds()

  return (
    <main className='min-h-screen bg-slate-50 dark:bg-slate-800'>
      <section className="bg-center bg-no-repeat bg-[url('/images/background.png')] bg-gray-400 bg-blend-multiply">
        <div className='px-4 mx-auto max-w-screen-xl py-16'>
          <div className='flex items-center gap-2'>
            <Image
              alt=''
              src={'/images/icon.svg'}
              width={48}
              height={48}
              decoding='async'
              priority
            />

            <h1 className='text-xl font-extrabold tracking-tight leading-none text-white md:text-2xl lg:text-3xl'>
              Advancements
            </h1>
          </div>
        </div>
      </section>

      <div className='container p-6 sm:mx-auto'>
        {(worlds && <WorldList worlds={worlds} />) || (
          <Alert
            title='Error'
            message='ワールド一覧の取得時にエラーが発生しました。 / An error occurred while retrieving Worlds.'
            type='error'
            hideLink
          />
        )}
      </div>
    </main>
  )
}
