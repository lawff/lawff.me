/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react'
// @ts-expect-error - TS doesn't know about the displayName property
import { MDXContext } from '@mdx-js/react'
import { useRouteMeta } from './useRouteMeta'
import { MDXComponents } from '~/components/Mdx/MdxComponents'
export interface MarkdownProps<Frontmatter> {
  meta: Frontmatter & { description?: string }
  children?: React.ReactNode
}

function MaxWidth({ children }: { children: any }) {
  return <div className="max-w-4xl ml-0 2xl:mx-auto">{children}</div>
}

export function MarkdownPage<
  T extends { title: string; status?: string } = { title: string; status?: string },
>({ children }: MarkdownProps<T>) {
  const { route } = useRouteMeta()

  const anchors: Array<{
    url: string
    text: React.ReactNode
    depth: number
  }> = React.Children.toArray(children)
    .filter((child: any) => {
      if (child.props?.mdxType) {
        return ['h1', 'h2', 'h3', 'Challenges', 'Recap'].includes(
          child.props.mdxType,
        )
      }
      return false
    })
    .map((child: any) => {
      if (child.props.mdxType === 'Challenges') {
        return {
          url: '#challenges',
          depth: 0,
          text: 'Challenges',
        }
      }
      if (child.props.mdxType === 'Recap') {
        return {
          url: '#recap',
          depth: 0,
          text: 'Recap',
        }
      }
      return {
        url: `#${child.props.id}`,
        depth:
          (child.props?.mdxType
            && parseInt(child.props.mdxType.replace('h', ''), 0))
          ?? 0,
        text: child.props.children,
      }
    })
  if (anchors.length > 0) {
    anchors.unshift({
      depth: 1,
      text: 'Overview',
      url: '#',
    })
  }

  if (!route)
    console.error('This page was not added to one of the sidebar JSON files.')

  // Auto-wrap everything except a few types into
  // <MaxWidth> wrappers. Keep reusing the same
  // wrapper as long as we can until we meet
  // a full-width section which interrupts it.
  const fullWidthTypes = [
    'Sandpack',
    'FullWidth',
    'Illustration',
    'IllustrationBlock',
    'Challenges',
    'Recipes',
  ]
  let wrapQueue: React.ReactNode[] = []
  const finalChildren: React.ReactNode[] = []
  function flushWrapper(key: string | number) {
    if (wrapQueue.length > 0) {
      finalChildren.push(<MaxWidth key={key}>{wrapQueue}</MaxWidth>)
      wrapQueue = []
    }
  }
  function handleChild(child: any, key: string | number) {
    if (child == null)
      return

    if (typeof child !== 'object') {
      wrapQueue.push(child)
      return
    }
    if (fullWidthTypes.includes(child.props.mdxType)) {
      flushWrapper(key)
      finalChildren.push(child)
    }
    else {
      wrapQueue.push(child)
    }
  }
  React.Children.forEach(children, handleChild)
  flushWrapper('last')

  return (
    <article className="h-full mx-auto relative w-full min-w-0">
      <MDXContext.Provider value={MDXComponents}>
        {finalChildren}
      </MDXContext.Provider>
    </article>
  )
}
