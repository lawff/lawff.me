/*
 * Copyright (c) lawliet.
 */

import * as React from 'react'
import { Page } from './Page'
import type { MarkdownProps } from './MarkdownPage'
import { MarkdownPage } from './MarkdownPage'

interface PageFrontmatter {
  title: string
  status: string
}

export default function withDocs(p: PageFrontmatter) {
  function LayoutHome(props: MarkdownProps<PageFrontmatter>) {
    return <MarkdownPage {...props} meta={p} />
  }
  LayoutHome.appShell = AppShell
  return LayoutHome
}

function AppShell(props: { children: React.ReactNode }) {
  return <Page {...props} />
}
