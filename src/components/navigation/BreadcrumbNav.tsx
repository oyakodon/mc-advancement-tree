import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

interface INavItem {
  title: string
  href?: string
}

interface Props {
  items: INavItem[]
}

const NavItem = ({ item }: { item: INavItem }) => {
  return (
    <BreadcrumbItem>
      <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
    </BreadcrumbItem>
  )
}

const BreadcrumbNav = ({ items }: Props) => {
  if (!items || items.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((i, idx) => (
          <Fragment key={idx}>
            {idx > 0 && <BreadcrumbSeparator />}
            <NavItem item={i} />
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbNav
