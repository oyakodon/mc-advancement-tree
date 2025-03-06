'use client'

import { useEffect } from 'react'

import Alert from '@/components/Alert'
import NavBar from '@/components/navigation/NavBar'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className='flex flex-col h-screen bg-slate-50 dark:bg-slate-800 '>
      <title>Error</title>

      <NavBar />

      <div className='lg:container lg:mx-auto p-2 flex flex-auto'>
        <div className='flex flex-col flex-auto'>
          <Alert
            title='Error'
            message='何らかのエラーが発生しました。 / Something went wrong!'
            type='error'
            hideLink
          />
        </div>
      </div>
    </main>
  )
}
