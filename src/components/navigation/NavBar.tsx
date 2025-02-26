import { UrlObject } from 'url'

import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { LanguagePicker } from '../LanguagePicker'
import { ModeToggle } from '../theme/ModeToggle'

const LinkIfNeeded = (props: PropsWithChildren<{ href?: string | UrlObject }>) => {
  if (props.href) {
    return <Link href={props.href}>{props.children}</Link>
  }

  return <>{props.children}</>
}

type Props = PropsWithChildren<{
  href?: string | UrlObject
  language?: boolean
}>

const NavBar = ({ href, language, children }: Props) => {
  return (
    <nav className='flex items-center justify-between bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-900 py-1 px-2'>
      <LinkIfNeeded href={href}>
        <Image alt='' src={'/images/icon.png'} width={48} height={48} decoding='async' priority />
      </LinkIfNeeded>

      {children}

      <div className='flex gap-2'>
        {language && <LanguagePicker />}
        <ModeToggle />
      </div>
    </nav>
  )
}

export default NavBar
