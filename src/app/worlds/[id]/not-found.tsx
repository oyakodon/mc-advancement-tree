import Alert from '@/components/Alert'
import NavBar from '@/components/navigation/NavBar'

export default function NotFound() {
  return (
    <main className='flex flex-col h-screen bg-slate-50 dark:bg-slate-800 '>
      <title>World Not Found</title>

      <NavBar />

      <div className='lg:container lg:mx-auto p-2 flex flex-auto'>
        <div className='flex flex-col flex-auto'>
          <Alert
            title='World Not Found'
            message='ワールド情報の取得時にエラーが発生しました。 / An error occurred while retrieving World.'
          />
        </div>
      </div>
    </main>
  )
}
