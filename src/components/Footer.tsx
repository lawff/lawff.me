/*
 * Copyright (c) lawliet.
 */

import * as React from 'react'
import type { RouteMeta } from './Layout/useRouteMeta'

export type FooterProps = Pick<RouteMeta, 'route' | 'nextRoute' | 'prevRoute'>

function areEqual(prevProps: FooterProps, props: FooterProps) {
  return prevProps.route?.path === props.route?.path
}

export const Footer = React.memo(
  () => {
    return (
      <div className="mt-10 mb-6 max-w-65ch m-auto opacity-50 flex">
        <span className="text-sm"><a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" className="color:inherit" rel="noreferrer">CC BY-NC-SA 4.0</a> 2022-PRESENT © Lawliet FF</span>
        <div className="flex-auto" />
      </div>
    )
  },
  areEqual,
)

Footer.displayName = 'Footer'
