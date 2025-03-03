import Alert from '@/components/Alert'
import NavBar from '@/components/navigation/NavBar'

export default function NotFound() {
  return (
    <main className='flex flex-col h-screen bg-slate-50 dark:bg-slate-800 '>
      <title>404 Not Found</title>

      <NavBar linkToTop />

      <div className='lg:container lg:mx-auto p-2 flex flex-auto'>
        <div className='flex flex-col flex-auto'>
          <Alert
            title='404 Not Found'
            message='ページが見つかりませんでした。 / The requested page was not found.'
            type='error'
          />
        </div>
      </div>
    </main>
  )
}
