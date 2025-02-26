'use client'

import { Globe } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguagePicker() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onClick = (lang: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set('lang', lang)

    router.push(`${pathname}?${params}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Globe className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => onClick('ja_jp')}>日本語</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onClick('en_us')}>English (US)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
