/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react'
import NextLink from 'next/link'
import { ExternalLink } from '~/components/ExternalLink'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  classes?: string
  title?: string
}

export default function NavLink({ href, children, classes, title }: NavLinkProps) {
  if (href.startsWith('https://')) {
    return (
      <ExternalLink href={href} className={classes} title={title}>
        {children}
      </ExternalLink>
    )
  }

  return (
    <NextLink href={href}>
      <a className={classes} title={title}>{children}</a>
    </NextLink>
  )
}
