import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { ModeToggle } from '../theme/ModeToggle'

import { LanguagePicker } from './LanguagePicker'

type Props = PropsWithChildren<{
  language?: boolean
  linkToTop?: boolean
}>

const NavBar = ({ language, linkToTop = false, children }: Props) => {
  const Icon = () => {
    return (
      <Image alt='' src={'/images/icon.svg'} width={48} height={48} decoding='async' priority />
    )
  }

  return (
    <nav className='flex items-center justify-between bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-900 py-1 px-2'>
      {(linkToTop && (
        <Link href='/'>
          <Icon />
        </Link>
      )) || <Icon />}

      {children}

      <div className='flex gap-2'>
        {language && <LanguagePicker />}
        <ModeToggle />
      </div>
    </nav>
  )
}

export default NavBar
