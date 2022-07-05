/*
 * Copyright (c) lawliet.
 */

import * as React from 'react'
import { Page } from './Page'

interface PageFrontmatter {
  title: string
  status: string
}

export default function withLayout(p: PageFrontmatter) {
  function Layout(props: any) {
    return <div {...props} meta={p} />
  }
  Layout.appShell = AppShell
  return Layout
}

function AppShell(props: { children: React.ReactNode }) {
  return <Page {...props} />
}
