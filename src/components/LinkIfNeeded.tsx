import { UrlObject } from 'url'

import Link from 'next/link'
import { PropsWithChildren } from 'react'

const LinkIfNeeded = <T,>(
  props: PropsWithChildren<{ item?: T; href?: (item: T) => string | UrlObject }>,
) => {
  if (props.item && props.href) {
    return <Link href={props.href(props.item)}>{props.children}</Link>
  }

  return <>{props.children}</>
}

export default LinkIfNeeded
