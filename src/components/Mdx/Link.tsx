/* eslint-disable multiline-ternary */
/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react'
import NextLink from 'next/link'
import cn from 'clsx'

import { ExternalLink } from '~/components/ExternalLink'

function Link({
  href,
  className,
  children,
  ...props
}: JSX.IntrinsicElements['a']) {
  const classes
    = 'lawff-link inline text-link relative dark:text-link-dark break-normal'
  const modifiedChildren = React.Children.toArray(children).map(
    (child: any) => {
      if (child.props?.mdxType && child.props?.mdxType === 'inlineCode') {
        return React.cloneElement(child, {
          islink: true,
        })
      }
      return child
    },
  )

  if (!href) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a href={href} className={className} {...props} />
  }
  return (
    <>
      {href.startsWith('https://') ? (
        <ExternalLink href={href} className={cn(classes, className)} {...props}>
          {modifiedChildren}
        </ExternalLink>
      ) : href.startsWith('#') ? (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a className={cn(classes, className)} href={href} {...props}>
          {modifiedChildren}
        </a>
      ) : (
        <NextLink href={href.replace('.html', '')}>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a className={cn(classes, className)} {...props}>
            {modifiedChildren}
          </a>
        </NextLink>
      )}
    </>
  )
}

Link.displayName = 'Link'

export default Link
