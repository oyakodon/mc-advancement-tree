import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import Modal from './Modal'

interface Props {
  message: string
}

const ErrorFallback = ({ message }: Props) => {
  return (
    <Modal>
      <div role='alert' className='rounded border-s-4 border-red-500 bg-red-50 p-4'>
        <strong className='block font-bold text-xl text-red-800'>Error</strong>

        <p className='pt-4 text-sm text-red-700'>{message}</p>

        <Link href='/'>
          <div className='flex items-center text-sky-600 py-2'>
            <span className='text-sm pt-[1]'>トップに戻る</span>
            <ChevronRight className='size-6' />
          </div>
        </Link>
      </div>
    </Modal>
  )
}

export default ErrorFallback
