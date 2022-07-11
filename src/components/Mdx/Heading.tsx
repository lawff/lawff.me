/*
 * Copyright (c) lawliet.
 */

import cn from 'clsx'
import * as React from 'react'
import { forwardRefWithAs } from '~/utils/forwardRefWithAs'
export interface HeadingProps {
  className?: string
  isPageAnchor?: boolean
  children: React.ReactNode
  id?: string
  as?: any
}

const Heading = forwardRefWithAs<HeadingProps, 'div'>((
  { as: Comp = 'div', className, children, id, isPageAnchor = true, ...props },
  ref,
) => {
  let label = 'Link for this heading'
  if (typeof children === 'string')
    label = `Link for ${children}`

  return (
    <Comp id={id} {...props} ref={ref} className={cn('mdx-heading', className)}>
      {isPageAnchor && (
        <a
          href={`#${id}`}
          aria-label={label}
          title={label}
          className="header-anchor">
          #
        </a>
      )}
      {children}
    </Comp>
  )
})

Heading.displayName = 'Heading'

export const H1 = ({ className, ...props }: HeadingProps) => (
  <Heading
    as="h1"
    className={cn(className, 'text-4xl font-bold leading-tight mb-6')}
    {...props}
  />
)

export const H2 = ({ className, ...props }: HeadingProps) => (
  <Heading
    as="h2"
    className={cn(
      'text-2xl leading-10 text-primary dark:text-primary-dark font-bold my-6',
      className,
    )}
    {...props}
  />
)
export const H3 = ({ className, ...props }: HeadingProps) => (
  <Heading
    as="h3"
    className={cn(
      className,
      'text-xl leading-9 text-primary dark:text-primary-dark font-bold my-6',
    )}
    {...props}
  />
)

export const H4 = ({ className, ...props }: HeadingProps) => (
  <Heading
    as="h4"
    className={cn(className, 'text-xl font-bold leading-9 my-4')}
    {...props}
  />
)
