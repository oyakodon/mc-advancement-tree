import { ChevronRight, CircleAlert, Info, TriangleAlert } from 'lucide-react'
import Link from 'next/link'

interface Props {
  title: string
  message: string
  type?: 'info' | 'warning' | 'error'
  hideLink?: boolean
}

const colors = {
  error: ['bg-red-50', 'border-red-500', 'text-red-800', 'text-red-700'],
  warning: ['bg-amber-50', 'border-amber-500', 'text-amber-800', 'text-amber-700'],
  info: ['bg-sky-50', 'border-sky-500', 'text-sky-800', 'text-sky-700'],
}

const AlertIcon = ({ type, size }: { type: 'info' | 'warning' | 'error'; size: number }) => {
  switch (type) {
    case 'error':
      return <CircleAlert size={size} />
    case 'warning':
      return <TriangleAlert size={size} />
    case 'info':
      return <Info size={size} />
  }
}

const Alert = ({ title, message, type = 'warning', hideLink = false }: Props) => {
  const [bg, border, ct, cm] = colors[type]

  return (
    <div role='alert' className={`rounded-md ${bg} border-s-10 ${border} px-2 py-4 m-4`}>
      <div className={`flex items-center ${ct}`}>
        <div className={`flex justify-center w-8`}>
          <AlertIcon type={type} size={24} />
        </div>
        <strong className={'font-bold text-lg'}>{title}</strong>
      </div>

      <div className='ms-8'>
        <p className={`py-2 text-sm ${cm}`}>{message}</p>

        {!hideLink && (
          <div role='link' className='flex'>
            <Link href='/'>
              <div className='flex items-center text-sky-600 hover:underline'>
                <span className='text-sm pt-[1]'>Back</span>
                <ChevronRight size={20} />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Alert
