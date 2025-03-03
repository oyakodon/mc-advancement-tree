import { Home } from 'lucide-react'
import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

interface NavItem {
  title: string
  href?: string
}

interface Props {
  items?: NavItem[]
}

const BreadcrumbNav = ({ items }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>
            <div className='flex items-center gap-1'>
              <Home size={16} />
              Home
            </div>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items &&
          items.map((item, idx) => (
            <Fragment key={idx}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbNav
