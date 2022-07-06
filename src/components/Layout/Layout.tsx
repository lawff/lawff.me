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
  console.log(p)
  function LayoutHome(props: any) {
    return <div {...props} meta={p} />
  }
  LayoutHome.appShell = AppShell
  return LayoutHome
}

function AppShell(props: { children: React.ReactNode }) {
  return <Page {...props} />
}
