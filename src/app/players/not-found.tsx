import Alert from '@/components/Alert'
import NavBar from '@/components/navigation/NavBar'

export default function NotFound() {
  return (
    <main className='flex flex-col h-screen bg-slate-50 dark:bg-slate-800 '>
      <title>Advancement Not Found</title>

      <NavBar language linkToTop />

      <div className='lg:container lg:mx-auto p-2 flex flex-auto'>
        <div className='flex flex-col flex-auto'>
          <Alert
            title='Advancement Not Found'
            message='進捗情報の取得時にエラーが発生しました。 / An error occurred while retrieving Advancements.'
          />
        </div>
      </div>
    </main>
  )
}
