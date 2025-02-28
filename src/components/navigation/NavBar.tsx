import Image from 'next/image'
import { PropsWithChildren } from 'react'

import { ModeToggle } from '../theme/ModeToggle'

import { LanguagePicker } from './LanguagePicker'

type Props = PropsWithChildren<{
  language?: boolean
}>

const NavBar = ({ language, children }: Props) => {
  return (
    <nav className='flex items-center justify-between bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-900 py-1 px-2'>
      <Image alt='' src={'/images/icon.svg'} width={48} height={48} decoding='async' priority />

      {children}

      <div className='flex gap-2'>
        {language && <LanguagePicker />}
        <ModeToggle />
      </div>
    </nav>
  )
}

export default NavBar
